import * as React from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  CodeField,
  useClearByFocusCell,
  Cursor,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import MaskInput from 'react-native-mask-input';
import Toast from 'react-native-toast-message';
import {ApolloError} from '@apollo/client';
// @ts-ignore
import SMSUserConsent from 'react-native-sms-user-consent';

import {apolloClient} from '../../apolloClient';
import {BoldText, FormContainer, RegularText} from '../../components';
import {GET_SMS_CODE} from '../../gql/mutation/auth/GetSmsCode';
import {VALIDATE_SMS_CODE} from '../../gql/mutation/auth/ValidateSmsCode';
import {PHONE_MASK} from '../../helpers/masks';
import {LoginNavigationProps} from '../../navigation/types/LoginTypes';
import {useTheme} from '../../Styles/Styles';

interface SMSMessage {
  receivedOtpMessage: string;
}

const removeSmsListener = () => {
  try {
    SMSUserConsent.removeOTPListener();
  } catch (e) {
    // error
  }
};

export const SmsCodeScr: React.FC<LoginNavigationProps<'SmsCodeScr'>> = ({
  navigation,
  route,
}) => {
  const {colors} = useTheme();
  const {phoneNumber, to} = route.params;
  const [value, setValue] = React.useState('');
  const [err, setErr] = React.useState(false);
  const ref = useBlurOnFulfill({value, cellCount: 4});
  const screenWidth = useWindowDimensions().width;
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [secs, setSecs] = React.useState(60);

  const getSMSMessage = async () => {
    try {
      const message: SMSMessage = await SMSUserConsent.listenOTP();
      console.log('message', message);
      setValue(message.receivedOtpMessage.substring(0, 4));
    } catch (e) {
      // error
    }
  };

  React.useEffect(() => {
    getSMSMessage();

    return () => removeSmsListener();
  }, []);

  React.useEffect(() => {
    if (secs === 60) {
      (async function () {
        let response = await apolloClient.mutate({
          mutation: GET_SMS_CODE,
          variables: {
            phone: phoneNumber,
          },
        });
        if (response.data.getSmsCode === true) {
        } else {
          Toast.show({
            type: 'error',
            text1: 'Ошибка',
            text2: 'Ошибка при отправке смс-кода',
          });
        }
      })();
    }
    setTimeout(() => {
      if (secs > 0) {
        setSecs(secs - 1);
      }
    }, 1000);
  }, [phoneNumber, secs]);

  React.useEffect(() => {
    if (value.length === 4) {
      (async function () {
        try {
          const response = await apolloClient.mutate({
            mutation: VALIDATE_SMS_CODE,
            variables: {
              phone: phoneNumber,
              code: value,
            },
          });
          if (response.data.validateSmsCode === true) {
            navigation.navigate(to, {phoneNumber, code: value});
          } else {
            setErr(true);
          }
        } catch (e: unknown) {
          if (e instanceof ApolloError) {
            if (e.message === 'Invalid code') {
              setErr(true);
            }
          }
        }
      })();
    }
  }, [navigation, phoneNumber, to, value]);

  return (
    <FormContainer style={{backgroundColor: colors.fillPrimary}}>
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <BoldText fontSize={16} style={{marginBottom: 20}}>
            Введите смс-код
          </BoldText>
          <RegularText fontSize={14} style={{textAlign: 'center'}}>
            Код отправлен на номер
          </RegularText>
          <MaskInput
            value={phoneNumber}
            editable={false}
            style={{
              color: colors.textPrimary,
              marginBottom: 20,
              padding: 0,
            }}
            mask={PHONE_MASK}
          />
        </View>
        <CodeField
          {...props}
          ref={ref}
          caretHidden={false}
          value={value}
          onTouchStart={() => {}}
          onChangeText={(text: string) => {
            setValue(text);
            setErr(false);
          }}
          cellCount={4}
          rootStyle={{marginTop: 30}}
          autoFocus
          autoComplete="sms-otp"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[
                {
                  width: (screenWidth - 2 * 15 - 45) / 4,
                  height: (screenWidth - 2 * 15 - 45) / 4 + 5,
                  backgroundColor: colors.input,
                  borderColor: err
                    ? colors.danger
                    : isFocused
                    ? colors.colorMain
                    : colors.background,
                },
                styles.viewCell,
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={[styles.textCell, {color: colors.textPrimary}]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        {err ? (
          <Text style={[styles.textError, {color: colors.danger}]}>
            Ошибка, код не подходит
          </Text>
        ) : null}
        {secs > 0 ? (
          <RegularText
            fontSize={12}
            style={[styles.textRepeatSend, {color: colors.textSecondary}]}>
            Повторно запросить смс-код можно через{' '}
            <RegularText style={{color: colors.colorMain}}>
              ({secs} сек)
            </RegularText>
          </RegularText>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setSecs(60);
            }}
            style={{alignSelf: 'center', marginTop: 16}}>
            <RegularText style={{color: colors.colorMain}}>
              Отправить запрос заново
            </RegularText>
          </TouchableOpacity>
        )}
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  viewCell: {
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCell: {
    fontSize: 28,
    fontFamily: 'NotoSans-Regular',
  },
  textError: {
    marginHorizontal: 15,
    marginTop: 15,
    fontSize: 12,
    fontWeight: '400',
  },
  textRepeatSend: {
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
