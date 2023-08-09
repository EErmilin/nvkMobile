import * as React from 'react';
import {Path, Svg} from 'react-native-svg';
import {useTheme} from '../../Styles/Styles';

type IProps = {
  color: string;
};

export const Home = (props: IProps) => {
  const {colors} = useTheme();
  const {color = colors.textSecondary} = props;

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.03125 3.84375L9.625 3.375V3.375C11.0175 2.27565 12.9825 2.27565 14.375 3.375L19.9786 7.79888C20.9394 8.55744 21.5 9.71422 21.5 10.9384V17.5C21.5 19.7091 19.7091 21.5 17.5 21.5H16C15.4477 21.5 15 21.0523 15 20.5V18.5M5.46875 6.65625L4.875 7.125L4.02142 7.79888C3.06058 8.55744 2.5 9.71422 2.5 10.9384L2.5 17.5C2.5 19.7091 4.29086 21.5 6.5 21.5H8C8.55228 21.5 9 21.0523 9 20.5V17.5C9 16.3954 9.89543 15.5 11 15.5H12"
        stroke={color}
        strokeWidth={'1.5'}
        strokeLinecap="round"
      />
    </Svg>
  );
};
