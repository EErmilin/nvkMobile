import * as React from 'react';
import Svg, {G, Path, Defs} from 'react-native-svg';
import {colors} from '../../../Styles/Styles';

interface PlayCircleProps {
  color?: string;
  size?: number;
  fillOpacity?: number;
}

export const PlayCircle = ({
  color = colors.white,
  size = 50,
  fillOpacity = 0.7,
}: PlayCircleProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 50 50" fill={'none'}>
      <G filter="url(#filter0_b_1313_20758)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.604 25C2.604 12.63 12.631 2.604 25 2.604c12.37 0 22.396 10.027 22.396 22.396 0 12.369-10.027 22.396-22.396 22.396C12.631 47.396 2.604 37.369 2.604 25zm16.667-4.052c0-3.078 3.431-4.914 5.993-3.207l6.076 4.052c2.289 1.525 2.289 4.888 0 6.413l-6.076 4.052c-2.562 1.707-5.992-.129-5.992-3.207v-8.103z"
          fill={color}
          fillOpacity={fillOpacity}
        />
      </G>
      <Defs />
    </Svg>
  );
};
