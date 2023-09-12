import { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './style';


type TProps = {
    mt?: number | string;
};

const BlogerProfile_Bottom_icon: FC<TProps> = ({ mt }, props) => {
    return (
        <View
            style={[styles.container, { marginTop: mt }]} >
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={53}
                height={3}
                fill="none"
                {...props}>

                <Path d="M0.166016 3C0.166016 1.34315 1.50916 0 3.16602 0H49.166C50.8229 0 52.166 1.34315 52.166 3H0.166016Z" fill="#F6A80B" />

            </Svg>
        </View>
    );
};

export default BlogerProfile_Bottom_icon;

