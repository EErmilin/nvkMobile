import {IPost} from '../../models/Post';

export interface IGetAuthorArg {
  id: number;
  userId?: number;
}

export interface IGetAuthorSubArg {
  userId: number;
}

export interface ISubscribeArg {
  authorId: number;
  userId: number;
  isSubscribe: boolean;
}
