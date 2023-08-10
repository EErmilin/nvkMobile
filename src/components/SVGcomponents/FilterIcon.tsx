import * as React from 'react';
import Svg from 'react-native-svg';

export const FilterIcon: React.FC<{color: string}> = props => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" {...props} fill="none">
            <path d="M11 7L21 7M7 7C7 8.10457 6.10457 9 5 9C3.89543 9 3 8.10457 3 7C3 5.89543 3.89543 5 5 5M13 17L3 17M17 17C17 18.1046 17.8954 19 19 19C20.1046 19 21 18.1046 21 17C21 15.8954 20.1046 15 19 15" stroke={props.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    );
};
