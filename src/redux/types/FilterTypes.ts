import {FilterType} from '../../gql/query/filters/filters';

export type IFilterOrderBy = 'UPDATES' | 'NEW' | 'VIEWS' | 'KINOPOISK';

export type IFilter = {
  filters: Record<string, string[]>;
  orderBy: IFilterOrderBy;
  rating: {
    from?: number | null;
    to?: number | null;
  };
};

export interface IFilterState {
  filters: Record<FilterType, IFilter>;
}
