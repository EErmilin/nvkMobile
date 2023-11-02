import { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, {  Rect, Path, G, Defs, ClipPath } from 'react-native-svg';

import { styles } from './style';

type TProps = {
    containerStyle?: ViewStyle;
    backgroundColor?: string;
};

const YouTube_Icon: FC<TProps> = ({ containerStyle, backgroundColor }, props) => {
    return (
        <View style={[styles.container, containerStyle, { backgroundColor }]}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                fill="none"
                {...props}>
                <G clip-path="url(#clip0_178_8998)">
                    <Path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#FF0000" />
                    <Path d="M24.7992 11.6196C24.5867 10.8283 23.9607 10.2024 23.1695 9.98983C21.7404 9.6001 15.989 9.6001 15.989 9.6001C15.989 9.6001 10.2375 9.61191 8.80848 10.0016C8.01721 10.2142 7.39128 10.8401 7.1787 11.6314C6.80078 13.0604 6.80078 16.0484 6.80078 16.0484C6.80078 16.0484 6.80078 19.0363 7.19051 20.4771C7.40309 21.2684 8.02902 21.8943 8.82029 22.1069C10.2493 22.4966 16.0008 22.4966 16.0008 22.4966C16.0008 22.4966 21.7523 22.4966 23.1813 22.1069C23.9725 21.8943 24.5985 21.2684 24.8111 20.4771C25.2008 19.0481 25.2008 16.0484 25.2008 16.0484C25.2008 16.0484 25.189 13.0604 24.7992 11.6196Z" fill="white" />
                    <Path d="M14.1582 18.812L18.9294 16.0485L14.1582 13.2849V18.812Z" fill="#FF0000" />
                </G>
                <Defs>
                    <ClipPath id="clip0_178_8998">
                        <Rect width="32" height="32" fill="white" />
                    </ClipPath>
                </Defs>
            </Svg>
        </View>
    );
};

export default YouTube_Icon;

