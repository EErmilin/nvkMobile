import * as React from 'react';
import {KeyboardAvoidingView, Platform, TextInput, View} from 'react-native';
import {Button, MediumText} from '../../../components';
import {useTheme} from '../../../Styles/Styles';
import {useApolloClient} from '@apollo/client';
import {useAppSelector} from '../../../redux/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CREATE_COMMENT} from '../../../gql/mutation/live/CreateComment';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';

interface IProps {
  navigation: any;
  route: any;
}

export const LiveQuestion = (props: IProps) => {
  const {navigation, route} = props;
  const {id} = route.params;
  const {colors} = useTheme();
  const [question, setQuestion] = React.useState('');
  const [errorQuestion, setErrorQuestion] = React.useState('');
  const [loadingSent, setLoadingSent] = React.useState(false);
  const client = useApolloClient();
  const user = useAppSelector(state => state.user.data);
  const insets = useSafeAreaInsets();
  const [focusState, setFocusState] = React.useState(false);

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
        onPress={async () => {
          if (question.length > 0) {
            try {
              setLoadingSent(true);
              let response = await client.mutate({
                mutation: CREATE_COMMENT,
                variables: {
                  createLiveStreamsCommentInput: {
                    liveId: id,
                    comment: question,
                    authorId: user?.id,
                  },
                },
              });
              if (response.data) {
                AppMetrica.reportEvent('LIVE_QUESTION', {
                  user: user,
                  text: question,
                  date: new Date(),
                  date_string: new Date().toString(),
                  platform: Platform.OS,
                  device_id: !user ? DeviceInfo.getDeviceId() : undefined,
                  app_version: DeviceInfo.getVersion(),
                });
                setQuestion('');
                navigation.goBack();
                Toast.show({
                  type: 'success',
                  text1: 'Успешно',
                  text2: 'Комментарий успешно отправлен',
                });
              }
            } catch (e) {
              setLoadingSent(false);
              Toast.show({
                type: 'error',
                text1: 'Ошибка',
                text2: 'Во время отправки комментария произошла ошибка',
              });
            } finally {
              setLoadingSent(false);
            }
          } else {
            setErrorQuestion('Комменарий не должен быть пустым');
          }
        }}
        loading={loadingSent}
        loadingColor={colors.textPrimary}
        loadingSize={'small'}
      />
    </KeyboardAvoidingView>
  );
};
