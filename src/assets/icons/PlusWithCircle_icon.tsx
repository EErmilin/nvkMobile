import { FC } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './style';


type TProps = {
    iconColor?: string;
    containerStyle?: ViewStyle;
    backgroundColor?: string;
    onPress?: () => void;
};

const PlusWithCircle_icon: FC<TProps> = ({ containerStyle, backgroundColor, iconColor = "#fff", onPress }, props) => {
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
                    d="M9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75V11.25ZM15 12.75C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25V12.75ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9H12.75ZM11.25 15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15H11.25ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM12 2.75C17.1086 2.75 21.25 6.89137 21.25 12H22.75C22.75 6.06294 17.9371 1.25 12 1.25V2.75ZM9 12.75H12V11.25H9V12.75ZM12 12.75H15V11.25H12V12.75ZM11.25 9V12H12.75V9H11.25ZM11.25 12V15H12.75V12H11.25Z"
                    fill={iconColor}
                />

            </Svg>
        </TouchableOpacity>
    );
};

export default PlusWithCircle_icon;

