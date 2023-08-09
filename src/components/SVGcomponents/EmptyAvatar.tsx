import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

interface IProps {
  size?: number;
  fillColor?: string;
  bodyColor?: string;
}

export const EmptyAvatar = (props: IProps) => {
  const {size = 80, fillColor = '#F2F2F2', bodyColor = '#D0D0D0'} = props;
  return (
    <Svg
      width={size.toString()}
      height={size.toString()}
      viewBox={'0 0 80 80'}
      fill="none">
      <Rect width={'80'} height={'80'} rx={'80'} fill={fillColor} />
      <Path
        d="M47.6663 30.4167C47.6663 34.6508 44.2339 38.0833 39.9997 38.0833C35.7655 38.0833 32.333 34.6508 32.333 30.4167C32.333 26.1825 35.7655 22.75 39.9997 22.75C44.2339 22.75 47.6663 26.1825 47.6663 30.4167Z"
        fill={bodyColor}
      />
      <Path
        d="M53.4163 51.5C53.4163 55.7342 47.4095 59.1667 39.9997 59.1667C32.5899 59.1667 26.583 55.7342 26.583 51.5C26.583 47.2658 32.5899 43.8333 39.9997 43.8333C47.4095 43.8333 53.4163 47.2658 53.4163 51.5Z"
        fill={bodyColor}
      />
    </Svg>
  );
};
