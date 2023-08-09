import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MenuParamList = {
  Home: undefined;
};

export type MenuNavigationProps<T extends keyof MenuParamList> =
  NativeStackScreenProps<MenuParamList, T>;
