import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {SearchComponent} from './SearchComponent';
import FilterRenderItem from './FilterRenderItem';
import FilterFooterButtons from './FilterFooterButtons';
import BoldText from './BoldText';

const height = Dimensions.get('window').height;
//mock
const filters = {
  genres: [
    'Комедия',
    'Приключения',
    'Драма',
    'Триллеры',
    'Семейные',
    'Фэнтези',
    'Фантастика',
    'Ужасы',
  ],
  years: [
    2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
    2011, 2010,
  ],
  age: ['0+', '6+', '12+', '16+', '19+'],
  language: ['якутский', 'Русский', 'Английский'],
  countries: ['Россия', 'Англия', 'Франция', 'Германия'],
};

interface GenresFilterOptionsProps {
  page: string;
}

const FilterOptions = ({page}: GenresFilterOptionsProps) => {
  const [checkArr, setCheckArr] = useState<string[] | number[] | null>(null);

  useEffect(() => {
    if (page) {
      if (page === 'Жанры') {
        setCheckArr(filters.genres);
      } else if (page === 'Годы') {
        setCheckArr(filters.years);
      } else if (page === 'Возраст') {
        setCheckArr(filters.age);
      } else if (page === 'Язык') {
        setCheckArr(filters.language);
      } else if (page === 'Страны') {
        setCheckArr(filters.countries);
      }
    }
  }, [page]);

  return (
    <View style={styles.container}>
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
          return (
            <FilterRenderItem
              item={item}
              index={index}
              key={item.toString() + index.toString()}
              isRatio={page === 'Жанры' ? false : true}
            />
          );
        })}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <FilterFooterButtons />
      </View>
    </View>
  );
};

export default FilterOptions;

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
