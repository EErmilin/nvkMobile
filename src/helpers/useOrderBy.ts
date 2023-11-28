import {useMemo} from 'react';
import {FilterType} from '../gql/query/filters/filters';
import {useAppSelector} from '../redux/hooks';
import {IFilterOrderBy} from '../redux/types/FilterTypes';

type Sort = {[key: string]: 'asc' | 'desc'};

const orders: Record<IFilterOrderBy, Sort> = {
  UPDATES: {updatedAt: 'desc'},
  NEW: {date: 'desc'},
  VIEWS: {views: 'desc'},
  KINOPOISK: {ratingKinopoisk: 'desc'},
};

export function useOrderBy(type: FilterType) {
  const orderBy = useAppSelector(state => state.filter.filters[type]?.orderBy);

  return useMemo<[IFilterOrderBy, Sort]>(() => {
    if (!orderBy) {
      return ['VIEWS', orders.VIEWS];
    }
    return [orderBy, orders[orderBy]];
  }, [orderBy]);
}
