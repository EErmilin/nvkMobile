import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const NativitySubstract = ({color = 'white'}: {color?: string}) => {
  return (
    <Svg width="140" height="55" viewBox="0 0 140 55" fill="none">
      <Path
        d="M17.0198 40.1798C23.4895 17.0028 44.7592 0 70 0C95.2408 0 116.51 17.0028 122.98 40.1798C125.208 48.159 131.716 55 140 55H0C8.28427 55 14.7925 48.159 17.0198 40.1798Z"
        fill={color}
      />
    </Svg>
  );
};
