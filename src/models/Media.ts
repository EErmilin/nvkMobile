export interface IMedia {
  id: number;
  name: string;
  content?: string;
  image?: {
    url: string;
    url_512: string;
  };
}

export interface ISearcMediaItem {
  type: 'title' | 'item'
}
