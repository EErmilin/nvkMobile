import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

interface Star {
  color?: string;
  size?: number;
  inColor?: string;
}

export const Star: React.FC<Star> = ({
  size = 12,
  color = colors.white,
  inColor = 'none',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill={inColor}>
      <Path
        d="M5.486 1.354a.6.6 0 011.028 0L7.68 3.29a.6.6 0 00.379.276l2.201.51a.6.6 0 01.318.977L9.096 6.76a.6.6 0 00-.145.445l.196 2.251a.6.6 0 01-.832.605l-2.08-.882a.6.6 0 00-.47 0l-2.08.882a.6.6 0 01-.832-.605l.196-2.251a.6.6 0 00-.145-.445L1.423 5.053a.6.6 0 01.317-.978l2.202-.51a.6.6 0 00.379-.275l1.165-1.936z"
        fill={color}
        stroke={color}
        strokeWidth={0.75}
      />
    </Svg>
  );
};
