import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  MARK_SERIES_VIEWED,
  SEASONS,
  SERIALS,
  SERIES_IS_VIEWED,
} from '../../../../gql/query/series/Series';
import {IPodcastData} from '../../../../models/Music';
import {getUpdateClient} from '../../../../requests/updateHeaders';
import {IPodcastArg} from '../../../types/PodcastType';

export const getSeries = createAsyncThunk<IPodcastData[], IPodcastArg>(
  'series/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: SERIALS,
      variables: data,
    });
    return response.data.serials as IPodcastData[];
  },
);
//seasons
export const getSeasons = createAsyncThunk<IPodcastData[], IPodcastArg>(
  'seasons/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: SEASONS,
      variables: data,
    });
    return response.data.seriesSeasons as IPodcastData[];
  },
);

export const seriesIsViewed = createAsyncThunk<boolean, any>(
  'series-is-viewed/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: SERIES_IS_VIEWED,
      variables: data,
    });
    return response.data.seriesIsViewed as boolean;
  },
);

export const markSeriesViewed = createAsyncThunk<boolean, any>(
  'mark-series-viewed/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.mutate({
      mutation: MARK_SERIES_VIEWED,
      variables: data,
    });
    return response.data.markSeriesAsViewed as boolean;
  },
);
