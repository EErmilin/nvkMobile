import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from '../../Styles/Styles';
import {TouchableOpacity} from 'react-native';

interface IProps {
  color?: string;
  fill?: string;
  onPress?: () => void;
}

export function ArrowRight(props: IProps) {
  const {colors} = useTheme();
  const {color = colors.colorMain, fill = colors.bgSecondary, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width={24} height={24} viewBox="0 0 24 24" {...props} fill={fill}>
        <Path
          d="M10 7L15 12L10 17"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}
