import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const RedFlagValute = () => {
  return (
    <Svg width={8} height={8} viewBox="0 0 8 8" fill="none">
      <Path
        d="M8 7a1 1 0 01-1 1H1.414C.524 8 .077 6.923.707 6.293L6.293.707C6.923.077 8 .523 8 1.414V7z"
        fill="#FF1C45"
      />
    </Svg>
  );
};
