import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../../Styles/Styles';

interface PauseProps {
  color?: string;
  size?: number;
}

export const Pause = ({color = colors.white, size}: PauseProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Path
        d="M5 7.84C5 5.72 6.79 4 9 4h3.666c2.21 0 4 1.72 4 3.84v24.32c0 2.12-1.79 3.84-4 3.84H9c-2.21 0-4-1.72-4-3.84V7.84zM23.334 7.84c0-2.12 1.79-3.84 4-3.84H31c2.21 0 4 1.72 4 3.84v24.32c0 2.12-1.79 3.84-4 3.84h-3.666c-2.21 0-4-1.72-4-3.84V7.84z"
        fill={color}
      />
    </Svg>
  );
};
