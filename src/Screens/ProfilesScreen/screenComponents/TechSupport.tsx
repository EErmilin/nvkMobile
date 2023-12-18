import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {ApolloError} from '@apollo/client';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import {BoldText, Button, InputText} from '../../../components';
import {CREATE_SUPPORT} from '../../../gql/mutation/CreateSupport';
import {RootNavigationProps} from '../../../navigation/types/RootStackTypes';
import {useAppSelector} from '../../../redux/hooks';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {useTheme} from '../../../Styles/Styles';
import DeviceInfo from 'react-native-device-info';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const height = Dimensions.get('window').height;

const emailFormat = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const TechSupport: React.FC<
  RootNavigationProps<'TechSupport'>
> = props => {
  const {navigation} = props;
  const user = useAppSelector(state => state.user.data);
  const [name, setName] = useState(user?.firstname ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [text, setText] = useState('');
  const [loading, setLoading] = React.useState(false);

  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [textError, setTextError] = React.useState(false);
  const [textFocused, setTextFocused] = React.useState(false);
  const {colors} = useTheme();
  const [keyboardStatus, setKeyboardStatus] = React.useState(false);
  // let offset = Platform.OS === 'ios' ? 40 : -200;
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubsription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubsription.remove();
    };
  }, []);

  console.log(name);

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: colors.fillPrimary}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={45 + insets.top}>
      {Platform.OS === 'ios' ? (
        <BoldText
          fontSize={16}
          style={{fontWeight: '700', alignSelf: 'center', marginTop: 15}}>
          Техподдержка
        </BoldText>
      ) : (
        <></>
      )}
      <ScrollView
        style={{flex: 1}}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{
          flex: keyboardStatus ? undefined : 1,
        }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="none">
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            justifyContent: 'space-between',
          }}>
          <View>
            <InputText
              autoFocus={false}
              required
              style={{marginTop: 30, backgroundColor: colors.input}}
              value={name}
              errorState={nameError}
              label={'Имя'}
              onChangeText={formatted => {
                setName(formatted);
                setNameError(false);
              }}
            />
            <InputText
              autoFocus={false}
              required
              style={{marginVertical: 5}}
              label={'Email'}
              errorState={emailError}
              value={email}
              onChangeText={formatted => {
                setEmail(formatted);
                setEmailError(false);
              }}
            />
            <TextInput
              value={text}
              onChangeText={value => {
                setText(value);
                setTextError(false);
              }}
              onFocus={() => {
                setTextFocused(true);
              }}
              onBlur={() => {
                setTextFocused(false);
              }}
              multiline
              style={[
                styles.inputText,
                {
                  backgroundColor: colors.input,
                  borderColor: textError
                    ? colors.danger
                    : textFocused
                    ? colors.colorMain
                    : colors.borderPrimary,
                  color: colors.textPrimary,
                },
              ]}
              placeholder="Ваш комментарий"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <Button
            title={'Отправить'}
            style={{
              marginTop: 15,
              marginBottom: 15 + insets.bottom,
            }}
            onPress={async () => {
              if (name !== '' && emailFormat.test(email) && text !== '') {
                try {
                  setLoading(true);
                  let client = await getUpdateClient();
                  let response = await client.mutate({
                    mutation: CREATE_SUPPORT,
                    variables: {
                      createSupportInput: {
                        name: name,
                        email: email.trim(),
                        message: text.trim(),
                        authorId: user?.id,
                      },
                    },
                  });
                  if (response.data.createSupport) {
                    AppMetrica.reportEvent('SUPPORT', {
                      user: user,
                      date: new Date(),
                      date_string: new Date().toString(),
                      text: text,
                      platform: Platform.OS,
                      device_id: !user ? DeviceInfo.getDeviceId() : undefined,
                      app_version: DeviceInfo.getVersion(),
                    });
                    navigation.goBack();
                    Toast.show({
                      type: 'success',
                      text1: 'Ваш запрос отправлен',
                    });
                  }
                } catch (e: unknown) {
                  if (e instanceof ApolloError) {
                    Toast.show({
                      type: 'error',
                      text1: 'Ошибка',
                      text2: e.message,
                    });
                  }
                } finally {
                  setLoading(false);
                }
              } else {
                if (name === '') {
                  setNameError(true);
                }
                if (!emailFormat.test(email)) {
                  setEmailError(true);
                }
                if (text === '') {
                  setTextError(true);
                }
                Toast.show({
                  type: 'error',
                  text1: 'Ошибка',
                  text2: 'Заполните все поля',
                });
              }
            }}
            loading={loading}
            loadingColor={colors.white}
            loadingSize="small"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputText: {
    minHeight: height < 680 ? 80 : 120,
    borderRadius: 20,
    textAlignVertical: 'top',
    borderWidth: 1,
    padding: 16,
    paddingTop: 12,
    fontFamily: 'NotoSans-Regular',
  },
});
