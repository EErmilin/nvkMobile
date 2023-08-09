import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export function HailWeather() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_3304_13243)">
        <Path
          d="M8.748 23.817a1.01 1.01 0 010-2.016 1.01 1.01 0 010 2.016z"
          fill="#D1E7F8"
        />
        <Path
          d="M15.68 23.817a1.01 1.01 0 010-2.016 1.01 1.01 0 010 2.016z"
          fill="#BDDBFF"
        />
        <Path
          d="M5.282 20.288a1.01 1.01 0 010-2.017 1.01 1.01 0 010 2.017z"
          fill="#D1E7F8"
        />
        <Path
          d="M19.147 20.288a1.01 1.01 0 010-2.017 1.01 1.01 0 010 2.017zM12.215 18.271a1.01 1.01 0 000 2.017 1.01 1.01 0 000-2.017zM12 .184a7.726 7.726 0 00-7.528 5.988A5.34 5.34 0 000 11.434a5.337 5.337 0 005.331 5.331H12V.184z"
          fill="#BDDBFF"
        />
        <Path
          d="M19.528 6.172A7.724 7.724 0 0012 .184v16.581h6.669A5.337 5.337 0 0024 11.435a5.343 5.343 0 00-4.472-5.262z"
          fill="#9BC9FF"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3304_13243">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
