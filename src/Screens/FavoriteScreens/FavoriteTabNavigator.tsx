import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FavoritePost} from './FavoritePost';
import {FavoriteBroadcast} from './FavoriteBroadcast';
import {FavoriteMusic} from './FavoriteMusic';
import {FavoritePodcast} from './FavoritePodcast';
import {useTheme} from '../../Styles/Styles';
import {Animated, I18nManager, useWindowDimensions} from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import {FavoriteMult} from './FavoriteMult';
import {useAppSelector} from '../../redux/hooks';
import {FavoriteMovie} from './FavoriteMovie';
import {FavoriteSeries} from './FavoriteSeries';

const Tab = createMaterialTopTabNavigator();

export const FavoriteTabNavigator = () => {
  const {colors} = useTheme();
  const screenWidth = useWindowDimensions().width;

  const Indicator = React.useCallback((props: any, navigation: any) => {
    return <TabBarIndicator {...props} navigation={navigation} />;
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({navigation}) => ({
        tabBarItemStyle: {
          width: 'auto',
          paddingHorizontal: 0,
          marginRight: 7.5,
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: colors.fillPrimary,
          width: screenWidth,
          paddingHorizontal: 15,
        },
        tabBarStyle: {
          paddingHorizontal: 7.5,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.colorMain,
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
        tabBarIndicator: props => Indicator(props, navigation),
        tabBarActiveTintColor: colors.colorMain,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: 'none',
          fontFamily: 'NotoSans-Medium',
        },
      })}>
      <Tab.Screen
        name="FavoritePost"
        component={FavoritePost}
        options={{
          title: 'Посты',
        }}
      />
      <Tab.Screen
        name="FavoriteMovie"
        component={FavoriteMovie}
        options={{
          title: 'Фильмы',
        }}
      />
      <Tab.Screen
        name="FavoriteMult"
        component={FavoriteMult}
        options={{
          title: 'Мультфильмы',
        }}
      />
      <Tab.Screen
        name="FavoriteSeries"
        component={FavoriteSeries}
        options={{
          title: 'Сериалы',
        }}
      />
      {/* {remoteConfig().getValue('broadcast_visible').asBoolean() ? (
        <Tab.Screen
          name="FavoriteBroadcast"
          component={FavoriteBroadcast}
          options={{title: 'Передачи'}}
        />
      ) : (
        <></>
      )}
      {remoteConfig().getValue('music_visible').asBoolean() ? (
        <Tab.Screen
          name="FavoriteMusic"
          component={FavoriteMusic}
          options={{title: 'Музыка'}}
        />
      ) : (
        <></>
      )}

      <Tab.Screen
        name="FavoritePodcast"
        component={FavoritePodcast}
        options={{title: 'Подкасты'}}
      /> */}
    </Tab.Navigator>
  );
};

interface TabBarProps {
  position: Animated.AnimatedInterpolation<number>;
  state: any;
  getTabWidth: (value: number) => number;
  navigation: any;
}

const TabBarIndicator = (props: TabBarProps) => {
  const {colors} = useTheme();

  const translateX = getTranslateX(
    props.position,
    props.state.routes,
    props.getTabWidth,
    0,
  );
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    props.position.addListener(t => {
      setWidth(Math.round(t.value));
    });
  }, [props.position]);

  return (
    <Animated.View
      style={[
        {
          width: props.getTabWidth(width) - 7.5,
          height: 3,
          backgroundColor: colors.colorMain,
          position: 'absolute',
          left: 7.5,
          bottom: 0,
          transform: [
            {
              translateX: translateX,
            },
          ],
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
      ]}
    />
  );
};

const getTranslateX = (
  position: Animated.AnimatedInterpolation<number>,
  routes: {key: string; name: string; param: any}[],
  getTabWidth: (value: number) => number,
  gap?: number,
) => {
  const inputRange = routes.map((_, i) => i);

  const outputRange = routes.reduce<number[]>((acc, _, i) => {
    if (i === 0) {
      return [0];
    }
    return [...acc, acc[i - 1] + getTabWidth(i - 1) + (gap ?? 0)];
  }, []);

  const translateX = position.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });

  return Animated.multiply(translateX, I18nManager.isRTL ? -1 : 1);
};
