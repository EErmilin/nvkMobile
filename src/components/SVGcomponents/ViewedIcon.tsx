import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ViewedIcon: React.FC<{color: string}> = props => {
    return (
        <Svg width={24} height={24} viewBox="0 0 24 24" {...props} fill="none">
                <Path
                    d="M4.5 10.5306V6.40287C4.5 3.97123 6.5467 2 9.07143 2H15.9286C18.4533 2 20.5 3.97123 20.5 6.40287V20.8975C20.5 21.7683 19.4997 22.2943 18.7391 21.8234L13.736 18.7257C12.9831 18.2595 12.0169 18.2595 11.264 18.7257L6.26087 21.8234C5.50028 22.2943 4.5 21.7683 4.5 20.8975V15.4838M9.07251 8.054H15.9297"
                    stroke={props.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
        </Svg>
    );
};
