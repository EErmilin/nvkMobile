import {Video} from 'react-native-image-crop-picker';

export type CreatePostImage = {
  url: string;
  id: number;
};

export interface CreatePostType {
  title: string;
  content: string;
  images: CreatePostImage[];
  lastId: number;
  video: Video | null;
}
