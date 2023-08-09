import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

export const Message: React.FC<{color?: string}> = props => {
  const {color = colors.white} = props;
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.6622 7C21.513 8.47087 22 10.1786 22 12C22 17.5228 17.5228 22 12 22C10.2435 22 8.59274 21.5471 7.15817 20.7518C6.89316 20.6048 6.57856 20.5681 6.29285 20.6691L3.77026 21.5605C2.81913 21.8966 1.90292 20.9804 2.23902 20.0292L3.1673 17.4022C3.26437 17.1275 3.23426 16.8254 3.10104 16.5662C2.39724 15.1974 2 13.6451 2 12C2 6.47715 6.47715 2 12 2C14.2516 2 16.3295 2.74418 18.001 4"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Circle cx="7.05005" cy="12.0498" r="1.25" fill={color} />
      <Circle cx="12.05" cy="12.0498" r="1.25" fill={color} />
      <Circle cx="17.05" cy="12.0498" r="1.25" fill={color} />
    </Svg>
  );
};
