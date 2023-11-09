import {useMemo} from 'react';
import {FilterType, MainFilter} from '../gql/query/filters/filters';
import {useAppSelector} from '../redux/hooks';

export function useFilter(type: FilterType) {
  const filter = useAppSelector(state => state.filter.filters[type]);

  return useMemo<MainFilter | null>(() => {
    if (!filter?.filters) {
      return null;
    }

    const mainFilter: MainFilter = {
      kinopoiskRating: filter.rating,
    };

    if (filter.filters['Жанры']?.length) {
      mainFilter.genre = filter.filters['Жанры'];
    }

    if (filter.filters['Язык']?.length) {
      mainFilter.language = filter.filters['Язык'];
    }

    if (filter.filters['Страны']?.length) {
      mainFilter.country = filter.filters['Страны'];
    }

    if (filter.filters['Возраст']?.length) {
      mainFilter.age = filter.filters['Возраст'];
    }

    if (filter.filters['Годы']?.length) {
      mainFilter.year = filter.filters['Годы'].map(Number);
    }

    console.log(JSON.stringify(mainFilter));

    return mainFilter;
  }, [filter]);
}
