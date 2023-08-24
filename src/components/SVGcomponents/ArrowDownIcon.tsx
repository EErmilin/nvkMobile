import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ArrowDownIcon: React.FC<{color: string}> = props => {
  return (
    <Svg width={24} height={24} viewBox="0 -2 24 24" {...props} fill="none">
      <Path
        d="M7 10L12 15L17 10"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
