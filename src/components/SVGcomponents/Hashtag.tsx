import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

interface IProps {
  color?: string;
  stroke?: string;
  size?: string;
}

export function Hashtag(props: IProps) {
  const {color = colors.orange, stroke = colors.orange, size = '26'} = props;
  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      {...props}
      fill={color}>
      <Circle cx="13" cy="13" r="12.25" stroke={stroke} strokeWidth="1.5" />
      <Path
        d="M9.134 18L9.904 15.214H8.28L8.406 13.8H10.296L10.772 12.218H9.05L9.176 10.79H11.15L11.962 8.004H13.446L12.648 10.79H14.006L14.804 8.004H16.274L15.476 10.79H17.114L16.988 12.218H15.084L14.608 13.8H16.372L16.246 15.214H14.216L13.418 18H11.92L12.718 15.214H11.388L10.604 18H9.134ZM11.78 13.8H13.124L13.6 12.218H12.256L11.78 13.8Z"
        fill={stroke}
      />
    </Svg>
  );
}
