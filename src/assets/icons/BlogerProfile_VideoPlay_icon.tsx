import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './style';


type TProps = {
    active?: boolean;
    containerStyle?: ViewStyle;
    backgroundColor?: string;
    onPress?: () => void;
};

const BlogerProfile_VideoPlay_icon: FC = (_, props) => {
    return (
        <View
            style={styles.container} >
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                fill="none"
                {...props}>
                <Path d="M7.87935 3.62784C9.20844 4.41916 10.161 4.98754 10.8052 5.49701C11.4469 6.00444 11.6865 6.38083 11.7346 6.75757C11.7551 6.91838 11.7551 7.0813 11.7346 7.2421C11.6865 7.61884 11.4469 7.99523 10.8052 8.50266C10.161 9.01213 9.20844 9.58052 7.87935 10.3718C6.55004 11.1633 5.59671 11.7296 4.84731 12.05C4.09853 12.3701 3.67338 12.3902 3.34788 12.2512C3.20566 12.1904 3.07135 12.1105 2.94848 12.0133C2.66185 11.7865 2.46323 11.3854 2.35702 10.5516C2.25098 9.71905 2.25 8.58162 2.25 6.99984C2.25 5.41806 2.25098 4.28062 2.35702 3.44812C2.46323 2.61424 2.66185 2.21317 2.94848 1.98636C3.07135 1.88914 3.20566 1.80924 3.34788 1.74849C3.67338 1.60945 4.09853 1.62957 4.84731 1.94967C5.59672 2.27005 6.55004 2.83638 7.87935 3.62784Z" stroke="white" />

            </Svg>
        </View>
    );
};

export default BlogerProfile_VideoPlay_icon;

