import * as React from 'react';
import Svg, {SvgProps, Circle, Path, Rect} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

export const NewsIcon: React.FC<{color: string}> = props => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props} fill="none">
      <Path
        d="M4 10V6C4 3.79086 5.79086 2 8 2H16C18.2091 2 20 3.79086 20 6V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V15"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M8 7H12"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M8 12H12"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M16 7H15"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M16 12H15"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M8 17H12"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
