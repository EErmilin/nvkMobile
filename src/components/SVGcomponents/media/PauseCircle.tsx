import * as React from 'react';
import Svg, {G, Path, Defs} from 'react-native-svg';
import {colors} from '../../../Styles/Styles';

interface PauseCircleProps {
  color?: string;
  size?: number;
  fillOpacity?: number;
}

export const PauseCircle = ({
  color = colors.white,
  size = 50,
  fillOpacity = 0.7,
}: PauseCircleProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
      <G filter="url(#filter0_b_2075_30658)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25 3C12.85 3 3 12.85 3 25s9.85 22 22 22 22-9.85 22-22S37.15 3 25 3zm-7.859 17.088a2.947 2.947 0 015.894 0v9.824a2.947 2.947 0 11-5.894 0v-9.823zm12.77-2.946a2.947 2.947 0 00-2.947 2.947v9.823a2.947 2.947 0 105.894 0v-9.823a2.947 2.947 0 00-2.947-2.947z"
          fill={color}
          fillOpacity={fillOpacity}
        />
      </G>
      <Defs />
    </Svg>
  );
};
