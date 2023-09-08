import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions, Text, View, StyleSheet} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {colors} from '../Styles/Styles';
import BoldText from './BoldText';

const BottomSheet = forwardRef((_, ref) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const showModalRef = useRef<any>(null);
  const translateYR = useSharedValue(0);

  useImperativeHandle(ref, () => ({
    show: () => {
      translateYR.value = withTiming(translateYR.value - height);
    },
  }));

  useEffect(() => {}, [useImperativeHandle]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: translateYR}],
          height,
          width,
        },
      ]}
      ref={showModalRef}>
      <View style={styles.drag} />
      <BoldText fontSize={18}>Оценить</BoldText>
    </Animated.View>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
    bottom: 0 - 75,
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  drag: {
    width: 50,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
  },
});
