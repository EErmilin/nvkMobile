import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from '../../Styles/Styles';

interface IProps {
  color?: string;
}

export const Show = (props: IProps) => {
  const {colors} = useTheme();
  const {color = colors.colorMain} = props;
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.66714 10.6537C2.44428 10.2462 2.44429 9.75371 2.66715 9.3462C4.08334 6.75669 6.83613 5 9.99997 5C13.1639 5 15.9167 6.75674 17.3329 9.34632C17.5557 9.75383 17.5557 10.2463 17.3328 10.6538C15.9167 13.2433 13.1639 15 10 15C6.83614 15 4.08331 13.2433 2.66714 10.6537Z"
        stroke={color}
        stroke-width="1.5"
      />
      <Path
        d="M7.5 10C7.5 11.3807 8.61929 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};
