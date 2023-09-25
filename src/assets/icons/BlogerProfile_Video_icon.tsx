import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {styles} from './style';

type TProps = {
  active?: boolean;
  containerStyle?: ViewStyle;
  backgroundColor?: string;
  onPress?: () => void;
};

const BlogerProfile_Video_icon: FC<TProps> = (
  {containerStyle, backgroundColor, active, onPress},
  props,
) => {
  return (
    <TouchableOpacity
      hitSlop={30}
      onPress={onPress}
      activeOpacity={onPress ? 1 : 2}
      style={[styles.container, containerStyle, {backgroundColor}]}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={24}
        fill="none"
        {...props}>
        <Path
          d="M7 20.353C7.21946 20.4978 7.44496 20.6341 7.67604 20.7616C9.10645 21.5509 10.7508 22 12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 13.7553 2.95224 15.4049 3.74655 16.8388C3.8717 17.0647 4.00533 17.2852 4.14702 17.5M15 11L15.1271 11.0847C15.7802 11.5201 15.7802 12.4799 15.1271 12.9153L12.2102 14.8599C11.4792 15.3472 10.5 14.8232 10.5 13.9446V9.94281C10.5 9.08779 11.4328 8.55966 12.1659 8.99957L12.375 9.125"
          stroke={active ? '#F6A80B' : '#BBBBBB'}
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default BlogerProfile_Video_icon;
