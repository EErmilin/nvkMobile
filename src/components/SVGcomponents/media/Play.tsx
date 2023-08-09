import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../../Styles/Styles';

interface PlayProps {
  color?: string;
  size?: number;
}

export const Play = ({color = colors.white, size = 40}: PlayProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Path
        d="M23.243 9.138c7.523 4.48 11.284 6.719 11.701 9.99.075.579.075 1.166 0 1.745-.417 3.27-4.178 5.51-11.7 9.989-7.523 4.479-11.284 6.718-14.24 5.456a6.44 6.44 0 01-1.466-.873C5 33.437 5 28.958 5 20 5 11.043 5 6.564 7.538 4.556a6.44 6.44 0 011.466-.873c2.956-1.263 6.717.977 14.24 5.455z"
        fill={color}
      />
    </Svg>
  );
};
