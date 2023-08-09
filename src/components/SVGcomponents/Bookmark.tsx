import * as React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from '../../Styles/Styles';

interface BookMarkProps {
  color?: ColorValue;
  colorInLine?: ColorValue;
  size?: number;
  fill?: string;
}

export function BookMark(props: BookMarkProps) {
  const {colors} = useTheme();
  const {
    color = colors.textPrimary,
    colorInLine = colors.textPrimary,
    size = 24,
    fill = 'none',
  } = props;
  return (
    <Svg width={size} height={size} viewBox="0 0 14 18" fill={fill}>
      <Path
        d="M1.167 7.958V4.833A3.333 3.333 0 014.5 1.5h5a3.333 3.333 0 013.333 3.333v10.974a.833.833 0 01-1.284.7l-3.648-2.344a1.667 1.667 0 00-1.802 0L2.45 16.508a.833.833 0 01-1.284-.701v-4.099"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M4.5 6.083h5"
        stroke={colorInLine}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
