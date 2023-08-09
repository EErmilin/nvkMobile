import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

export const ProfileIcon: React.FC<{color: string}> = props => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props} fill="none">
      <Path
        d="M8.5 7C8.5 9.20914 10.2909 11 12.5 11C14.7091 11 16.5 9.20914 16.5 7C16.5 4.79086 14.7091 3 12.5 3"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M5.5 16.9347C5.5 16.0743 6.04085 15.3068 6.85109 15.0175V15.0175C10.504 13.7128 14.496 13.7128 18.1489 15.0175V15.0175C18.9591 15.3068 19.5 16.0743 19.5 16.9347V18.2502C19.5 19.4376 18.4483 20.3498 17.2728 20.1818L16.3184 20.0455C13.7856 19.6837 11.2144 19.6837 8.68162 20.0455L7.72721 20.1818C6.5517 20.3498 5.5 19.4376 5.5 18.2502V16.9347Z"
        stroke={props.color}
        strokeWidth="1.5"
      />
    </Svg>
  );
};
