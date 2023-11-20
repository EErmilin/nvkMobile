import {createAsyncThunk} from '@reduxjs/toolkit';

import {AUTHOR} from '../../../gql/query/author/Author';
import {IAuthor, IAuthorData} from '../../../models/Author';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {IGetAuthorArg} from '../../types/AuthorTypes';

export const getAuthor = createAsyncThunk<IAuthorData, IGetAuthorArg>(
  'author/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: AUTHOR,
      variables: data,
    });
    return response.data as IAuthorData;
  },
);
