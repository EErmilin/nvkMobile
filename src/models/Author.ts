import {IPost} from './Post';

export interface IAuthorData {
  author: IAuthor;
  authorAggregate: IAuthorAggregate;
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
