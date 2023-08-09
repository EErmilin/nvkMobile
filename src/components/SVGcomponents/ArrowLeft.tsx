import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ArrowLeft: React.FC<{color: string}> = props => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props} fill="none">
      <Path
        d="M15 6L9 11.5L15 17"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
