import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ArrowsIcon: React.FC<{color: string}> = props => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 7.73694L16.7071 5.31002C16.3166 4.89666 15.6834 4.89666 15.2929 5.31001L13 7.73694M16 5.62003L16 18.3215M10 17.2631L7.70711 19.69C7.31658 20.1033 6.68342 20.1033 6.29289 19.69L4 17.2631M7 19.38L7 6.67849"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
