import {createAsyncThunk} from '@reduxjs/toolkit';

import {getUpdateClient} from '../../../../requests/updateHeaders';
import {IPodcastData} from '../../../../models/Music';
import {IPodcastArg} from '../../../types/PodcastType';
import {GET_CARTOONS} from '../../../../gql/query/cartoons/GetCartoons';

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
