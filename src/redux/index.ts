import {combineReducers} from 'redux';

import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import postSlice from './slices/postSlice';
import themeSlice from './slices/themeSlice';
import mainSlice from './slices/mainSlice';
import favoriteSlice from './slices/favoriteSlice';
import screensSlice from './slices/screensSlice';
import bottomSheetSlice from './slices/bottomSheetSlice';
import filterSlice from './slices/filterSlice';
import createPostSlice from './slices/createPostSlice';

export const reducersObj = {
  auth: authSlice,
  user: userSlice,
  post: postSlice,
  theme: themeSlice,
  main: mainSlice,
  favorite: favoriteSlice,
  screens: screensSlice,
  bottomSheet: bottomSheetSlice,
  filter: filterSlice,
  createPost: createPostSlice,
};

export const rootReducer = combineReducers(reducersObj);
