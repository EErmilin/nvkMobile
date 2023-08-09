import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

export const RightCircle: React.FC<{color?: string}> = props => {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" {...props}>
      <Path
        d="M25 7.49878C26.5698 9.58814 27.5 12.1854 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C16.7778 2.5 18.4688 2.87112 20 3.54011"
        stroke="#F6A80B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M16.25 18.75L19.1161 15.8839C19.6043 15.3957 19.6043 14.6043 19.1161 14.1161L16.25 11.25"
        stroke="#F6A80B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M18.75 15L10 15"
        stroke="#F6A80B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
