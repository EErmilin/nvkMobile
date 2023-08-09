import * as React from 'react';
import {TouchableOpacity, Animated} from 'react-native';
import {useTheme} from '../Styles/Styles';
export const CustomSwitch = ({value, onChangeValue}: any) => {
  const [animValue] = React.useState(new Animated.Value(value ? 18 : 0));
  const {colors} = useTheme();
  React.useEffect(() => {
    Animated.timing(animValue, {
      toValue: value ? 18 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animValue, value]);

  return (
    <TouchableOpacity
      delayPressIn={70}
      style={{
        width: 44,
        height: 26,
        backgroundColor: value ? colors.success : colors.textSecondary,
        borderRadius: 13,
      }}
      onPress={() => {
        onChangeValue(!value);
      }}>
      <Animated.View
        style={{
          width: 22,
          height: 22,
          borderRadius: 22,
          backgroundColor: '#fff',
          marginLeft: 2,
          marginTop: 2,
          transform: [
            {
              translateX: animValue,
            },
          ],
        }}
      />
    </TouchableOpacity>
  );
};
