import {createSlice} from '@reduxjs/toolkit';
import {publishPost} from '../thunks/post/PublishPost';
import {CreatePostImage, CreatePostType} from '../types/CreatePostTypes';
import {Video} from 'react-native-image-crop-picker';

const initialState: CreatePostType = {
  title: '',
  content: '',
  images: [],
  lastId: 0,
  video: null,
};

const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    setTitle(
      state,
      action: {
        payload: string;
      },
    ) {
      state.title = action.payload;
    },

    setContent(
      state,
      action: {
        payload: string;
      },
    ) {
      state.content = action.payload;
    },

    addImage(state, action: {payload: CreatePostImage}) {
      state.images = [...state.images, action.payload];
    },

    setVideo(state, action: {payload: Video | null}) {
      state.video = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(publishPost.fulfilled, (state, action) => {
      state.title = '';
      state.content = '';
      state.images = [];
      state.lastId = action.payload.id;
      state.video = null;
    });
  },
});

export const {setTitle, setContent, addImage, setVideo} =
  createPostSlice.actions;

export default createPostSlice.reducer;
