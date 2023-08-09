import * as React from 'react';
import {Track} from 'react-native-track-player';
import {IMusic, ISongType, IMusicAlbumID} from '../models/Music';

export interface IMusicPlayerContext {
  music?: IMusic | null;
  album?: Track[];
  albumID: IMusicAlbumID;
  type?: ISongType;
}

const MusicPlayerContext = React.createContext<{
  musicPlayerOption: IMusicPlayerContext;
  setMusicPlayerOption: (notification: IMusicPlayerContext) => void;
}>({
  musicPlayerOption: {music: null, album: undefined, albumID: 'alltrack'},
  setMusicPlayerOption: () => null,
});

const MusicPlayerProvider = ({children}: {children: React.ReactNode}) => {
  const [musicPlayerOption, setMusicPlayerOption] =
    React.useState<IMusicPlayerContext>({
      music: null,
      album: undefined,
      albumID: 0,
      type: undefined,
    });

  return (
    <MusicPlayerContext.Provider
      value={{
        musicPlayerOption,
        setMusicPlayerOption,
      }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export {MusicPlayerProvider, MusicPlayerContext};
