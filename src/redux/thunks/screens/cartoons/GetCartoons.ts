import {createAsyncThunk} from '@reduxjs/toolkit';

import {getUpdateClient} from '../../../../requests/updateHeaders';
import {IPodcastData} from '../../../../models/Music';
import {IPodcastArg} from '../../../types/PodcastType';
import {
  ANIMATION_IS_VIEWED,
  GET_CARTOONS,
  MARK_ANIMATION_VIEWED,
} from '../../../../gql/query/cartoons/GetCartoons';

export const getCartoons = createAsyncThunk<IPodcastData[], IPodcastArg>(
  'cartoons/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: GET_CARTOONS,
      variables: data,
    });
    return response.data.animations as any[];
  },
);

export const animationIsViewed = createAsyncThunk<boolean, any>(
  'animation-is-viewed/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: ANIMATION_IS_VIEWED,
      variables: data,
    });
    return response.data.animationIsViewed as boolean;
  },
);

export const markAnimationViewed = createAsyncThunk<boolean, any>(
  'mark-animation-viewed/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.mutate({
      mutation: MARK_ANIMATION_VIEWED,
      variables: data,
    });
    return response.data.markAnimationAsViewed as boolean;
  },
);
