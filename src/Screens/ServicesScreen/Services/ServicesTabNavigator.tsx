import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Services} from './TabViewScreens/Services';
import {Announcement} from './TabViewScreens/Announcement';
import {IAdsPreview, IServicePreview} from '../../../models/Service';
import {RootNavigationProps} from '../../../navigation/types/RootStackTypes';
import {useTheme} from '../../../Styles/Styles';
import {Animated, I18nManager} from 'react-native';

const Tab = createMaterialTopTabNavigator();

interface IProps {
  services: IServicePreview[];
  announcements: IAdsPreview[];
  update: () => void;
  loading: boolean;
}

export const ServicesTabNavigator = (props: IProps) => {
  const {services, announcements, update, loading} = props;
  const {colors} = useTheme();

  const ServiceC = React.useCallback(
    (propsC: RootNavigationProps<'ServicesScreen'>) => {
      return (
        <Services
          {...propsC}
          services={services}
          update={update}
          loading={loading}
        />
      );
    },
    [loading, services, update],
  );

  const AnnouncementC = React.useCallback(
    (propsC: RootNavigationProps<'ServicesScreen'>) => {
      return (
        <Announcement
          {...propsC}
          announcements={announcements}
          update={update}
          loading={loading}
        />
      );
    },
    [announcements, loading, update],
  );

  return (
    <Tab.Navigator
      screenOptions={({navigation}) => ({
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'NotoSans-Medium',
          textTransform: 'none',
          fontWeight: '600',
        },
        tabBarStyle: {
          height: 50,
        },
        tabBarActiveTintColor: colors.colorMain,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarItemStyle: {
          width: 'auto',
          paddingHorizontal: 5,
        },
        tabBarIndicator: propsC => (
          <TabBarIndicator {...propsC} navigation={navigation} />
        ),
      })}>
      <Tab.Screen
        name="Services"
        component={(propsC: any) => ServiceC(propsC)}
        options={{
          title: 'Услуги',
        }}
      />
      <Tab.Screen
        name="Announcement"
        component={(propsC: any) => AnnouncementC(propsC)}
        options={{
          title: 'Заявка на рекламу',
        }}
      />
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
          width: props.getTabWidth(width),
          height: 3,
          backgroundColor: colors.colorMain,
          position: 'absolute',
          bottom: 0,
          transform: [
            {
              translateX,
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
