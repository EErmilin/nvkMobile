import { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './style';

type TProps = {
    containerStyle?: ViewStyle;
    backgroundColor?: string;
};

const OpenWeb_Icon: FC<TProps> = ({ containerStyle, backgroundColor }, props) => {
    return (
        <View style={[styles.container, containerStyle, { backgroundColor }]}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                {...props}>

                <Path d="M3.45898 9.64414C3.94055 7.61407 5.03754 5.72303 6.71826 4.2982C10.8407 0.80338 16.9138 1.43684 20.283 5.71308C23.6521 9.98932 23.0414 16.289 18.919 19.7838C14.7965 23.2787 8.72339 22.6452 5.35426 18.3689C4.48666 17.2678 3.88297 16.0324 3.53521 14.7453" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                <Path d="M15.5449 13.4557L15.5449 10.2526C15.5449 9.67855 15.0963 9.21322 14.5429 9.21322L11.4549 9.21322" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                <Path d="M14.8634 9.92003L10.0918 14.8696" stroke="white" stroke-width="1.5" stroke-linecap="round" />

            </Svg>
        </View>
    );
};

export default OpenWeb_Icon;


