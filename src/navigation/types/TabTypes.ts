import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {RootNavigationProps, RootStackParamList} from './RootStackTypes';

export type TabParamList = {
  Main: {authorId?: number; where?: any} | undefined;
  Home: undefined;
  Search: {page?: number; searchValue?: string};
  Services: undefined;
  Favorite: undefined;
  Profile: undefined;
};

export type TabNavigationProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    RootNavigationProps<keyof RootStackParamList>
  >;
