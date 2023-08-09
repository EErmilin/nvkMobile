import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../../Styles/Styles';

export const Fullscreen = ({color = colors.white}: {color?: string}) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 9.2V8a4 4 0 00-4-4h-1.2M20 14.8V16a4 4 0 01-4 4h-1.2m-5.6 0H8a4 4 0 01-4-4v-1.2m0-5.6V8a4 4 0 014-4h1.2"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};
