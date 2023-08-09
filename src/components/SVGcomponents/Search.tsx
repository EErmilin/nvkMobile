import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

export const Search: React.FC<{color: string}> = props => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props} fill="none">
      <Path
        d="M19.0831 13.5489C19.704 11.7018 19.6293 9.69155 18.8731 7.89557C18.1169 6.09959 16.7312 4.64137 14.9761 3.79465C13.2209 2.94793 11.2171 2.77094 9.34074 3.29691C7.46438 3.82287 5.8445 5.01562 4.78521 6.65125C3.72592 8.28688 3.30005 10.2529 3.58754 12.1803C3.87504 14.1076 4.85614 15.8638 6.34666 17.1191C7.83718 18.3744 9.73463 19.0424 11.6828 18.9979C13.631 18.9534 15.4959 18.1993 16.9275 16.8772"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 16.958L22 21.958"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
