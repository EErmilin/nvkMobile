import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {ApolloError} from '@apollo/client';

import {Button, FormContainer, InputText, MediumText} from '../../components';
import {Hide, Show} from '../../components/SVGcomponents';
import {CHANGE_PASSWORD} from '../../gql/mutation/user/ChangePassword';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {getUpdateClient} from '../../requests/updateHeaders';
import {useTheme} from '../../Styles/Styles';
import {PASSWORD_LENGTH} from '../../api/config';

export const PasswordEditNew = (
  props: RootNavigationProps<'PasswordEditNew'>,
) => {
  const {route, navigation} = props;
  const {password} = route.params;
  const [newPassword, setNewPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [loadingSave, setLoadingSave] = React.useState(false);
  const [newError, setNewError] = React.useState(false);
  const [repeatError, setRepeatError] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showRepeat, setShowRepeat] = React.useState(false);
  const {colors} = useTheme();

  return (
    <FormContainer
      styleView={{backgroundColor: colors.fillPrimary}}
      keyboardShouldPersistTaps="always">
      <View style={{flex: 1}}>
        <InputText
          value={newPassword}
          onChangeText={text => {
            setNewPassword(text);
            setNewError(false);
          }}
          style={{marginTop: 30}}
          errorState={newError}
          required
          label="Новый пароль"
          secureTextEntry={!showNew}
          logo={
            <TouchableOpacity
              onPress={() => setShowNew(!showNew)}
              style={{marginRight: 20}}>
              {showNew ? (
                <Show color={newError ? colors.danger : colors.colorMain} />
              ) : (
                <Hide color={newError ? colors.danger : colors.colorMain} />
              )}
            </TouchableOpacity>
          }
        />
        <InputText
          value={repeatPassword}
          onChangeText={text => {
            setRepeatPassword(text);
            setRepeatError(false);
          }}
          errorState={repeatError}
          style={{marginTop: 15}}
          required
          secureTextEntry={!showRepeat}
          label="Повторите пароль"
          logo={
            <TouchableOpacity
              onPress={() => setShowRepeat(!showRepeat)}
              style={{marginRight: 20}}>
              {showRepeat ? (
                <Show color={repeatError ? colors.danger : colors.colorMain} />
              ) : (
                <Hide color={repeatError ? colors.danger : colors.colorMain} />
              )}
            </TouchableOpacity>
          }
        />
        {newError || repeatError ? (
          <MediumText
            fontSize={12}
            style={{color: colors.danger, marginTop: 8}}>
            Пароль не соответствует требованиям безопасности
          </MediumText>
        ) : (
          <></>
        )}
        <MediumText
          fontSize={12}
          style={{marginTop: 8, color: colors.textSecondary}}>
          Новый пароль должен содержать не менее {PASSWORD_LENGTH} символов
        </MediumText>
      </View>
      <Button
        title="Сохранить"
        onPress={async () => {
          if (
            newPassword.length >= PASSWORD_LENGTH &&
            newPassword === repeatPassword
          ) {
            let client = await getUpdateClient();
            try {
              setLoadingSave(true);
              let response = await client.mutate({
                mutation: CHANGE_PASSWORD,
                variables: {
                  oldPassword: password,
                  newPassword: newPassword,
                },
              });
              if (response.data) {
                Toast.show({
                  type: 'success',
                  text1: 'Успешно',
                  text2: 'Пароль успешно изменен',
                });
                navigation.navigate('EditProfile');
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Ошибка',
                  text2: 'Возникла ошибка',
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
              setLoadingSave(false);
            }
          } else {
            if (repeatPassword.length >= PASSWORD_LENGTH) {
              setNewError(true);
              setRepeatError(true);
              Toast.show({
                type: 'error',
                text1: 'Ошибка',
                text2: 'Пароли не совпадпают',
              });
            } else {
              setNewError(true);
              setRepeatError(true);
              Toast.show({
                type: 'error',
                text1: 'Ошибка',
                text2: `Новый пароль должен содержать не менее ${PASSWORD_LENGTH} символов`,
              });
            }
          }
        }}
        loading={loadingSave}
        loadingColor={colors.white}
        loadingSize="small"
      />
    </FormContainer>
  );
};
