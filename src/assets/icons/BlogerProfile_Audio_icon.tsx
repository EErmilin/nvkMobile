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

const BlogerProfile_Audio_icon: FC<TProps> = ({ containerStyle, backgroundColor, active, onPress }, props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={onPress ? 1 : 2}
            style={[styles.container, containerStyle, { backgroundColor }]} >
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                {...props}>

                <Path
                    d="M5.33201 7.85301C3.95131 7.85302 2.83203 8.97231 2.83203 10.353V13.646C2.83203 15.0267 3.95132 16.146 5.33203 16.146H6.88783C7.3679 16.146 7.83196 16.3187 8.19525 16.6325L11.5246 19.5086C12.8204 20.6279 14.832 19.7074 14.832 17.9951V6.00388C14.832 4.29154 12.8204 3.37102 11.5246 4.49039L9.04394 6.6333M17.832 15C18.46 14.1643 18.832 13.1256 18.832 12C18.832 10.8744 18.46 9.83566 17.832 9M19.833 18C21.0888 16.3287 21.833 14.2512 21.833 12C21.833 9.74879 21.0888 7.67132 19.833 6"
                    stroke={active ? "#F6A80B" : "#BBBBBB"}
                    stroke-width="1.5" stroke-linecap="round" />




            </Svg>
        </TouchableOpacity>
    );
};

export default BlogerProfile_Audio_icon;

