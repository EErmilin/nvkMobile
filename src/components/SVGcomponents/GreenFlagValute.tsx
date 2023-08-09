import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const GreenFlagValue = () => {
  return (
    <Svg width={8} height={8} viewBox="0 0 8 8" fill="none">
      <Path
        d="M7 0a1 1 0 011 1v5.586c0 .89-1.077 1.337-1.707.707L.707 1.707C.077 1.077.523 0 1.414 0H7z"
        fill="#55B88B"
      />
    </Svg>
  );
};
