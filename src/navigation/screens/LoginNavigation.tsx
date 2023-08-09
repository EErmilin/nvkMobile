import * as React from 'react';
import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MediumText, BoldText} from '../../components';
import {ArrowLeft} from '../../components/SVGcomponents';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setCarousel} from '../../redux/slices/authSlice';
import {useTheme} from '../../Styles/Styles';

import {RootLoginParamList} from '../types/LoginTypes';
import {CarouselScreen} from '../../Screens/AuthScreens/CarouselScreen';
import {PhoneInputScr} from '../../Screens/AuthScreens/PhoneInputScr';
import {SmsCodeScr} from '../../Screens/AuthScreens/SmsCodeScr';
import {PasswordScreen} from '../../Screens/AuthScreens/PasswordScreen';
import {RegisterSreen} from '../../Screens/AuthScreens/RegisterScreen';
import {NewPassword} from '../../Screens/AuthScreens/NewPassword';
import {PrivacyPolicy} from '../../Screens/ProfilesScreen/PrivacyPolicy';
import {UseOfTerms} from '../../Screens/ProfilesScreen/UseOfTerms';

const Stack = createNativeStackNavigator<RootLoginParamList>();

export const LoginNavigation = () => {
  const carousel = useAppSelector(state => state.auth.carousel);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const screenWidth = useWindowDimensions().width;

  return (
    <Stack.Navigator
      initialRouteName={carousel ? 'CarouselScreen' : 'PhoneInputScr'}
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.fillPrimary,
          height: 56,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
        },
        headerShadowVisible: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color={colors.colorMain} />
          </TouchableOpacity>
        ),
      })}>
      <Stack.Screen
        name="CarouselScreen"
        component={CarouselScreen}
        options={({navigation}) => ({
          title: '',
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                dispatch(setCarousel(false));
                navigation.navigate('PhoneInputScr');
              }}>
              <MediumText style={{color: colors.colorMain}}>
                Пропустить
              </MediumText>
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="PhoneInputScr"
        component={PhoneInputScr}
        options={{
          headerBackVisible: false,
          title: '',
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          gestureEnabled: false,
          headerLeft: () => (
            <BoldText fontSize={16} style={{color: colors.textPrimary}}>
              Новый пароль
            </BoldText>
          ),
          title: '',
        }}
      />
      <Stack.Screen
        name="SmsCodeScr"
        component={SmsCodeScr}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterSreen}
        options={({navigation}) => ({
          headerBackVisible: false,
          headerLeft: () => null,
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
                width: screenWidth,
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: -15,
                  width: 48,
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.goBack()}>
                <ArrowLeft color={colors.colorMain} />
              </TouchableOpacity>
              <BoldText
                fontSize={16}
                style={{
                  color: colors.textPrimary,
                  flex: 1,
                  paddingBottom: 3,
                  marginHorizontal: 58,
                }}>
                Регистрация
              </BoldText>
              <View style={{width: 48}} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          presentation: 'modal',
          headerTitleAlign: 'left',
          title: 'Политика конфиденциальности',
        }}
      />
      <Stack.Screen
        name="UseOfTerms"
        component={UseOfTerms}
        options={{
          presentation: 'modal',
          headerTitleAlign: 'left',
          title: 'Условия пользования',
        }}
      />
    </Stack.Navigator>
  );
};
