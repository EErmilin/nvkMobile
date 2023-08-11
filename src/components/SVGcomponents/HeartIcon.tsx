import * as React from "react";
import Svg from "react-native-svg";

export const HeartIcon: React.FC<{ color: string }> = props => {
    return (
        <Svg width={24} height={24} viewBox="0 0 24 24" {...props} fill="none">
            <path
                d="M4.49648 14.1384L9.82983 19.7263C11.0117 20.9645 12.9883 20.9645 14.1702 19.7263L19.5035 14.1384C21.4988 12.0478 21.4988 8.65842 19.5035 6.56789C17.5082 4.47737 14.2732 4.47737 12.2779 6.5679V6.5679C12.1266 6.72646 11.8734 6.72646 11.7221 6.5679V6.5679C9.72679 4.47737 6.49177 4.47737 4.49647 6.5679C2.50117 8.65842 2.50118 12.0478 4.49648 14.1384Z"
                stroke={props.color} strokeWidth="1.5"/>
        </Svg>
    )
}
