import {seasons} from './../../gql/query/series/Series';
import {createSlice} from '@reduxjs/toolkit';
import {IScreenState} from '../types/ScreensTypes';

import {getBroadcasts} from '../thunks/screens/broadcasts/GetBroadcasts';
import {getMusics} from '../thunks/screens/musics/GetMusics';
import {getPodcasts} from '../thunks/screens/podcasts/GetPodcasts';
import {logout} from '../thunks/auth/Logout';
import {createFavorite} from '../thunks/favorite/CreateFavorite';
import {removeFavorite} from '../thunks/favorite/RemoveFavorite';
import {fetchFavorite} from '../thunks/favorite/GetFavorites';
import {deleteProfile} from '../thunks/user/DeleteProfile';
import {updateHashtag, updateUser} from '../thunks/user/UpdateUser';
import { getFilm, getFilms } from '../thunks/screens/getFilms/GetFilms';
import {getSeasons, getSeries} from '../thunks/screens/getSeries/GetSeries';
import {getCartoons} from '../thunks/screens/cartoons/GetCartoons';
import { createReview } from '../thunks/review/CreateReview';
import { getReviews } from '../thunks/screens/getReviews/GetReviews';

const initialState: IScreenState = {
  broadcasts: [],
  musics: null,
  podcasts: [],
  serials: [],
  seasons: [],
  cartoons: [],
  movies: [],
  movie: null,
};

const screensSlice = createSlice({
  name: 'screens',
  initialState,
  reducers: {
    setScreenMovies: (state, action) => {
      state.movies = action.payload;
    },
    setScreenMovie: (state, action) => {
      state.movie = action.payload;
    },
    setScreenBroadcasts: (state, action) => {
      state.broadcasts = action.payload;
    },
    setScreenSerials: (state, action) => {
      state.serials = action.payload;
    },
    setScreenMusics: (state, action) => {
      state.musics = action.payload;
    },
    setScreenPodcasts: (state, action) => {
      state.podcasts = action.payload;
    },
    clearScreensState: state => {
      state.broadcasts = [];
      state.musics = null;
      state.podcasts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getFilms.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getFilm.fulfilled, (state, action) => {
      state.movie = action.payload;
    });
    builder.addCase(getBroadcasts.fulfilled, (state, action) => {
      state.broadcasts = action.payload;
    });
    builder.addCase(getMusics.fulfilled, (state, action) => {
      state.musics = action.payload;
    });
    builder.addCase(getPodcasts.fulfilled, (state, action) => {
      state.podcasts = action.payload;
    });
    builder.addCase(getSeries.fulfilled, (state, action) => {
      state.serials = action.payload;
    });

    builder.addCase(getSeasons.fulfilled, (state, action) => {
      state.seasons = action.payload;
    });

    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });

    builder.addCase(getCartoons.fulfilled, (state, action) => {
      // console.log('arrr', action.payload);
      state.cartoons = action.payload;
    });

    builder.addCase(createReview.fulfilled, (state, action) => {
      // console.log('arrr', action.payload);
      state.review = action.payload;
    });

    builder.addCase(logout.rejected, state => {
      state.broadcasts = [];
      state.musics;
      state.podcasts = [];
    });
    builder.addCase(logout.fulfilled, state => {
      state.broadcasts = [];
      state.musics = null;
      state.podcasts = [];
    });
    builder.addCase(createFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
    builder.addCase(removeFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
    builder.addCase(fetchFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
    builder.addCase(deleteProfile.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
    builder.addCase(updateHashtag.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
  },
});

export const {
  setScreenBroadcasts,
  setScreenMusics,
  clearScreensState,
  setScreenSerials,
  setScreenMovies
} = screensSlice.actions;
export default screensSlice.reducer;
