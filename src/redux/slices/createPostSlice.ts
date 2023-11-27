import {createSlice} from '@reduxjs/toolkit';
import {CreatePostImage, CreatePostType} from '../types/CreatePostTypes';

const initialState: CreatePostType = {
  text: '',
  images: [],
};

const createPostSlice = createSlice({
  name: 'create-post',
  initialState,
  reducers: {
    setText(
      state,
      action: {
        payload: string;
      },
    ) {
      state.text = action.payload;
    },

    addImage(state, action: {payload: CreatePostImage}) {
      state.images = [...state.images, action.payload];
    },

    publishPost(state) {
      state.text = '';
      state.images = [];
    },
  },
});

export const {setText, addImage, publishPost} = createPostSlice.actions;

export default createPostSlice.reducer;
