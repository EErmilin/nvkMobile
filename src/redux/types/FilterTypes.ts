import {FilterType} from '../../gql/query/filters/filters';

export type IFilter = {
  filters: Record<string, string[]>;
  rating: {
    from: number | null;
    to: number | null;
  };
};

export interface IFilterState {
  filters: Record<FilterType, IFilter>;
}
