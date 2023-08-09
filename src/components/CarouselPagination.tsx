import * as React from 'react';
import {View, ViewStyle, StyleSheet, Animated} from 'react-native';
import {useTheme} from '../Styles/Styles';

interface IProp {
  style?: ViewStyle;
  length: number;
  currentX: number;
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 8,
    marginRight: 5,
    borderRadius: 4,
  },
});

export const CarouselPagination = (props: IProp) => {
  const {style, length = 3, currentX} = props;
  return (
    <View style={[styles.main, style]}>
      {Array.from({length: length}, (_, i) => i + 1).map((item, index) => (
        <Dot key={index.toString()} index={index} currentX={currentX} />
      ))}
    </View>
  );
};

const Dot = (props: {index: number; currentX: number}) => {
  const {index, currentX} = props;
  const {colors} = useTheme();
  const animated = React.useRef(new Animated.Value(0));

  React.useEffect(() => {
    if (index === currentX) {
      Animated.timing(animated.current, {
        toValue: 24,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animated.current, {
        toValue: 8,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [currentX, index]);

  const calWidth = animated.current.interpolate({
    inputRange: [8, 24],
    outputRange: [8, 24],
  });

  return (
    <Animated.View
      key={index.toString()}
      style={[
        styles.dot,
        {
          width: calWidth,
          backgroundColor:
            currentX === index ? colors.colorMain : colors.orangeBg,
        },
      ]}
    />
  );
};
