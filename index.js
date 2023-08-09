/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import messaging from '@react-native-firebase/messaging';
import {PlaybackService} from './src/services/service';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);

TrackPlayer.registerPlaybackService(() => PlaybackService);
