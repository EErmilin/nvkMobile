import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
} from 'react-native-track-player';

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext(),
  );

  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious(),
  );
  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    TrackPlayer.seekTo(event.position);
  });
}

export const TrackPlayerReset = async () => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        alwaysPauseOnInterruption: true,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 1,
    });
  } catch (e) {
    console.log(e);
  }
};
