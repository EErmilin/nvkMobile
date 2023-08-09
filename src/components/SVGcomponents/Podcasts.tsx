import * as React from 'react';
import Svg, {Path, Rect, G, Defs, LinearGradient, Stop} from 'react-native-svg';

export const Podcasts: React.FC<{}> = () => {
  return (
    <Svg width="170" height="170" viewBox="0 0 170 170" fill="none">
      <G clip-path="url(#clip0_2839_5819)">
        <Rect width="170" height="170" rx="15.9375" fill="#FF4A8B" />
        <Path
          d="M69.9445 86.0863L80.8546 97.5844C82.9495 99.7922 86.4672 99.7922 88.5621 97.5844L99.4722 86.0863C103.398 81.9488 103.398 75.2406 99.4722 71.1031C95.5463 66.9656 89.1811 66.9656 85.2551 71.1031C84.9579 71.4164 84.4588 71.4164 84.1615 71.1031C80.2356 66.9656 73.8704 66.9656 69.9445 71.1031C66.0185 75.2406 66.0185 81.9488 69.9445 86.0863Z"
          fill="white"
        />
        <Rect
          opacity="0.4"
          x="164.887"
          y="-12.8671"
          width="91.6838"
          height="222.828"
          transform="rotate(27.8994 164.887 -12.8671)"
          fill="#EC2B71"
        />
        <Rect
          opacity="0.4"
          x="200.381"
          y="38.25"
          width="78.9922"
          height="225.593"
          transform="rotate(46.7282 200.381 38.25)"
          fill="url(#paint0_linear_2839_5819)"
        />
        <Rect
          opacity="0.3"
          x="-1.73438"
          y="177.205"
          width="78.9922"
          height="222.828"
          transform="rotate(-152.101 -1.73438 177.205)"
          fill="#EC2B71"
        />
        <Rect
          opacity="0.4"
          x="-37.2285"
          y="126.088"
          width="78.9922"
          height="225.593"
          transform="rotate(-133.272 -37.2285 126.088)"
          fill="url(#paint1_linear_2839_5819)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_2839_5819"
          x1="239.877"
          y1="38.25"
          x2="239.877"
          y2="263.843"
          gradientUnits="userSpaceOnUse">
          <Stop stop-color="#FF4A8B" stop-opacity="0.68" />
          <Stop offset="1" stop-color="#A31649" stop-opacity="0.88" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_2839_5819"
          x1="2.2676"
          y1="126.088"
          x2="2.2676"
          y2="351.681"
          gradientUnits="userSpaceOnUse">
          <Stop stop-color="#DA5C89" stop-opacity="0.68" />
          <Stop offset="1" stop-color="#DC2466" stop-opacity="0.78" />
        </LinearGradient>
        <clipPath id="clip0_2839_5819">
          <Rect width="170" height="170" rx="20" fill="white" />
        </clipPath>
      </Defs>
    </Svg>
  );
};
