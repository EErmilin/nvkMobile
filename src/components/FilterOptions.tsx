import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowRight} from './SVGcomponents';
import BoldText from './BoldText';
import {colors} from '../Styles/Styles';
import {FilterType} from '../gql/query/filters/filters';
import {useAppSelector} from '../redux/hooks';

const {width} = Dimensions.get('window');

interface FilterOptionsProps {
  title: string;
  type: FilterType;
  handlePage?: ((pageId: string | undefined) => void) | undefined;
}

const FilterOptions = ({title, handlePage, type}: FilterOptionsProps) => {
  const handlePageId = () => {
    if (title !== undefined && title !== 'Рейтинг Кинопоиск') {
      handlePage!(title);
    }
    return;
  };

  const filter = useAppSelector(state => state.filter.filters[type]);

  const isRating = title === 'Рейтинг Кинопоиск';
  const text = filter?.filters?.[title]?.join(', ') || 'Все';

  return (
    <TouchableOpacity
      style={styles.genres}
      activeOpacity={0.7}
      onPress={handlePageId}>
      <BoldText>{title}</BoldText>
      <View style={styles.checkedFilterContainer}>
        <Text style={styles.checkedFilterText}>{text}</Text>
        {!isRating && <ArrowRight />}
      </View>
    </TouchableOpacity>
  );
};

export default FilterOptions;

const styles = StyleSheet.create({
  genres: {
    flexDirection: 'row',
    width: width - 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkedFilterContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  checkedFilterText: {
    marginRight: 5,
    color: colors.gray,
  },
});
