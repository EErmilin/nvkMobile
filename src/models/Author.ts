import {IPost} from './Post';

export interface IAuthorData {
  author: IAuthor;
  authorAggregate: IAuthorAggregate;
  authorIsSubscribe: IAuthorIsSubscribe;
}
export interface IAuthorIsSubscribe {
  isSubscribe: boolean;
}

export interface IAuthor {
  id: number;
  nickname: string;
  avatar: {
    url: string;
  };
  description?: string;
  vk?: string;
  telegram?: string;
  odnoklassniki?: string;
  youtube?: string;
  posts: IPost[];
}

export interface IAuthorAggregate {
  postsCount: number;
  subsCount: number;
  followsCount: number;
}
