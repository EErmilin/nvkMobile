import React, {useState} from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import {Button, InputText, FormContainer, MediumText} from '../../components';
import {Hide, Show} from '../../components/SVGcomponents';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {useTheme} from '../../Styles/Styles';
import {PASSWORD_LENGTH} from '../../api/config';
import {getUpdateClient} from '../../requests/updateHeaders';
import {CHANGE_PASSWORD} from '../../gql/mutation/user/ChangePassword';
import {ApolloError} from '@apollo/client';
import {useAppSelector} from '../../redux/hooks';
import DeviceInfo from 'react-native-device-info';

export const PasswordEdit: React.FC<RootNavigationProps<'PasswordEdit'>> = ({
  navigation,
}) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');

  const [passwordError, setPasswordError] = React.useState(false);
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(true);
  const [showNewPassword, setShowNewPassword] = React.useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(true);
  const [errorText, setErrorText] = React.useState('');
  const user = useAppSelector(state => state.user.data);

  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();

  return (
    <FormContainer styleView={{flex: 1, backgroundColor: colors.fillPrimary}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <InputText
            autoFocus={false}
            errorState={passwordError}
            secureTextEntry={showPassword}
            value={password}
            label={'Текущий пароль'}
            onChangeText={formatted => {
              setPassword(formatted);
              setPasswordError(false);
            }}
            logo={
              <TouchableOpacity
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                style={{marginRight: 20}}>
                {!showPassword ? (
                  <Show
                    color={passwordError ? colors.danger : colors.colorMain}
                  />
                ) : (
                  <Hide
                    color={passwordError ? colors.danger : colors.colorMain}
                  />
                )}
              </TouchableOpacity>
            }
          />
          <InputText
            style={{marginTop: 16}}
            errorState={newPasswordError}
            value={newPassword}
            onChangeText={value => {
              setNewPassword(value);
              setNewPasswordError(false);
            }}
            label="Новый пароль"
            secureTextEntry={showNewPassword}
            logo={
              <TouchableOpacity
                onPress={() => {
                  setShowNewPassword(!showNewPassword);
                  setNewPasswordError(false);
                }}
                style={{marginRight: 20}}>
                {!showNewPassword ? (
                  <Show
                    color={newPasswordError ? colors.danger : colors.colorMain}
                  />
                ) : (
                  <Hide
                    color={newPasswordError ? colors.danger : colors.colorMain}
                  />
                )}
              </TouchableOpacity>
            }
          />
          <InputText
            style={{marginTop: 16}}
            errorState={repeatPasswordError}
            value={repeatPassword}
            onChangeText={value => {
              setRepeatPassword(value);
              setRepeatPasswordError(false);
            }}
            label="Повторите пароль"
            secureTextEntry={showRepeatPassword}
            logo={
              <TouchableOpacity
                onPress={() => {
                  setShowRepeatPassword(!showRepeatPassword);
                  setRepeatPasswordError(false);
                }}
                style={{marginRight: 20}}>
                {!showRepeatPassword ? (
                  <Show
                    color={newPasswordError ? colors.danger : colors.colorMain}
                  />
                ) : (
                  <Hide
                    color={newPasswordError ? colors.danger : colors.colorMain}
                  />
                )}
              </TouchableOpacity>
            }
          />
          {errorText !== '' ? (
            <MediumText
              fontSize={12}
              style={{color: colors.danger, marginTop: 8}}>
              {errorText}
            </MediumText>
          ) : (
            <></>
          )}
        </View>
        <Button
          title={'Сохранить'}
          onPress={async () => {
            if (
              password.length >= PASSWORD_LENGTH &&
              newPassword.length >= PASSWORD_LENGTH &&
              newPassword === repeatPassword
            ) {
              setPasswordError(false);
              setNewPasswordError(false);
              setRepeatPasswordError(false);
              setErrorText('');
              try {
                setLoading(true);
                const client = await getUpdateClient();
                const response = await client.mutate({
                  mutation: CHANGE_PASSWORD,
                  variables: {
                    changePasswordInput: {
                      currentPassword: password,
                      newPassword: newPassword,
                    },
                  },
                });
                if (response.data.changePassword === true) {
                  AppMetrica.reportEvent('PASSWORD_EDIT', {
                    user: user,
                    date: new Date(),
                    date_string: new Date().toString(),
                    platform: Platform.OS,
                    app_version: DeviceInfo.getVersion(),
                  });
                  navigation.goBack();
                } else {
                  console.log('response', response);
                }
              } catch (e) {
                if (e instanceof ApolloError) {
                  if (e.message === 'Invalid current password') {
                    setErrorText('Текущий пароль неверен');
                    setPasswordError(true);
                  }
                  console.log('e', e.message);
                }
              } finally {
                setLoading(false);
              }
              // navigation.navigate('PasswordEditNew', {
              //   password: password,
              // });
            } else {
              if (password.length < PASSWORD_LENGTH) {
                setErrorText(
                  `Текущий пароль должен содержать минимум ${PASSWORD_LENGTH} символов`,
                );
                setPasswordError(true);
              }
              if (newPassword.length < PASSWORD_LENGTH) {
                setNewPasswordError(true);
                setErrorText(
                  `Новый пароль должен содержать минимум ${PASSWORD_LENGTH} символов`,
                );
              } else {
                setErrorText('Проверьте совпадение паролей');
                setNewPasswordError(true);
                setRepeatPasswordError(true);
              }
            }
          }}
          loading={loading}
          loadingColor={colors.white}
          loadingSize={'small'}
        />
      </View>
    </FormContainer>
  );
};
