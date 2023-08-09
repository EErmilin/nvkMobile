import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

export const Close: React.FC<{color?: string; size?: string}> = ({
  color = colors.orange,
  size = '20',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5 5L15 15"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M15 5L5 15"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};
