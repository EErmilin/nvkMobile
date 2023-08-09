import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../../Styles/Styles';

interface SwapProps {
  color?: string;
  size?: number;
}

export const Swap = ({color = colors.white, size = 24}: SwapProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.5 19.75a.75.75 0 000-1.5v1.5zM11 5v.75a.75.75 0 00.53-1.28L11 5zM9.53 2.47a.75.75 0 00-1.06 1.06l1.06-1.06zM13 19v-.75a.75.75 0 00-.53 1.28L13 19zm1.47 2.53a.75.75 0 101.06-1.06l-1.06 1.06zm.03-17.28a.75.75 0 000 1.5v-1.5zm-5 14H9v1.5h.5v-1.5zM9 5.75h2v-1.5H9v1.5zm2.53-1.28l-2-2-1.06 1.06 2 2 1.06-1.06zM1.25 12A7.75 7.75 0 009 19.75v-1.5A6.25 6.25 0 012.75 12h-1.5zm1.5 0A6.25 6.25 0 019 5.75v-1.5A7.75 7.75 0 001.25 12h1.5zM15 18.25h-2v1.5h2v-1.5zm-2.53 1.28l2 2 1.06-1.06-2-2-1.06 1.06zM14.5 5.75h.5v-1.5h-.5v1.5zM21.25 12A6.25 6.25 0 0115 18.25v1.5A7.75 7.75 0 0022.75 12h-1.5zm1.5 0A7.75 7.75 0 0015 4.25v1.5A6.25 6.25 0 0121.25 12h1.5z"
        fill={color}
      />
    </Svg>
  );
};
