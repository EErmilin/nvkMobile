import {DocumentNode} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  FilterType,
  GET_FILTER_COUNTRY,
  GET_FILTER_GENRE,
  GET_FILTER_LANGUAGE,
  GetFilter,
  GetFilterVariables,
} from '../gql/query/filters/filters';
import {useAppSelector} from '../redux/hooks';
import {setFilter} from '../redux/slices/filterSlice';
import {getUpdateClient} from '../requests/updateHeaders';
import { useTheme } from '../Styles/Styles';
import BoldText from './BoldText';
import FilterFooterButtons from './FilterFooterButtons';
import FilterRenderItem from './FilterRenderItem';
import {SearchComponent} from './SearchComponent';

const height = Dimensions.get('window').height;

interface GenresFilterOptionsProps {
  page: string;
  type: FilterType;
  onClose: () => void;
}

const documents: Record<string, DocumentNode> = {
  Жанры: GET_FILTER_GENRE,
  Язык: GET_FILTER_LANGUAGE,
  Страны: GET_FILTER_COUNTRY,
};

const currentYear = new Date().getFullYear();
const yearsArray = Array.from(
  {length: currentYear - 2010 + 1},
  (_, index) => 2010 + index,
);

const filterValues: Record<string, number[]> = {
  Годы: yearsArray,
  Возраст: [0, 6, 12, 16, 19],
};

const FilterOption = ({page, type, onClose}: GenresFilterOptionsProps) => {
  const [checkArr, setCheckArr] = useState<string[] | number[] | null>(null);
  const {filters} = useAppSelector(state => state.filter.filters[type]);
  const {colors} = useTheme()

  useEffect(() => {
    const doc = documents[page];
    if (doc) {
      getUpdateClient().then(async client => {
        const {data} = await client.query<GetFilter, GetFilterVariables>({
          query: doc,
          variables: {
            type,
          },
        });

        if (data.filters) {
          setCheckArr(data.filters.map(f => f.name));
        }
      });
    } else if (filterValues[page]) {
      setCheckArr(filterValues[page]);
    }
  }, [page, type]);

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(() => filters[page] || []);

  const apply = () => {
    dispatch(setFilter({selected, type, page}));
    onClose();
  };
  const clear = () => {
    dispatch(setFilter({selected: [], type, page}));
    onClose();
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.bgSecondary}]}>
      <View style={styles.title}>
        <BoldText>{page}</BoldText>
      </View>
      {page === 'Жанры' ? (
        <SearchComponent
          value=""
          placeholder="Поиск по названию"
          style={{marginBottom: 10}}
        />
      ) : null}

      <ScrollView showsVerticalScrollIndicator={false}>
        {checkArr?.map((item, index) => {
          const value = item.toString();
          return (
            <FilterRenderItem
              item={value}
              index={index}
              key={value}
              isRatio={page === 'Жанры' ? false : true}
              suffix={page === 'Возраст' ? '+' : undefined}
              isChecked={selected.includes(value)}
              onToggle={() => {
                setSelected(sel =>
                  sel.includes(value)
                    ? sel.filter(i => i !== value)
                    : [...selected, value],
                );
              }}
            />
          );
        })}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <FilterFooterButtons onApply={apply} onClear={clear} />
      </View>
    </View>
  );
};

export default FilterOption;

const styles = StyleSheet.create({
  container: {
    height: height - 100,
  },
  title: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});
