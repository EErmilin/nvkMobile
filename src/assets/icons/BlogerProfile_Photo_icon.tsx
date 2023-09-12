import { FC } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './style';


type TProps = {
    active?: boolean;
    containerStyle?: ViewStyle;
    backgroundColor?: string;
    onPress?: () => void;
};

const BlogerProfile_Photo_icon: FC<TProps> = ({ containerStyle, backgroundColor, active, onPress }, props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={onPress ? 1 : 2}
            style={[styles.container, containerStyle, { backgroundColor }]} >
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={19}
                height={19}
                fill="none"
                {...props}>

                <Path
                    d="M14.666 1H13.666C12.2853 1 11.166 2.11929 11.166 3.5V8.5C11.166 9.88071 12.2853 11 13.666 11H15.666C17.0467 11 18.166 9.88089 18.166 8.50017V4M3.16602 5H6.16602C7.27059 5 8.16602 4.10457 8.16602 3C8.16602 1.89543 7.27059 1 6.16602 1H3.16602C2.06145 1 1.16602 1.89543 1.16602 3C1.16602 4.10457 2.06145 5 3.16602 5ZM3.66602 18H5.66602C7.04673 18 8.16602 16.8807 8.16602 15.5V10.5C8.16602 9.11929 7.04673 8 5.66602 8H3.66602C2.2853 8 1.16602 9.11929 1.16602 10.5V15.5C1.16602 16.8807 2.2853 18 3.66602 18ZM13.166 18H16.166C17.2706 18 18.166 17.1046 18.166 16C18.166 14.8954 17.2706 14 16.166 14H13.166C12.0614 14 11.166 14.8954 11.166 16C11.166 17.1046 12.0614 18 13.166 18Z"
                    stroke={active ? "#F6A80B" : "#BBBBBB"}
                    stroke-width="1.5" stroke-linecap="round"
                />


            </Svg>
        </TouchableOpacity>
    );
};

export default BlogerProfile_Photo_icon;

