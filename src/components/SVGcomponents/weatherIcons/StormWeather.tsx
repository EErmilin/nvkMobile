import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export function StormWeather() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_3304_13160)">
        <Path
          d="M12 .135a7.726 7.726 0 00-7.528 5.989A5.34 5.34 0 000 11.384a5.337 5.337 0 005.331 5.331H12V.135z"
          fill="#ACABB1"
        />
        <Path
          d="M19.528 6.123A7.724 7.724 0 0012 .135v16.582h6.669A5.337 5.337 0 0024 11.384a5.343 5.343 0 00-4.472-5.262z"
          fill="#898890"
        />
        <Path
          d="M7.837 23.864H5.82v-5.282h2v-1.865h2.016v3.881h-2v3.266z"
          fill="#FFDA44"
        />
        <Path
          d="M13.762 23.864h-2.016v-5.282h2v-1.865h2.016v3.881h-2v3.266z"
          fill="#FFCD00"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3304_13160">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
