import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';

import {IBroadcast} from '../../models/Broadcast';
import {IPost} from '../../models/Post';
import {IAlbum, ISongType, IMusicAlbumID} from '../../models/Music';
import {IRadioProgram} from '../../models/Radio';
import {Track} from 'react-native-track-player';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {TabParamList} from './TabTypes';
import {FilterType} from '../../gql/query/filters/filters';

export type RootStackParamList = {
  Tabs: undefined;
  MyPosts: TabParamList['Main'];
  CreatePost: undefined;
  EditProfile: undefined;
  HashtagScreen: undefined;
  SubscriptionsScreen: undefined;
  CreateBloger: undefined;
  EditBloger: undefined;
  NewsView: {post: IPost};
  Horoscope: undefined;
  Broadcasts: undefined;
  BroadcastView: {broadcast: IBroadcast};
  BroadcastSeasonList: {broadcast: IBroadcast};
  Music: undefined;
  AlbumList: {album: IAlbum; type: ISongType};
  AllAlbum: {type: ISongType};
  AllAuthor: undefined;
  AllMusic: undefined;
  ViewTag: {
    id: number;
    name: string;
  };
  MyFavoriteSongs: {type: 'podcast' | 'music'};
  MusicPlayer: {
    album: Track[];
    music: Track;
    index: number;
    albumID: IMusicAlbumID;
    type: ISongType;
  };
  Podcast: undefined;
  AllAlbumPodcast: {id: number};
  LiveScreen: undefined;
  ViewLive: {
    id: number;
    live: string;
  };
  LiveQuestion: {
    id: number;
  };
  RadioListScreen: undefined;
  RadioScreen: {
    title: string;
    url: string;
    imageUrl: string;
    author: string;
    trackTitle: string;
  };
  RadioProgramScreen: {
    programs: IRadioProgram[];
  };
  ServicesScreen: undefined;
  ViewService: {
    type: 'Услуга' | 'Купоны' | 'Заявка на рекламу';
    id: number;
    name: string;
  };
  PrivacyPolicy: {
    id: number;
  };
  UseOfTerms: {
    id: number;
  };
  Region: undefined;
  PasswordEdit: undefined;
  PasswordEditNew: {
    password: string;
  };
  AboutScreen: undefined;
  Settings: undefined;
  TechSupport: undefined;
  Films: undefined;
  Filter: {
    type: FilterType;
  };
  Film: {
    id: number;
    title: string;
    rating: number;
  };
  BlogerProfile: {
    id: number;
  };
  Series: undefined;
  CurrentSeries: {
    id: number;
    title: string;
    rating: number;
  };
  AllSeries: {
    id: number;
    title: string;
  };
  Cartoons: undefined;
  Cartoon: {
    cartoon: any;
    season: any;
    episode: any;
    title: string;
  };
  Reviews: {
    name: string;
  };
  Comments: {
    postId: number;
  };
};

export type RootNavigationProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootNavigationTabProps<T extends keyof RootStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList, T>,
    BottomTabScreenProps<TabParamList>
  >;

export type RootNavigationPropsIOS<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
