import {IAuthorData} from '../../models/Author';
import {IBroadcast} from '../../models/Broadcast';
import {
  IAlbum,
  IArtist,
  IPlaylist,
  IPodcastData,
  ISong,
} from '../../models/Music';
import {IPost} from '../../models/Post';

export interface IScreenState {
  authorData?: IAuthorData;
  authorPosts: IPost[];
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
