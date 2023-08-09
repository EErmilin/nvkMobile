import * as React from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';

import {themeColors} from '../../../../Styles/Styles';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {Pause, Play} from '../../../../components/SVGcomponents';

export const RadioController: React.FC<any> = () => {
  const playerState = usePlaybackState();

  return (
    <TouchableOpacity
      style={styles.main}
      disabled={
        playerState.state !== State.Playing &&
        playerState.state !== State.Paused
          ? true
          : false
      }
      onPress={() => {
        if (playerState.state === State.Playing) {
          TrackPlayer.pause();
        } else {
          TrackPlayer.play();
        }
      }}>
      {playerState.state !== State.Paused &&
      playerState.state !== State.Playing ? (
        <ActivityIndicator color={themeColors.dark.white} size={'small'} />
      ) : playerState.state === State.Playing ? (
        <Pause size={24} />
      ) : (
        <Play size={24} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: themeColors.dark.colorMain,
    alignSelf: 'center',
    marginTop: 46,
  },
});
