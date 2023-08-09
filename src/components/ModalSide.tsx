import React from 'react';
import {
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  View,
  TouchableOpacity,
  PanResponder,
} from 'react-native';
import {useTheme} from '../Styles/Styles';

interface ModalSide {
  visible: boolean;
  setVisible: Function;
  children: React.ReactNode;
}

export const ModalSide: React.FC<ModalSide> = props => {
  const {visible, setVisible, children} = props;
  const animValue = React.useRef(new Animated.Value(-310)).current;
  const dimention = Dimensions.get('screen');
  const {colors} = useTheme();
  const pan: any = React.useRef(
    new Animated.ValueXY({
      x: 310,
      y: 0,
    }),
  ).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: -310,
        duration: 60,
        useNativeDriver: false,
      }).start();
    }
  }, [animValue, visible]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
        },
      ],
      {useNativeDriver: false},
    ),
    onPanResponderRelease: () => {
      if (pan.x._value > 155) {
        setVisible(false);
      } else {
        Animated.timing(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
          duration: 120,
        }).start();
      }
    },
  });

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      hardwareAccelerated
      onShow={() => {
        Animated.timing(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
          duration: 0,
        }).start();
      }}
      onRequestClose={() => setVisible(false)}>
      <View style={styles.background}>
        <TouchableOpacity onPress={() => setVisible(false)} style={{flex: 1}} />
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.container,
            {
              right: animValue,
              height: dimention.height,
              width: 310,
              backgroundColor: colors.fillPrimary,
              transform: [
                {
                  translateX: pan.x,
                },
              ],
            },
          ]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
  },
  container: {
    position: 'absolute',
    height: '100%',
  },
});
