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

const BlogerProfile_AudioPlay_icon: FC = (_, props) => {
    return (
        <View
            style={styles.container} >
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                fill="none"
                {...props}>
                <Path d="M2.62434 4.79495C1.81893 4.79496 1.16602 5.44787 1.16602 6.25329V8.17419C1.16602 8.9796 1.81893 9.63252 2.62435 9.63252H3.5319C3.81194 9.63252 4.08264 9.73326 4.29456 9.91632L6.23668 11.594C6.99256 12.247 8.16601 11.71 8.16601 10.7112V3.71629C8.16601 2.71743 6.99256 2.18046 6.23668 2.83342L4.78963 4.08346" stroke="white" stroke-linecap="round" />
                <Path d="M9.91602 8.96387C10.2823 8.4764 10.4993 7.87047 10.4993 7.21387C10.4993 6.55726 10.2823 5.95134 9.91602 5.46387" stroke="white" stroke-linecap="round" />
                <Path d="M11.082 10.7139C11.8146 9.73893 12.2487 8.52707 12.2487 7.21387C12.2487 5.90066 11.8146 4.6888 11.082 3.71387" stroke="white" stroke-linecap="round" />

            </Svg>
        </View>
    );
};

export default BlogerProfile_AudioPlay_icon;

