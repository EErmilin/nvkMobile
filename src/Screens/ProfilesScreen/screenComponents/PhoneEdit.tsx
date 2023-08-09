import React, {useState} from 'react';
import {
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import {
  CodeField,
  useClearByFocusCell,
  Cursor,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import Toast from 'react-native-toast-message';
import {ApolloError} from '@apollo/client';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import {
  BoldText,
  Button,
  InputText,
  ModalComponent,
  RegularText,
  Containter,
  MediumText,
} from '../../../components';

import {AuthLogo, Hide, Show} from '../../../components/SVGcomponents';
import {GET_SMS_CODE} from '../../../gql/mutation/auth/GetSmsCode';
import {CHANGE_PHONE} from '../../../gql/mutation/user/ChangePhone';
import {useAppSelector, useAppDispatch} from '../../../redux/hooks';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {useTheme} from '../../../Styles/Styles';
import {PASSWORD_LENGTH} from '../../../api/config';
import {setUser} from '../../../redux/slices/userSlice';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

export const PhoneEdit: React.FC<{shouldClose: () => void}> = ({
  shouldClose,
}) => {
  const screenWidth = useWindowDimensions().width;
  const oldPhone = useAppSelector(state => state.user.data!.phone);
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhone, setFormattedPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [modalCode, setModalCode] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [timer, setTimer] = React.useState(60);
  const [errorPhone, setErrorPhone] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);
  const {colors, theme} = useTheme();
  const user = useAppSelector(state => state.user.data);
  const dispatch = useAppDispatch();
  const refCode = useBlurOnFulfill({value: code, cellCount: 4});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  React.useEffect(() => {
    if (modalCode === true && timer > 0) {
      if (timer === 60) {
        (async function () {
          try {
            const client = await getUpdateClient();
            const response = await client.mutate({
              mutation: GET_SMS_CODE,
              variables: {
                phone: '+7' + phoneNumber,
              },
            });
            if (response.data) {
              Toast.show({
                type: 'success',
                text1: 'Успешно',
                text2: 'СМС-код отправлен',
              });
            } else {
              Toast.show({
                type: 'error',
                text1: 'Ошибка',
                text2: 'Возникла ошибка попробуйте еще раз',
              });
            }
          } catch (e) {
            console.log('CODE_ERROR: ', e);
          }
        })();
      }
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [modalCode, phoneNumber, timer]);

  React.useEffect(() => {
    if (code.length === 4) {
      (async function () {
        const client = await getUpdateClient();
        try {
          setLoading(true);
          const response = await client.mutate({
            mutation: CHANGE_PHONE,
            variables: {
              changePhoneInput: {
                oldPhone: oldPhone,
                phone: '+7' + phoneNumber,
                code: code,
                password: password,
              },
            },
          });
          if (response.data) {
            dispatch(setUser({...user, phone: '+7' + phoneNumber}));
            shouldClose();
            setModalCode(false);
            setCode('');
            AppMetrica.reportEvent('PHONE_EDIT', {
              user: user,
              date: new Date(),
              date_string: new Date().toString(),
              platform: Platform.OS,
              app_version: DeviceInfo.getVersion(),
            });
            Toast.show({
              type: 'success',
              text1: 'Успешно',
              text2: 'Номер успешно сохранен',
            });
          }
        } catch (e: unknown) {
          console.log('CHANGE_PHONE_ERROR: ', e);
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
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, oldPhone, phoneNumber, shouldClose]);

  return (
    <BottomSheetView
      style={{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: colors.fillPrimary,
        paddingBottom: 15 + insets.bottom,
        paddingTop: 24,
      }}>
      <View style={{flex: 1}}>
        <BoldText
          fontSize={16}
          style={{fontWeight: '700', alignSelf: 'center'}}>
          Изменить номер
        </BoldText>
        <InputText
          autoFocus={false}
          style={{marginTop: 30}}
          errorState={errorPhone}
          keyboardType={'numeric'}
          label={'Новый номер телефона'}
          mask="phone"
          value={phoneNumber}
          onChangeText={(formatted, noFormat) => {
            if (noFormat !== undefined) {
              setPhoneNumber(noFormat);
              setFormattedPhone(formatted);
              setErrorPhone(false);
            }
          }}
        />
        {errorPhone ? (
          <MediumText
            fontSize={12}
            style={{color: colors.danger, marginTop: 8}}>
            Номер телефона некорректен
          </MediumText>
        ) : (
          <></>
        )}

        <InputText
          autoFocus={false}
          style={{marginTop: 16}}
          errorState={errorPassword}
          value={password}
          secureTextEntry={!showPassword}
          logo={
            <TouchableOpacity
              style={{paddingRight: 15}}
              onPress={() => {
                setShowPassword(!showPassword);
              }}>
              {showPassword ? (
                <Show
                  color={errorPassword ? colors.danger : colors.colorMain}
                />
              ) : (
                <Hide
                  color={errorPassword ? colors.danger : colors.colorMain}
                />
              )}
            </TouchableOpacity>
          }
          label={'Введите пароль'}
          onChangeText={formatted => {
            setPassword(formatted);
            setErrorPassword(false);
          }}
        />
        {errorPassword ? (
          <MediumText
            fontSize={12}
            style={{color: colors.danger, marginTop: 8}}>
            Пароль должен иметь минимум {PASSWORD_LENGTH} символов
          </MediumText>
        ) : (
          <></>
        )}
      </View>
      <Button
        title={'Получить код'}
        onPress={() => {
          if (phoneNumber.length === 10) {
            if (password.length >= PASSWORD_LENGTH) {
              if (oldPhone === '+7' + phoneNumber) {
                Toast.show({
                  type: 'error',
                  text1: 'Ошибка',
                  text2: 'Новый номер совпадает со старым номером',
                });
              } else {
                setModalCode(true);
              }
            } else {
              setErrorPassword(true);
            }
          } else {
            setErrorPhone(true);
            if (password.length < PASSWORD_LENGTH) {
              setErrorPassword(true);
            }
          }
        }}
        loading={loading}
        loadingColor={colors.white}
        loadingSize="small"
        icon={
          <AuthLogo color={theme === 'dark' ? colors.black : colors.white} />
        }
      />
      <ModalComponent
        visible={modalCode}
        shouldClose={() => {
          setCode('');
          setModalCode(false);
        }}
        child={
          <Containter style={{backgroundColor: colors.fillPrimary}}>
            <BoldText fontSize={16} style={{textAlign: 'center'}}>
              Смс-подтверждение
            </BoldText>
            <RegularText
              fontSize={14}
              style={{marginTop: 25, textAlign: 'center'}}>
              Код отправлен на номер {formattedPhone}
            </RegularText>
            <CodeField
              ref={refCode}
              {...props}
              value={code}
              onChangeText={value => {
                setCode(value);
              }}
              rootStyle={{marginTop: 20}}
              cellCount={4}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  onLayout={getCellOnLayoutHandler(index)}
                  style={[
                    styles.cell,
                    {
                      width: (screenWidth - 30 - 45) / 4,
                      backgroundColor: colors.input,
                      borderColor: isFocused
                        ? colors.colorMain
                        : colors.borderPrimary,
                    },
                  ]}>
                  <MediumText fontSize={28}>
                    {symbol || (isFocused ? <Cursor cursorSymbol="|" /> : null)}
                  </MediumText>
                </View>
              )}
            />
            {timer > 0 ? (
              <RegularText
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  color: colors.textSecondary,
                }}>
                Вы можете запросить смс-код через {timer} сек
              </RegularText>
            ) : (
              <TouchableOpacity
                onPress={() => setTimer(60)}
                style={{alignItems: 'center', marginTop: 20}}>
                <RegularText style={{color: colors.colorMain}}>
                  Повторно запросить SMS код
                </RegularText>
              </TouchableOpacity>
            )}
          </Containter>
        }
      />
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  cell: {
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
