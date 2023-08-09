import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export function RainWeather() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_3304_13193)">
        <Path
          d="M6.339 20.598H4.322v3.265H6.34v-3.265zM5.33 16.717c-.344 0-.681-.033-1.008-.096v2.117H6.34v-2.02H5.33zM10.786 16.717H8.77v7.147h2.016v-7.147z"
          fill="#D1E7F8"
        />
        <Path
          d="M15.231 21.607h-2.016v2.257h2.016v-2.257zM15.231 16.717h-2.016v3.03h2.016v-3.03zM12 .135a7.726 7.726 0 00-7.528 5.989A5.34 5.34 0 000 11.384a5.337 5.337 0 005.331 5.331H12V.135zM18.668 16.717H17.66v7.147h2.016v-7.243a5.334 5.334 0 01-1.008.096z"
          fill="#BDDBFF"
        />
        <Path
          d="M19.528 6.123A7.724 7.724 0 0012 .135v16.582h6.669A5.337 5.337 0 0024 11.384a5.343 5.343 0 00-4.472-5.262z"
          fill="#9BC9FF"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3304_13193">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
