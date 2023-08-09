import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootLoginParamList = {
  CarouselScreen: undefined;
  PhoneInputScr: undefined;
  SmsCodeScr: {
    phoneNumber: string;
    to: 'RegisterScreen' | 'NewPassword';
  };
  RegisterScreen: {
    phoneNumber: string;
    code: string;
  };
  PasswordScreen: {
    phoneNumber: string;
  };
  PlacementPermissionScreen: undefined;
  NewPassword: {
    phoneNumber: string;
    code: string;
  };
  PrivacyPolicy: {
    id: number;
  };
  UseOfTerms: {
    id: number;
  };
};

export type LoginNavigationProps<T extends keyof RootLoginParamList> =
  NativeStackScreenProps<RootLoginParamList, T>;
