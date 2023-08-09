import * as React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

import {
  BoldText,
  RegularText,
  InputText,
  FormContainer,
  Button,
} from '../../components';
import {Hide, Show} from '../../components/SVGcomponents';
import {LoginNavigationProps} from '../../navigation/types/LoginTypes';
import {loginUser} from '../../redux/thunks/auth/Login';
import {useAppDispatch} from '../../redux/hooks';
import {setLogged} from '../../redux/slices/authSlice';
import {useTheme} from '../../Styles/Styles';

export const PasswordScreen = (
  props: LoginNavigationProps<'PasswordScreen'>,
) => {
  const {navigation, route} = props;
  const {phoneNumber} = route.params;
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const {colors, theme} = useTheme();
  const dispatch = useAppDispatch();

  return (
    <FormContainer style={{flex: 1, backgroundColor: colors.fillPrimary}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <BoldText fontSize={16} style={{textAlign: 'center', marginTop: 20}}>
            Введите пароль
          </BoldText>
          <InputText
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
            style={{
              marginTop: 20,
              paddingRight: 20,
            }}
            label="Введите пароль"
            secureTextEntry={visible}
            logo={
              <TouchableOpacity
                onPress={() => {
                  setVisible(!visible);
                }}>
                {!visible ? <Show /> : <Hide />}
              </TouchableOpacity>
            }
          />
          <TouchableOpacity
            style={styles.touchRemember}
            onPress={() => {
              navigation.navigate('SmsCodeScr', {
                to: 'NewPassword',
                phoneNumber,
              });
            }}>
            <RegularText
              fontSize={12}
              style={{color: colors.colorMain, textAlign: 'center'}}>
              Я не помню свой пароль
            </RegularText>
          </TouchableOpacity>
        </View>
        <Button
          title="Войти"
          disabled={password.length >= 6 ? false : true}
          onPress={async () => {
            setLoading(true);
            let response = await dispatch(
              loginUser({
                phone: phoneNumber,
                password: password,
              }),
            );
            setLoading(false);
            if (response.meta.requestStatus === 'rejected') {
              Toast.show({
                type: 'error',
                text1: 'Ошибка',
                text2: 'Проверьте правильность ввода пароля',
              });
            } else {
              dispatch(setLogged(true));
            }
          }}
          loading={loading}
          loadingColor={theme === 'dark' ? colors.black : colors.white}
          loadingSize="small"
        />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  touchRemember: {
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
