import * as React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {useTheme} from '../../../Styles/Styles';
import {useProgress} from 'react-native-track-player';

export const TrackSlider = () => {
  const screenWidth = useWindowDimensions().width;
  const {colors, theme} = useTheme();
  const progress = useProgress();

  const getCurrentPosition = () => {
    if (progress.duration !== 0 && progress.position !== 0) {
      return screenWidth * (progress.position / progress.duration);
    } else {
      return 0;
    }
  };

  const getCurrentBuffer = () => {
    if (progress.buffered !== 0 && progress.duration !== 0) {
      return screenWidth * (progress.buffered / progress.duration);
    } else {
      return 0;
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        width: screenWidth,
        height: 3,
        backgroundColor: colors.borderPrimary,
      }}>
      <View
        style={{
          flex: 1,
          width: getCurrentBuffer(),
          backgroundColor: theme === 'dark' ? colors.buffer : '#F8F8F8',
          position: 'absolute',
          height: 3,
          opacity: theme === 'dark' ? 0.6 : 1,
        }}
      />
      <View
        style={{
          flex: 1,
          height: 3,
          position: 'absolute',
          width: getCurrentPosition(),
          backgroundColor: colors.colorMain,
        }}
      />
    </View>
  );
};
