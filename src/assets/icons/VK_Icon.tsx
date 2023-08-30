import { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { styles } from './style';

type TProps = {
    containerStyle?: ViewStyle;
    backgroundColor?: string;
};

const VK_Icon: FC<TProps> = ({ containerStyle, backgroundColor }, props) => {
    return (
        <View style={[styles.container, containerStyle, { backgroundColor }]}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                fill="none"
                {...props}>
                <Circle cx="16" cy="16" r="16" fill="#0077FF" />
                <Path d="M16.8931 21.7794C10.9476 21.7794 7.34086 17.6546 7.19922 10.8H10.2106C10.3045 15.8356 12.5946 17.9692 14.351 18.4081V10.8H17.2365V15.1455C18.9304 14.9577 20.7033 12.9814 21.2995 10.8H24.1404C23.6851 13.4821 21.7549 15.4584 20.3912 16.2736C21.7565 16.9332 23.9519 18.6584 24.7992 21.7794H21.6774C21.0187 19.6935 19.403 18.0779 17.2381 17.858V21.7794H16.8931Z" fill="white" />

            </Svg>
        </View>
    );
};

export default VK_Icon;


