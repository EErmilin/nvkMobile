import {IFavorite, IFavoriteId} from '../../models/Favorite';

export interface IFavoriteState {
  favorites: IFavorite[];
  favoriteIds: IFavoriteId[];
}
