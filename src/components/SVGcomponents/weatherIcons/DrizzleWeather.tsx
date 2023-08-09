import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function DrizzleWeather() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.53 5.78a3.05 3.05 0 00-3.048-3.048h-.97v1.94h.97A1.11 1.11 0 0114.59 5.78a1.11 1.11 0 01-1.108 1.108H0v1.94h13.482A3.05 3.05 0 0016.53 5.78zM17.217 15.174H0v1.94h17.217a1.11 1.11 0 010 2.215h-.97v1.94h.97a3.05 3.05 0 003.048-3.048 3.05 3.05 0 00-3.048-3.047z"
        fill="#BDDBFF"
      />
      <Path
        d="M24 11.031H8.537v1.94H24v-1.94zM6.208 11.031H0v1.94h6.208v-1.94z"
        fill="#9BC9FF"
      />
    </Svg>
  );
}
