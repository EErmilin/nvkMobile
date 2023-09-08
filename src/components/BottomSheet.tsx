import React from 'react';
import {useWindowDimensions, Text} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {colors} from '../Styles/Styles';

const BottomSheet = ({isVisible}: any) => {
  const {height: HEIGHT, width: WIDTH} = useWindowDimensions();
  const translateY = useSharedValue(0);
  const bottom = useSharedValue(-HEIGHT);

  React.useEffect(() => {
    translateY.value = withTiming(translateY.value - HEIGHT);
  }, [isVisible]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        backgroundColor: colors.black,
        zIndex: 200,
        width: WIDTH,
        height: HEIGHT,
        bottom: bottom,
        transform: [{translateY: translateY}],
      }}>
      <Text>Bottom</Text>
    </Animated.View>
  );
};
