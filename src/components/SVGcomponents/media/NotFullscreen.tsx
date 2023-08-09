import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../../Styles/Styles';

export const NotFullscreen = ({color = colors.white}: {color?: string}) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.327 20v-1.794a3.879 3.879 0 013.879-3.878H20M14.182 4v1.794a3.879 3.879 0 003.879 3.878h1.794M9.673 19.854V18.06a3.879 3.879 0 00-3.879-3.878H4M9.673 4v1.793a3.879 3.879 0 01-3.879 3.879H4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};
