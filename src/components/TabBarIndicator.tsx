import * as React from 'react';
import {
  Animated,
  Easing,
  I18nManager,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../Styles/Styles';
import {NavigationState, Route} from 'react-native-tab-view';
import {Layout} from 'react-native-tab-view/lib/typescript/src/types';
import {GetTabWidth} from 'react-native-tab-view/lib/typescript/src/TabBarIndicator';
import {useAnimatedValue} from 'react-native';

interface IProps {
  gap?: number;
  getTabWidth: (value: number) => number;
  jumpTo: (key: string) => void;
  layout: Layout;
  navigationState: NavigationState<Route>;
  position: Animated.AnimatedInterpolation<number>;
  style?: StyleProp<ViewStyle>;
  width: string | number;
  index2: number;
}

const getTranslateX = (
  position: Animated.AnimatedInterpolation<number>,
  routes: Route[],
  getTabWidth: GetTabWidth,
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

export const TabBarIndicator = (props: IProps) => {
  const {colors} = useTheme();
  const {navigationState, layout, position, getTabWidth, width, gap, index2} =
    props;
  const {routes} = navigationState;
  const transform = [];
  const isIndicatorShown = React.useRef(false);
  const isWidthDynamic = width === 'auto';
  const opacity = useAnimatedValue(isWidthDynamic ? 0 : 1);
  const indicatorVisible = isWidthDynamic
    ? layout.width &&
      navigationState.routes
        .slice(0, navigationState.index)
        .every((_, r) => getTabWidth(r))
    : true;

  React.useEffect(() => {
    const fadeInIndicator = () => {
      if (!isIndicatorShown.current && isWidthDynamic && indicatorVisible) {
        isIndicatorShown.current = true;

        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }).start();
      }
    };

    fadeInIndicator();

    return () => opacity.stopAnimation();
  }, [indicatorVisible, isWidthDynamic, opacity]);

  if (layout.width) {
    const translateX =
      routes.length > 1 ? getTranslateX(position, routes, getTabWidth, gap) : 0;
    transform.push({translateX});
  }

  return (
    <Animated.View
      style={[
        {
          width: width === 'auto' ? getTabWidth(index2) : width,
          height: 3,
          transform,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: colors.colorMain,
          position: 'absolute',
          bottom: 0,
        },

        // layout.width && Platform.OS !== 'macos'
        //   ? {left: 0}
        //   : {left: `${(100 / routes.length) * navigationState.index}%`},
        width === 'auto' ? {opacity: opacity} : null,
      ]}
    />
  );
};
