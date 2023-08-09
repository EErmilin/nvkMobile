import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../../../Styles/Styles';

interface MelodyProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export const Melody = ({
  color = colors.gray,
  size = 28,
  strokeWidth = 2,
}: MelodyProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Circle
        cx={2.91667}
        cy={2.91667}
        r={2.91667}
        transform="matrix(-1 0 0 1 10.502 18.084)"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M10.502 5.833v9.48M23.334 3.5v15.167M23.335 3.5L10.502 5.833M10.502 10.5l6.417-1.167 3.208-.583"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={2.91667}
        cy={2.91667}
        r={2.91667}
        transform="matrix(-1 0 0 1 23.334 16.334)"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};
