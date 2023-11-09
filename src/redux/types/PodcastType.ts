import {MainFilter} from '../../gql/query/filters/filters';
import {IPodcastData} from '../../models/Music';

export interface IPodcastState {
  data: IPodcastData[];
}

export interface IPodcastArg {
  skip?: number;
  take?: number;
  search?: string;
  where?: {
    podcastAlbums?: any;
    podcastArtists?: any;
    podcastEpisodes?: any;
    mainFilter?: MainFilter | null;
  } | null;
  cursor?: {
    id: number;
  };
  orderBy?: {
    date?: 'asc' | 'desc';
    name?: 'asc' | 'desc';
  };
}
