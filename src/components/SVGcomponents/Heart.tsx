import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

interface HeartProps {
  color?: string;
  size?: number;
  inColor?: string;
}

export const Heart: React.FC<HeartProps> = ({
  color = colors.white,
  size = 18,
  inColor = 'none',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill={inColor}>
      <Path
        d="M2.747 9.91l4.62 4.87a2.25 2.25 0 003.265 0l4.62-4.87c1.664-1.752 1.664-4.593 0-6.346-1.662-1.752-4.358-1.752-6.02 0v0a.32.32 0 01-.464 0v0c-1.662-1.752-4.358-1.752-6.02 0-1.664 1.753-1.664 4.594 0 6.346z"
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
  );
};
