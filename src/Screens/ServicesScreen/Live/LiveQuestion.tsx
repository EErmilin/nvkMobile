import * as React from 'react';
import {KeyboardAvoidingView, Platform, TextInput, View} from 'react-native';
import {Button, InputText, MediumText} from '../../../components';
import {useTheme} from '../../../Styles/Styles';
import {ApolloError, useApolloClient} from '@apollo/client';
import {useAppSelector} from '../../../redux/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CREATE_COMMENT} from '../../../gql/mutation/live/CreateComment';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {CREATE_SUPPORT} from '../../../gql/mutation/CreateSupport';

interface IProps {
  navigation: any;
  route: any;
}

const emailFormat = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const LiveQuestion = (props: IProps) => {
  const {navigation, route} = props;
  const {id, name: nameLiveStream} = route.params;
  const {colors} = useTheme();
  const [question, setQuestion] = React.useState('');
  const [errorQuestion, setErrorQuestion] = React.useState('');
  const client = useApolloClient();
  const user = useAppSelector(state => state.user.data);
  const insets = useSafeAreaInsets();
  const [focusState, setFocusState] = React.useState(false);

  const [name, setName] = React.useState(user?.firstname ?? '');
  const [email, setEmail] = React.useState(user?.email ?? '');
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSend = async () => {
    if (name !== '' && emailFormat.test(email) && question.length > 0) {
      try {
        setLoading(true);
        let client = await getUpdateClient();
        let response = await client.mutate({
          mutation: CREATE_SUPPORT,
          variables: {
            createSupportInput: {
              name: name,
              email: email.trim(),
              message: `Вопрос к прямому эфиру ${nameLiveStream}. \n${question.trim()}`,
              authorId: user?.id,
            },
          },
        });
        if (response.data.createSupport) {
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
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2: 'Заполните все поля',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        backgroundColor: colors.fillPrimary,
      }}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}
      keyboardVerticalOffset={60 + insets.top}>
      <View style={{}}>
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
          style={{marginVertical: 15}}
          label={'Email'}
          errorState={emailError}
          value={email}
          onChangeText={formatted => {
            setEmail(formatted);
            setEmailError(false);
          }}
        />
        <TextInput
          value={question}
          onChangeText={value => setQuestion(value)}
          onFocus={() => {
            setFocusState(true);
          }}
          onBlur={() => {
            setFocusState(false);
          }}
          style={{
            height: 200,
            marginTop: 30,
            borderColor: focusState ? colors.colorMain : colors.borderPrimary,
            borderWidth: 1,
            color: colors.textPrimary,
            backgroundColor: colors.input,
            borderRadius: 20,
            paddingTop: 12,
            paddingHorizontal: 16,
            paddingBottom: 16,
            textAlignVertical: 'top',
          }}
          multiline
          placeholder="Ваш комментарий"
          placeholderTextColor={colors.textSecondary}
        />
        {errorQuestion.length > 0 ? (
          <MediumText
            fontSize={12}
            style={{marginTop: 10, color: colors.danger}}>
            {errorQuestion}
          </MediumText>
        ) : (
          <></>
        )}
      </View>
      <Button
        style={{marginTop: 20, marginBottom: insets.bottom + 15}}
        title="Отправить"
        onPress={onSend}
        loading={loading}
        loadingColor={colors.textPrimary}
        loadingSize={'small'}
      />
    </KeyboardAvoidingView>
  );
};
