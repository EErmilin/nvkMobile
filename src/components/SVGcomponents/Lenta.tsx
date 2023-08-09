import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

export const Lenta: React.FC<{color: string}> = props => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props} fill="none">
      <Path
        d="M2 10C2 9.09347 2 8.03946 2 6.99988C2 4.23846 4.23858 2 7 2L17 2C19.7614 2 22 4.23858 22 7L22 17C22 19.7614 19.7614 22 17 22L7 22C4.23858 22 2 19.7614 2 17L2 14"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M14 6L14 22"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 14H19"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
