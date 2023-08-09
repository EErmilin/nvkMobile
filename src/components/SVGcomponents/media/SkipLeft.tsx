import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {colors} from '../../../Styles/Styles';

interface SkipLeftProps {
  color?: string;
  size?: number;
}

export const SkipLeft = ({color = colors.white, size = 32}: SkipLeftProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Rect
        width={3}
        height={18}
        rx={1.5}
        transform="matrix(-1 0 0 1 11 7)"
        fill={color}
      />
      <Path
        d="M12.234 13.582c-1.645 1.166-1.645 3.67 0 4.836l8.794 6.234c1.259.893 2.972-.037 2.972-1.612V8.96c0-1.576-1.713-2.505-2.972-1.612l-8.794 6.234z"
        fill={color}
      />
    </Svg>
  );
};
