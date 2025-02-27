import {IAuthor, IAuthorData} from '../../models/Author';
import {IBloger, IUser} from '../../models/User';

export interface UserTypes {
  data: IUser | null;
  author?: IAuthorData | null | undefined;
  subscribers: number;
  subscribes: number;
  listSearch: string[];
  hashtags: {hashtag: {name: string; id: number}}[];
  selectedSibscribe: IBloger | null;
  subscriptions?: IAuthor[];
}

export interface IUserInput {
  phone: string;
  password: string;
  lastname: string;
  firstname: string;
  email: string;
}

export interface ISignUpInput {
  phone?: string;
  password: string;
  lastname?: string;
  firstname?: string;
  email?: string;
  code: string;
  birthdate?: string;
}

export interface UpdateUserInput {
  lastname?: string;
  id: number;
  firstname?: string;
  email?: string;
  hashtags: {name: string}[];
}

export interface IUpdateUserInput {
  lastname?: string;
  isAuthor?: string;
  firstname?: string;
  email?: string;
  birthdate?: Date;
  hashtags?: {name: string}[];
  avatar_id?: number;
}
