import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

interface Share {
  color?: string;
  size?: number;
}

export const Share: React.FC<Share> = ({size = 20, color = colors.orange}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle
        cx={14.5833}
        cy={3.75008}
        r={2.08333}
        fill={color}
        stroke={color}
        strokeWidth={1.25}
      />
      <Circle
        cx={4.58333}
        cy={9.58333}
        r={2.08333}
        fill={color}
        stroke={color}
        strokeWidth={1.25}
      />
      <Path
        d="M12.5 5L6.667 8.334M6.25 11.25L12.5 15"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={14.5833}
        cy={16.2501}
        r={2.08333}
        fill={color}
        stroke={color}
        strokeWidth={1.25}
      />
    </Svg>
  );
};
