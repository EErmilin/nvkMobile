import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export function ClearWeather() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_3304_13156)">
        <Path
          d="M24 12.97v-1.94h-3.603a8.412 8.412 0 00-1.776-4.279l2.55-2.55-1.37-1.372-2.551 2.55a8.413 8.413 0 00-4.28-1.775V0h-1.939v3.604c.319-.037.642-.056.97-.056v16.904a8.51 8.51 0 01-.97-.056V24h1.94v-3.604a8.413 8.413 0 004.279-1.776l2.55 2.551 1.372-1.371-2.55-2.551a8.412 8.412 0 001.775-4.28h3.604z"
          fill="#FFCD00"
        />
        <Path
          d="M12 3.547a8.413 8.413 0 00-5.249 1.832l-2.55-2.55-1.372 1.37 2.55 2.551a8.412 8.412 0 00-1.775 4.28H0v1.939h3.604a8.412 8.412 0 001.776 4.279l-2.551 2.55L4.2 21.17l2.551-2.55A8.412 8.412 0 0012 20.45V3.547z"
          fill="#FFDA44"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3304_13156">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
