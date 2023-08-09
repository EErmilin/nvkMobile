import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import {ApolloError} from '@apollo/client';

import {
  BoldText,
  FormContainer,
  InputText,
  Button,
  RegularText,
  Select,
  ModalDatePicker,
} from '../../components';
import {Show, Hide, ArrowRight, Calendar} from '../../components/SVGcomponents';
import {LoginNavigationProps} from '../../navigation/types/LoginTypes';
import {useAppDispatch} from '../../redux/hooks';
import {createUser} from '../../redux/thunks/user/CreateUser';
import {setLogged, setRegionScreen} from '../../redux/slices/authSlice';
import {useTheme} from '../../Styles/Styles';
import {PASSWORD_LENGTH} from '../../api/config';
import {getUpdateClient} from '../../requests/updateHeaders';
import {TERMS} from '../../gql/query/Terms';

export const RegisterSreen = (
  props: LoginNavigationProps<'RegisterScreen'>,
) => {
  const {colors, theme} = useTheme();
  const {route, navigation} = props;
  const {phoneNumber, code} = route.params;
  const [terms, setTerms] = React.useState<{id: number; name: string}[]>([]);
  const [name, setName] = React.useState<string>('');
  const [birthdate, setBirthdate] = React.useState<Date | null>(null);
  const [password, setPassword] = React.useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeat, setShowRepeat] = React.useState(false);
  const dispatch = useAppDispatch();

  const [errorName, setErrorName] = React.useState(false);
  const [errorPass, setErrorPass] = React.useState(false);
  const [passMatch, setPassMatch] = React.useState(false);

  const update = async () => {
    try {
      let client = await getUpdateClient();
      let response = await client.query({
        query: TERMS,
      });
      setTerms(response.data.terms);
    } catch (e) {
      console.log('e', e);
    }
  };

  React.useEffect(() => {
    update();
  }, []);

  return (
    <FormContainer
      keyboardShouldPersistTaps="always"
      style={{flex: 1, backgroundColor: colors.fillPrimary}}
      styleView={{flex: 1}}>
      <ModalDatePicker
        visible={modal}
        date={birthdate ?? new Date()}
        onChangeDate={value => {
          setBirthdate(value);
        }}
        shouldClose={() => {
          setModal(false);
        }}
        onStart={() => {}}
        mode={'date'}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <BoldText fontSize={16} style={{marginTop: 5}}>
            Данные
          </BoldText>
          <InputText
            style={{marginTop: 20}}
            value={name}
            required
            errorState={errorName}
            onChangeText={value => {
              setName(value);
              setErrorName(false);
            }}
            label="Имя"
          />
          {errorName ? (
            <RegularText
              fontSize={12}
              style={{color: colors.danger, marginTop: 8}}>
              Обязательное поле
            </RegularText>
          ) : (
            <></>
          )}

          <Select
            onPress={() => {
              setModal(true);
            }}
            text={
              birthdate !== null
                ? birthdate.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : 'Дата рождения'
            }
            style={{marginTop: 15, backgroundColor: colors.input}}
            logoLeft={<Calendar />}
            logo={
              <View
                style={{width: 20, height: 20, transform: [{rotate: '90deg'}]}}>
                <ArrowRight />
              </View>
            }
          />
          <BoldText fontSize={16} style={{marginTop: 30}}>
            Пароль
          </BoldText>
          <InputText
            style={{marginTop: 20}}
            value={password}
            onChangeText={value => {
              setPassword(value);
              setErrorPass(false);
              setPassMatch(false);
            }}
            errorState={errorPass || passMatch}
            required
            label="Придумайте пароль"
            secureTextEntry={!showPassword}
            logo={
              <TouchableOpacity
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                style={{marginRight: 20}}>
                {showPassword ? (
                  <Show color={errorPass ? colors.danger : colors.colorMain} />
                ) : (
                  <Hide color={errorPass ? colors.danger : colors.colorMain} />
                )}
              </TouchableOpacity>
            }
          />
          <InputText
            style={{marginTop: 20}}
            value={passwordRepeat}
            onChangeText={value => {
              setPasswordRepeat(value);
              setErrorPass(false);
              setPassMatch(false);
            }}
            errorState={errorPass || passMatch}
            required
            label="Повторите пароль"
            secureTextEntry={!showRepeat}
            logo={
              <TouchableOpacity
                onPress={() => {
                  setShowRepeat(!showRepeat);
                }}
                style={{marginRight: 20}}>
                {showRepeat ? (
                  <Show color={errorPass ? colors.danger : colors.colorMain} />
                ) : (
                  <Hide color={errorPass ? colors.danger : colors.colorMain} />
                )}
              </TouchableOpacity>
            }
          />
          {errorPass ? (
            <RegularText
              fontSize={12}
              style={{marginTop: 8, color: colors.danger}}>
              Обязательные поля
            </RegularText>
          ) : (
            <></>
          )}
          {passMatch ? (
            <RegularText
              fontSize={12}
              style={{marginTop: 8, color: colors.danger}}>
              Пароли не совпадают
            </RegularText>
          ) : (
            <></>
          )}
          <RegularText
            fontSize={12}
            style={{
              marginTop: 8,
              textAlign: 'center',
              marginBottom: 50,
              color: colors.textSecondary,
            }}>
            Пароль должен содержать не менее {PASSWORD_LENGTH} символов
          </RegularText>
        </View>
        <View>
          <RegularText
            fontSize={12}
            style={{
              textAlign: 'center',
              color: colors.textSecondary,
            }}>
            Нажимая на кнопку я принимаю условия{' '}
            <RegularText
              onPress={() => {
                navigation.navigate('UseOfTerms', {
                  id:
                    terms.find(item => item.name.includes('ПОЛЬЗОВАТЕЛЬСКОЕ'))
                      ?.id ?? 2,
                });
              }}
              style={{color: colors.colorMain, fontSize: 12}}>
              лицензионного договора
            </RegularText>{' '}
            и{' '}
            <RegularText
              onPress={() =>
                navigation.navigate('PrivacyPolicy', {
                  id:
                    terms.find(item => item.name.includes('ПОЛИТИКА'))?.id ?? 1,
                })
              }
              style={{color: colors.colorMain, fontSize: 12}}>
              разрешаю обработку персональных данных
            </RegularText>
          </RegularText>
          <Button
            style={{marginTop: 20}}
            title="Зарегистрироваться"
            onPress={async () => {
              if (
                name !== '' &&
                password === passwordRepeat &&
                password.length >= PASSWORD_LENGTH
              ) {
                try {
                  setLoading(true);
                  console.log('reg', {
                    phone: phoneNumber,
                    password: password,
                    firstname: name,
                    code: code,
                    birthdate: birthdate ?? undefined,
                  });
                  let response = await dispatch(
                    createUser({
                      phone: phoneNumber,
                      password: password,
                      firstname: name,
                      code: code,
                      birthdate:
                        birthdate?.toLocaleDateString('sv-SE', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }) ?? undefined,
                    }),
                  );

                  setLoading(false);
                  if (response.meta.requestStatus === 'fulfilled') {
                    dispatch(setRegionScreen(false));
                    dispatch(setLogged(true));
                  } else {
                    console.log('response', response);
                    Toast.show({
                      type: 'error',
                      text1: 'Ошибка',
                      text2: 'Что-то пошло не так',
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
                }
              } else {
                if (name === '') {
                  setErrorName(true);
                }
                if (password.length < PASSWORD_LENGTH) {
                  setErrorPass(true);
                }
                if (password !== passwordRepeat) {
                  setPassMatch(true);
                }
              }
            }}
            loading={loading}
            loadingColor={theme === 'dark' ? colors.black : colors.white}
          />
        </View>
      </View>
    </FormContainer>
  );
};
