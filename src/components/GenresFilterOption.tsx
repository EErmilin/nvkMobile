import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchComponent} from './SearchComponent';
import FilterRenderItem from './FilterRenderItem';
import FilterFooterButtons from './FilterFooterButtons';
import {colors} from '../Styles/Styles';

const genres = [
  'Комедия',
  'Приключения',
  'Драма',
  'Триллеры',
  'Семейные',
  'Фэнтези',
  'Фантастика',
  'Ужасы',
];

const GenresFilterOptions = () => {
  return (
    <View style={styles.container}>
      <SearchComponent value="" placeholder="Поиск по названию" />
      {genres.map((item, index) => {
        return (
          <FilterRenderItem item={item} index={index} key={item.toString()} />
        );
      })}

      {/* <FlatList
        data={genres}
        renderItem={({item, index}) => {
          return <FilterRenderItem item={item} index={index} />;
        }}
      /> */}
      {/* <View style={styles.buttonContainer}>
        <FilterFooterButtons />
      </View> */}
    </View>
  );
};

export default GenresFilterOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
  },
});
