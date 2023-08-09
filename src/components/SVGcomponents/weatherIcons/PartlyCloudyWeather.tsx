import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function PartlyCloudyWeather() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.145 3.934a7.725 7.725 0 00-5.673 5.763A5.34 5.34 0 000 14.96a5.337 5.337 0 005.331 5.33H12V3.71c-.638 0-1.26.078-1.855.225z"
        fill="#BDDBFF"
      />
      <Path
        d="M23.22 12.188a5.344 5.344 0 00-3.692-2.49A7.724 7.724 0 0012 3.708v16.582h6.669A5.337 5.337 0 0024 14.959a5.299 5.299 0 00-.78-2.771z"
        fill="#9BC9FF"
      />
    </Svg>
  );
}
