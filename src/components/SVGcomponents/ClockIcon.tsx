import * as React from "react";
import Svg, {Path} from "react-native-svg";

export const ClockIcon: React.FC<{color: string}> = props => {
    return (
        <Svg width={24} height={24} viewBox="0 0 24 24" {...props} fill="none">
            <Path
                d="M12 8V12L14.5 14.5M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke={props.color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}
