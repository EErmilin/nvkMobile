import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {colors} from '../../../Styles/Styles';

export const MusicNote = ({color = colors.secondaryGray}: {color?: string}) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 4.5l13.001-3M8 9.01L17.5 7M8 4.5V14M21 1.5v16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={18}
        cy={17.5}
        r={3}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={5}
        cy={19.5}
        r={3}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
