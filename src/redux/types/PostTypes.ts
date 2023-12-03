import {IPost} from '../../models/Post';

export interface IPostState {
  data: IPost[];
  removedPosts: number[];
}

export interface IGetPostArg {
  skip?: number;
  take?: number;
  where?: {
    title?: string;
    published?: boolean;
    content?: string;
    authorId?: {
      equals?: number;
    };
  };
  search?: string;
  cursor?: {
    id: number;
  };
  orderBy?: {
    title?: 'asc' | 'desc';
    published?: 'asc' | 'desc';
    id?: 'asc' | 'desc';
    content?: 'asc' | 'desc';
    authorId?: 'asc' | 'desc';
    createdAt: 'asc' | 'desc';
    author?: {
      name?: 'asc' | 'desc';
      id?: 'asc' | 'desc';
      email?: 'asc' | 'desc';
    };
  };
}
