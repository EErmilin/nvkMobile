import { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { LinearGradient, Defs, Path, Stop } from 'react-native-svg';

import { styles } from './style';

type TProps = {
    containerStyle?: ViewStyle;
    backgroundColor?: string;
};

const Telegram_Icon: FC<TProps> = ({ containerStyle, backgroundColor }, props) => {
    return (
        <View style={[styles.container, containerStyle, { backgroundColor }]}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                fill="none"
                {...props}>
                <Path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#2AABEE" />
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M7.24529 15.8312C11.9096 13.799 15.0199 12.4593 16.5761 11.812C21.0195 9.96384 21.9428 9.64279 22.5446 9.63219C22.6769 9.62986 22.9729 9.66266 23.1646 9.81821C23.3265 9.94956 23.371 10.127 23.3923 10.2515C23.4136 10.376 23.4402 10.6597 23.4191 10.8814C23.1783 13.4114 22.1364 19.5509 21.6063 22.3846C21.382 23.5836 20.9404 23.9856 20.5129 24.0249C19.5837 24.1104 18.8782 23.4109 17.9782 22.821C16.57 21.8979 15.7745 21.3233 14.4076 20.4225C12.8279 19.3815 13.8519 18.8093 14.7522 17.8743C14.9878 17.6296 19.0817 13.9059 19.1609 13.5681C19.1708 13.5258 19.18 13.3684 19.0865 13.2852C18.9929 13.2021 18.8548 13.2305 18.7552 13.2531C18.6139 13.2852 16.3643 14.7721 12.0063 17.7139C11.3677 18.1524 10.7894 18.366 10.2712 18.3548C9.69987 18.3425 8.60095 18.0318 7.78402 17.7662C6.78202 17.4405 5.98564 17.2683 6.05499 16.7152C6.09111 16.427 6.48788 16.1324 7.24529 15.8312Z" fill="white" />
                <Defs>
                    <LinearGradient id="paint0_linear_178_9758" x1="16" y1="0" x2="16" y2="31.7627" gradientUnits="userSpaceOnUse">
                        <Stop stop-color="#2AABEE" />
                        <Stop offset="1" stop-color="#229ED9" />
                    </LinearGradient>
                </Defs>


            </Svg>
        </View>
    );
};

export default Telegram_Icon;

