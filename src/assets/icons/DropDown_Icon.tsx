import {FC} from 'react';
import {View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {styles} from './style';

type TProps = {
  containerStyle?: ViewStyle;
  backgroundColor?: string;
};

const DropDown_Icon: FC<TProps> = (
  {containerStyle, backgroundColor},
  props,
) => {
  return (
    <View style={[styles.container, containerStyle, {backgroundColor}]}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}>
        <Path
          d="M7 10L12 15L17 10"
          stroke="#F6A80B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export default DropDown_Icon;
