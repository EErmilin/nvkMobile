import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from '../../Styles/Styles';

interface IProps {
  color?: string;
}

export function Minus(props: IProps) {
  const {colors} = useTheme();
  const {color = colors.colorMain} = props;
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 12H18"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg>
  );
}
