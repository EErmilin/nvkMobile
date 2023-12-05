import {createAsyncThunk} from '@reduxjs/toolkit';

import {CREATE_POST} from '../../../gql/mutation/post/CreatePost';
import {ICreatePostArg} from '../../../models/Post';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {RootInterface} from '../../types';
import {ApolloError} from '@apollo/client';
import {uploadVideo} from '../../../requests/UploadVideo';
import Toast from 'react-native-toast-message';

export const publishPost = createAsyncThunk<{id: number}, undefined>(
  'createPost/publish',
  async (_, {getState, rejectWithValue, fulfillWithValue}) => {
    try {
      const state = <RootInterface>getState();
      if (!state.user.author?.author) {
        throw new Error('Unauthorized');
      }
      const data = state.createPost;

      if (!data.title) {
        throw new Error('Введите заголовок');
      }

      let mediaId: number | undefined;
      if (data.video) {
        const res = await uploadVideo({
          uri: data.video.path,
          type: data.video.mime,
          fileName: data.video.path,
        });

        if (res.data?.id) {
          mediaId = res.data.id;
        } else {
          throw new Error('Видео не загружено');
        }
      }

      let client = await getUpdateClient();
      let response = await client.mutate<
        {createPost: {id: number}},
        {data: ICreatePostArg}
      >({
        mutation: CREATE_POST,
        variables: {
          data: {
            published: true,
            authorId: state.user.author.author.id,
            title: data.title,
            content: data.content,
            mediaId,
            imageIds: data.images?.length
              ? data.images.map(({id}) => id)
              : undefined,
          },
        },
      });

      if (!response.data) {
        throw new Error('Пост не создан');
      }

      return fulfillWithValue(response.data.createPost);
    } catch (e) {
      console.log(e);

      Toast.show({
        type: 'error',
        text1: 'Ошибка при создании поста',
        text2: (e as Error)?.message,
      });

      if (e instanceof ApolloError) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue('Error');
      }
    }
  },
);
