import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default function ImageIcon() {
  return (
    <View>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M15 10.1667H15.01M3 8.5C3 7.83696 3.31607 7.20107 3.87868 6.73223C4.44129 6.26339 5.20435 6 6 6H18C18.7956 6 19.5587 6.26339 20.1213 6.73223C20.6839 7.20107 21 7.83696 21 8.5V18.5C21 19.163 20.6839 19.7989 20.1213 20.2678C19.5587 20.7366 18.7956 21 18 21H6C5.20435 21 4.44129 20.7366 3.87868 20.2678C3.31607 19.7989 3 19.163 3 18.5V8.5Z"
          stroke="black"
          stroke-opacity="0.9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M3 16.8333L8 12.6666C8.928 11.9225 10.072 11.9225 11 12.6666L16 16.8333"
          stroke="black"
          stroke-opacity="0.9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14 15.1666L15 14.3333C15.928 13.5891 17.072 13.5891 18 14.3333L21 16.8333"
          stroke="black"
          stroke-opacity="0.9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
}
