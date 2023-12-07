import {useMutation} from '@apollo/client';
import {useCallback, useEffect, useState} from 'react';
import {REMOVE_FAVORITE} from '../gql/mutation/favorite/RemoveFavorite';
import {CREATE_FAVORITE_SIMPLE} from '../gql/query/favorites/Favorites';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {fetchFavoriteIds} from '../redux/thunks/favorite/GetFavoriteIds';

export function useFavorite(where: {
  postId?: number;
  showId?: number;
  songId?: number;
  episodeId?: number;
  animationId?: number;
  movieId?: number;
  seriesId?: number;
}) {
  const [updating, setUpdating] = useState(false);
  const dispatch = useAppDispatch();
  const [create] = useMutation(CREATE_FAVORITE_SIMPLE);
  const [remove] = useMutation(REMOVE_FAVORITE);
  const token = useAppSelector(state => state.auth.token);

  const key = Object.keys(where)[0];
  const favorite = useAppSelector(
    state =>
      state.favorite.favoriteIds?.find(f => f[key] === where[key]) || null,
  );

  const id = favorite?.id;
  const [isFavorite, setIsFavorite] = useState(!!id);

  const toggle = useCallback(async () => {
    if (updating) {
      return;
    }

    try {
      setUpdating(true);
      setIsFavorite(v => !v);
      if (id) {
        await remove({
          variables: {
            removeFavoriteId: id,
          },
        });
      } else {
        await create({
          variables: {
            data: {...where},
          },
        });
      }
    } finally {
      dispatch(fetchFavoriteIds(token));
      setUpdating(false);
    }
  }, [where, updating, id, token, dispatch, create, remove]);

  useEffect(() => {
    setIsFavorite(!!id);
  }, [id]);

  return {isFavorite, toggle};
}
