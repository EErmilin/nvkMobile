import {FC} from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {styles} from './style';
import props from '../../api/pipModeStyles';

type TProps = {
  mt?: number | string;
};

const CheckedInput: FC<TProps> = ({mt}, props) => {
  return (
    <View style={[styles.container, {marginTop: mt}]}>
      <Svg
        width={13}
        height={11}
        viewBox="0 0 13 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
          d="M1 6.71875L4.375 10L12.25 1.25"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export default CheckedInput;
