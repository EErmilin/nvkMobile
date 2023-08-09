import React, {useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import GoogleRecaptcha, {
  GoogleRecaptchaRefAttributes,
} from 'react-native-google-recaptcha';
import {ApolloError} from '@apollo/client';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import {apolloClient} from '../../apolloClient';
import {
  BoldText,
  Button,
  FormContainer,
  InputText,
  RegularText,
} from '../../components';
import {AuthLogo, Close} from '../../components/SVGcomponents';
import {checkUserByPhone} from '../../gql/mutation/auth/CheckUserByPhone';
import {PHONE_MASK} from '../../helpers/masks';
import {LoginNavigationProps} from '../../navigation/types/LoginTypes';
import {setLogged} from '../../redux/slices/authSlice';
import {useAppDispatch} from '../../redux/hooks';
import {useTheme} from '../../Styles/Styles';
import {RECAPTCHA_SITE_KEY} from '../../api/config';
import DeviceInfo from 'react-native-device-info';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const PhoneInputScr: React.FC<LoginNavigationProps<'PhoneInputScr'>> = ({
  navigation,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('+7');
  const [noFormatted, setNotFormatted] = React.useState<string>('+7');
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const recaptchaRef = React.useRef<GoogleRecaptchaRefAttributes>(null);
  const {colors, theme} = useTheme();
  const insets = useSafeAreaInsets();

  const handleSend = async () => {
    try {
      await recaptchaRef.current?.getToken();
    } catch (e) {
      console.error('Recaptcha Error:', e);
    }
  };

  const handleVerify = async () => {
    navigation.navigate('SmsCodeScr', {
      phoneNumber: '+7' + noFormatted,
      to: 'RegisterScreen',
    });
  };

  const handleError = (errorRecaptcha: unknown) => {
    console.log('error', errorRecaptcha);
  };

  return (
    <FormContainer
      style={{
        flex: 1,
        backgroundColor: colors.fillPrimary,
      }}
      styleView={{flex: 1, backgroundColor: colors.fillPrimary}}>
      <GoogleRecaptcha
        ref={recaptchaRef}
        baseUrl="http://nvksakha.com"
        onError={handleError}
        onVerify={handleVerify}
        siteKey={RECAPTCHA_SITE_KEY}
        modalProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        }}
        headerComponent={
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: (48 - 15) / 2,
              top: insets.top + 15,
              backgroundColor:
                Platform.OS === 'android'
                  ? 'rgba(0, 0, 0, 0.3)'
                  : 'rgba(0, 0, 0, 0.2)',
              borderRadius: 24,
              zIndex: 100,
              alignSelf: 'flex-end',
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              recaptchaRef.current?.close();
            }}>
            <Close size={'24'} color={colors.white} />
          </TouchableOpacity>
        }
        lang="ru"
      />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{flex: 1}}>
          <View style={{alignItems: 'center', marginTop: 50}}>
            <BoldText
              fontSize={16}
              style={{marginBottom: 20, color: colors.textPrimary}}>
              Введите номер телефона
            </BoldText>
            <RegularText
              style={{
                marginBottom: 50,
                textAlign: 'center',
                color: colors.textPrimary,
              }}>
              На указанный номер, мы отправим SMS код.
            </RegularText>
          </View>
          <InputText
            autoFocus={false}
            styleText={{
              color: error ? colors.danger : colors.textPrimary,
            }}
            errorState={error}
            maxLength={17}
            keyboardType={'numeric'}
            label={'Телефон'}
            value={phoneNumber}
            onChangeText={(formatted, extracted) => {
              setPhoneNumber(formatted);
              if (extracted) {
                setNotFormatted(extracted);
              }
              setError(false);
            }}
            mask={PHONE_MASK}
          />
        </View>
        <View>
          <Button
            disabled={phoneNumber.length >= 17 ? false : true}
            title={'Авторизоваться'}
            style={{marginBottom: 10}}
            icon={
              <AuthLogo
                color={
                  phoneNumber.length >= 17
                    ? theme === 'dark'
                      ? colors.black
                      : colors.white
                    : colors.textSecondary
                }
              />
            }
            loading={loading}
            loadingColor={theme === 'dark' ? colors.black : colors.white}
            loadingSize={'small'}
            onPress={async () => {
              try {
                setLoading(true);
                let response = await apolloClient.mutate({
                  mutation: checkUserByPhone,
                  variables: {
                    phone: '+7' + noFormatted,
                  },
                });
                if (response.data.checkUserByPhone === false) {
                  setLoading(false);
                  handleSend();
                } else {
                  setLoading(false);
                  navigation.navigate('PasswordScreen', {
                    phoneNumber: '+7' + noFormatted,
                  });
                }
              } catch (e: unknown) {
                if (e instanceof ApolloError) {
                  console.log('e', e);
                  Toast.show({
                    type: 'error',
                    text1: 'Ошибка',
                    text2: e.message,
                  });
                }
                setLoading(false);
              }
            }}
          />

          <Button
            title={'Пропустить'}
            style={{backgroundColor: colors.fillPrimary}}
            textStyle={{color: colors.colorMain}}
            onPress={() => {
              AppMetrica.reportEvent('SKIP_LOGIN', {
                user: null,
                date: new Date(),
                date_string: new Date().toString(),
                platform: Platform.OS,
                device_id: DeviceInfo.getDeviceId(),
                app_version: DeviceInfo.getVersion(),
              });
              dispatch(setLogged(true));
            }}
          />
        </View>
      </View>
    </FormContainer>
  );
};
