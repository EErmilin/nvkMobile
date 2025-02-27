import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

export const Clock: React.FC<{color?: string}> = ({color = colors.orange}) => {
  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <Path
        d="M11 7V10.7324C11 10.8996 11.0836 11.0557 11.2226 11.1484L14 13M5.5 19.353C5.71946 19.4978 5.94496 19.6341 6.17604 19.7616C7.60645 20.5509 9.25077 21 11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 12.7553 1.45224 14.4049 2.24655 15.8388C2.3717 16.0647 2.50533 16.2852 2.64702 16.5"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};
