import React from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  markMovieViewed,
  movieIsViewed,
} from '../redux/thunks/screens/getFilms/GetFilms';
import {
  animationIsViewed,
  markAnimationViewed,
} from '../redux/thunks/screens/cartoons/GetCartoons';
import {setLogged} from '../redux/slices/authSlice';
import {
  markSeriesViewed,
  seriesIsViewed,
} from '../redux/thunks/screens/getSeries/GetSeries';

export type MediaType = 'MOVIE' | 'ANIMATION' | 'SERIES';

export function useMovieViewed(id: number, type: MediaType) {
  const dispatch = useAppDispatch();
  const [isViewed, setIsViewed] = React.useState(false);
  const token = useAppSelector(state => state.auth.token);

  const fetchViewed = async () => {
    let isViewedRes;
    switch (type) {
      case 'MOVIE':
        isViewedRes = await dispatch(movieIsViewed({id}));
        break;
      case 'ANIMATION':
        isViewedRes = await dispatch(animationIsViewed({id}));
        break;
      case 'SERIES':
        isViewedRes = await dispatch(seriesIsViewed({id}));
        break;
    }
    setIsViewed(isViewedRes?.payload ?? false);
  };

  const markAsView = async () => {
    if (!token) {
      dispatch(setLogged(false));
      return;
    }
    let isViewedRes;
    switch (type) {
      case 'MOVIE':
        isViewedRes = await dispatch(markMovieViewed({id}));
        break;
      case 'ANIMATION':
        isViewedRes = await dispatch(markAnimationViewed({id}));
        break;
      case 'SERIES':
        isViewedRes = await dispatch(markSeriesViewed({id}));
        break;
    }
    setIsViewed(isViewedRes.payload ?? false);
  };

  return {
    isViewed,
    fetchViewed,
    markAsView,
  };
}
