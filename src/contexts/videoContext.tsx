import * as React from 'react';
import {IHlsBroadcast} from '../models/Broadcast';

export interface IVideoPlayerContext {
  fullscreen: boolean;
  pressPlay?: boolean;
  video?: {
    url: string;
    hls: IHlsBroadcast[] | [];
  };
}

const VideoPlayerContext = React.createContext<{
  videoPlayerOption: IVideoPlayerContext;
  setVideoPlayerOption: (notification: IVideoPlayerContext) => void;
}>({
  videoPlayerOption: {fullscreen: false},
  setVideoPlayerOption: () => null,
});

const VideoPlayerProvider = ({children}: {children: React.ReactNode}) => {
  const [videoPlayerOption, setVideoPlayerOption] =
    React.useState<IVideoPlayerContext>({fullscreen: false});

  return (
    <VideoPlayerContext.Provider
      value={{
        videoPlayerOption,
        setVideoPlayerOption,
      }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export {VideoPlayerProvider, VideoPlayerContext};
