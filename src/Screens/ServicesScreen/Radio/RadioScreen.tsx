import * as React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {
  TabView,
  SceneRendererProps,
  Route,
  TabBar,
  NavigationState,
} from 'react-native-tab-view';

import {RadioPlayer} from '../../../Screens/ServicesScreen/Radio/RadioPlayer';

import {MediumText} from '../../../components';
import {RadioSVG} from '../../../components/SVGcomponents/RadioSVG';
import {RadioProgramSVG} from '../../../components/SVGcomponents/RadioProgramSVG';
import {themeColors, useTheme} from '../../../Styles/Styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RadioProgramTopNavigator} from './components/RadioProgramTopNavigator';

interface IRenderSceneProps extends SceneRendererProps {
  route: Route;
}

interface IRenderTabBarProps extends SceneRendererProps {
  navigationState: NavigationState<Route>;
}

export const RadioScreen: React.FC = () => {
  const screenWidth = useWindowDimensions().width;
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'RadioPlayer', title: 'Радио'},
    {key: 'Program', title: 'Программа'},
  ]);

  const renderScene = React.useCallback(
    ({route: renderRoute}: IRenderSceneProps) => {
      switch (renderRoute.key) {
        case 'RadioPlayer':
          return <RadioPlayer />;
        case 'Program':
          return <RadioProgramTopNavigator />;
        // return <RadioProgramScreen />;
      }
    },
    [],
  );

  const RenderTabBar = (tabBarProps: IRenderTabBarProps) => {
    return (
      <TabBar
        {...tabBarProps}
        activeColor="white"
        style={{
          backgroundColor: colors.bgRadio,
          marginBottom: insets.bottom,
        }}
        inactiveColor="green"
        scrollEnabled
        pressColor="transparent"
        gap={2}
        tabStyle={{
          width: screenWidth / 2,
        }}
        indicatorStyle={{
          backgroundColor: 'transparent',
        }}
        renderLabel={({route: routeLabel, focused}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            {routeLabel.key === 'RadioPlayer' ? (
              <RadioSVG color={focused ? colors.white : colors.textSecondary} />
            ) : (
              <RadioProgramSVG
                color={focused ? colors.white : colors.textSecondary}
              />
            )}
            <MediumText
              style={{
                color: focused ? colors.white : colors.textSecondary,
                textAlign: 'center',
                marginLeft: 10,
              }}>
              {routeLabel.title}
            </MediumText>
          </View>
        )}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: themeColors.dark.bgRadio}}>
      <TabView
        lazy
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={RenderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: screenWidth}}
        tabBarPosition={'bottom'}
      />
    </View>
  );
};
