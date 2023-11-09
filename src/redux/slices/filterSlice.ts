import {createSlice} from '@reduxjs/toolkit';
import {IFilter, IFilterState} from '../types/FilterTypes';
import {FilterType} from '../../gql/query/filters/filters';

export const createEmptyFilter = (): IFilter => ({
  filters: {},
  rating: {
    from: null,
    to: null,
  },
});

export const createEmptyFilters = (): IFilterState['filters'] => ({
  MOVIE: createEmptyFilter(),
  ANIMATION: createEmptyFilter(),
  SERIES: createEmptyFilter(),
});

const initialState: IFilterState = {
  filters: createEmptyFilters(),
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(
      state,
      {
        payload,
      }: {
        payload: {
          selected: string[];
          type: FilterType;
          page: string;
        };
      },
    ) {
      state.filters[payload.type].filters = {
        ...state.filters[payload.type].filters,
        [payload.page]: payload.selected,
      };
    },
    clearFilter(
      state,
      {
        payload,
      }: {
        payload: {
          type: FilterType;
        };
      },
    ) {
      state.filters[payload.type] = createEmptyFilter();
    },
  },
});

export const {setFilter, clearFilter} = filterSlice.actions;
export default filterSlice.reducer;
