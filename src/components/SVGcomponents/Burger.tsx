import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

export const Burger: React.FC<{color?: string; size?: string}> = ({
  color = colors.white,
  size = '20',
}) => {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Path
        d="M16.667 5L3.33366 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M16.667 10H10.0003H8.33366M3.33366 10H5.00033"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M16.667 15H3.33366"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
