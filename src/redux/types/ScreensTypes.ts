import { IBroadcast } from '../../models/Broadcast';
import {
  IAlbum,
  IArtist,
  IPlaylist,
  ISong,
  IPodcastData,
} from '../../models/Music';

export interface IScreenState {
  broadcasts: IBroadcast[];
  movies: any;
  movie: any;
  musics: {
    albums: IAlbum[] | null;
    playlists: IPlaylist[] | null;
    artists: IArtist[] | null;
    songs: ISong[] | null;
  } | null;
  podcasts: IPodcastData[];
}
