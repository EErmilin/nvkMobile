import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';

import {InputText, FormContainer, Button, RegularText} from '../../components';
import {Hide, Show} from '../../components/SVGcomponents';
import {LoginNavigationProps} from '../../navigation/types/LoginTypes';

import {getUpdateClient} from '../../requests/updateHeaders';
import {RESET_PASSWORD} from '../../gql/mutation/auth/ResetPassword';
import {useTheme} from '../../Styles/Styles';
import {PASSWORD_LENGTH} from '../../api/config';
import {useAppDispatch} from '../../redux/hooks';
import {setLogged, setToken} from '../../redux/slices/authSlice';
import {setUser} from '../../redux/slices/userSlice';

export const NewPassword = (props: LoginNavigationProps<'NewPassword'>) => {
  const {route} = props;
  const {phoneNumber, code} = route.params;
  const [password, setPassword] = React.useState('');
  const [repeat, setRepeat] = React.useState('');
  const {colors, theme} = useTheme();

  const [showPassword, setShowPassword] = React.useState(true);
  const [showRepeat, setShowRepeat] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState(false);
  const dispatch = useAppDispatch();

  return (
    <FormContainer style={{backgroundColor: colors.fillPrimary}}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <InputText
            value={password}
            onChangeText={value => {
              setPassword(value);
              setError(false);
            }}
            required
            style={{marginTop: 5}}
            secureTextEntry={showPassword}
            label="Придумайте пароль"
            errorState={error}
            logo={
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => {
                  setShowPassword(!showPassword);
                }}>
                {showPassword ? (
                  <Hide color={error ? colors.danger : colors.colorMain} />
                ) : (
                  <Show color={error ? colors.danger : colors.colorMain} />
                )}
              </TouchableOpacity>
            }
          />
          <InputText
            value={repeat}
            onChangeText={value => {
              setRepeat(value);
              setError(false);
            }}
            required
            style={{marginTop: 15}}
            errorState={error}
            secureTextEntry={showRepeat}
            label="Повторите пароль"
            logo={
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => {
                  setShowRepeat(!showRepeat);
                }}>
                {showRepeat ? (
                  <Hide color={error ? colors.danger : colors.colorMain} />
                ) : (
                  <Show color={error ? colors.danger : colors.colorMain} />
                )}
              </TouchableOpacity>
            }
          />
          {error ? (
            <RegularText
              fontSize={12}
              style={{color: colors.danger, marginTop: 8}}>
              Пароль не соответствует требованиям безопасности
            </RegularText>
          ) : (
            <></>
          )}
          <RegularText
            fontSize={12}
            style={{color: colors.textSecondary, marginTop: 8}}>
            Пароль должен содержать не менее {PASSWORD_LENGTH} символов
          </RegularText>
        </View>
        <Button
          loading={loading}
          loadingColor={theme === 'dark' ? colors.black : colors.white}
          loadingSize="small"
          title="Сохранить"
          onPress={async () => {
            if (password === repeat && password.length >= PASSWORD_LENGTH) {
              try {
                setLoading(true);
                let client = await getUpdateClient();
                let response = await client.mutate({
                  mutation: RESET_PASSWORD,
                  variables: {
                    resetPasswordInput: {
                      phone: phoneNumber,
                      code: code,
                      password: password,
                    },
                  },
                });
                if (response.data.resetPassword.accessToken) {
                  dispatch(setToken(response.data.resetPassword.accessToken));
                  dispatch(setUser(response.data.resetPassword.user));
                  dispatch(setLogged(true));
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Ошибка',
                    text2: 'Что-то пошло не так',
                  });
                }
              } catch (e: unknown) {
                if (e instanceof Error) {
                  console.log('e newPassword', e);
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
              Toast.show({
                type: 'error',
                text1: 'Пароли не совпадают',
              });
              setError(true);
            }
          }}
        />
      </View>
    </FormContainer>
  );
};
