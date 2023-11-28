import {createAsyncThunk} from '@reduxjs/toolkit';

import {ApolloError} from '@apollo/client';
import {CREATE_REVIEW} from '../../../gql/mutation/review/CreateReview';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {ICreateReviewInput, IReview} from '../../../models/Review';

export const createReview = createAsyncThunk<IReview, ICreateReviewInput>(
  'review/create',
  async (data, {rejectWithValue, fulfillWithValue}) => {
    try {
      let client = await getUpdateClient();
      let response = await client.mutate({
        mutation: CREATE_REVIEW,
        variables: {
          createUserVoteInput: data,
        },
      });
      console.log('REVIEW_RESP', response.data, response.errors);
      return fulfillWithValue(response.data.createUserVote);
    } catch (e) {
      console.log('REVIEW_ERR', e);
      if (e instanceof ApolloError) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue('Error');
      }
    }
  },
);
