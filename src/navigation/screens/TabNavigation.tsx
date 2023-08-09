import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../Styles/Styles';

import {TabParamList} from '../types/TabTypes';
import {ServiceScreen} from '../../Screens/TabsScreens/ServiceScreen';
import {SearchScreen} from '../../Screens/TabsScreens/SearchScreen';
import {Main} from '../../Screens/TabsScreens/Main';
import {FavoriteScreen} from '../../Screens/TabsScreens/FavoriteScreen';
import {ProfileScreen} from '../../Screens/TabsScreens/ProfileScreen';
import {useAppSelector} from '../../redux/hooks';
import {CustomTabBar} from './TabBar/CustomTabBar';
import {MusicPlayerContext} from '../../contexts/musicContext';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigation = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const token = useAppSelector(state => state.auth.token);
  const musicContext = React.useContext(MusicPlayerContext);

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'NotoSans-Bold',
          fontWeight: '700',
          color: colors.textPrimary,
        },
        headerShadowVisible: false,
        tabBarStyle: {
          height:
            musicContext.musicPlayerOption.music !== null
              ? 70 + 55 + insets.bottom
              : 70 + insets.bottom,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingVertical: 21,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          overflow: 'hidden',
          position: 'absolute',
          bottom: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          backgroundColor: colors.fillPrimary,
          borderTopWidth: 0,
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarItemStyle: {
          height: 42,
          marginTop: musicContext.musicPlayerOption.music !== null ? 55 : 0,
        },
        headerStyle: {
          backgroundColor: colors.fillPrimary,
        },
        tabBarActiveTintColor: colors.colorMain,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'NotoSans-Medium',
          marginTop: 10,
        },
        tabBarBadgeStyle: {
          backgroundColor: colors.fillPrimary,
        },
      }}>
      <Tab.Screen
        name="Services"
        component={ServiceScreen}
        options={{
          headerShown: false,
          title: 'Главная',
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          title: 'Лента',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          title: 'Поиск',
        }}
        initialParams={{
          page: 0,
          searchValue: '',
        }}
      />

      {token ? (
        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            title: 'Избранное',
          }}
        />
      ) : (
        <></>
      )}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: 'Профиль',
        }}
      />
    </Tab.Navigator>
  );
};
