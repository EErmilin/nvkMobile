/* eslint-disable prettier/prettier */
import {createAsyncThunk} from '@reduxjs/toolkit';

import {getUpdateClient} from '../../../../requests/updateHeaders';
import {IPodcastData} from '../../../../models/Music';
import {IPodcastArg} from '../../../types/PodcastType';
import {SERIES} from '../../../../gql/query/series/Series';

export const getSeries = createAsyncThunk<IPodcastData[], IPodcastArg>(
  '',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: SERIES,
      variables: data,
    });

    return response.data.shows as IPodcastData[];
  },
);
