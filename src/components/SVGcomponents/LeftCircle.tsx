import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

export const LeftCircle: React.FC<{color?: string}> = ({
  color = colors.orange,
}) => {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Path
        d="M25 7.49878C26.5698 9.58814 27.5 12.1854 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C16.7778 2.5 18.4688 2.87112 20 3.54011"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M13.75 18.75L10.8839 15.8839C10.3957 15.3957 10.3957 14.6043 10.8839 14.1161L13.75 11.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M11.25 15L20 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
