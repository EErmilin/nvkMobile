import {createAsyncThunk} from '@reduxjs/toolkit';

import {GET_REVIEWS} from '../../../../gql/mutation/review/GetReviews';
import {getUpdateClient} from '../../../../requests/updateHeaders';

export const getReviews = createAsyncThunk<any[], any>(
  'reviews/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: GET_REVIEWS,
      variables: data,
    });
    return response.data.userVotes;
  },
);
