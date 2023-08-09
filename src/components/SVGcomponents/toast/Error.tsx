import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const Error = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 10L2 6.99988C2 4.23846 4.23858 2 7 2L17 2C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17L2 14M14.1211 9.87891L11.9998 12.0002M11.9998 12.0002L9.87848 14.1215M11.9998 12.0002L14.1211 14.1216M11.9998 12.0002L9.87848 9.87894"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
