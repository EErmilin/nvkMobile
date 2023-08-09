import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface IProps {
  color?: string;
}

function AuthLogo(props: IProps) {
  const {color = 'white'} = props;
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <Path
        d="M14.8559 21.5034C16.8859 21.0219 18.777 19.9249 20.2018 18.2441C23.6966 14.1217 23.0632 8.04856 18.7869 4.67943C14.5107 1.31029 8.21099 1.92098 4.71617 6.04343C1.22135 10.1659 1.85481 16.239 6.13105 19.6081C7.23224 20.4757 8.46762 21.0794 9.75472 21.4272"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M11.0443 9.41704L14.2474 9.41704C14.8215 9.41704 15.2868 9.86564 15.2868 10.419L15.2868 13.507"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M14.58 10.0988L9.63037 14.8704"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default AuthLogo;
