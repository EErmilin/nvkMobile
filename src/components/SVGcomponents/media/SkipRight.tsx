import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {colors} from '../../../Styles/Styles';

interface SkipRightProps {
  color?: string;
  size?: number;
}

export const SkipRight = ({
  color = colors.white,
  size = 32,
}: SkipRightProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Rect x={21} y={7} width={3} height={18} rx={1.5} fill={color} />
      <Path
        d="M19.766 13.582c1.645 1.166 1.645 3.67 0 4.836l-8.794 6.234C9.713 25.545 8 24.615 8 23.04V8.96c0-1.576 1.713-2.505 2.972-1.612l8.794 6.234z"
        fill={color}
      />
    </Svg>
  );
};
