export type CreatePostImage = {
  url: string;
  id: number;
};

export interface CreatePostType {
  text: string;
  images: CreatePostImage[];
}
