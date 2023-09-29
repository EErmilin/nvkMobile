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

const {width} = Dimensions.get('window');

interface FilterOptionsProps {
  title: string;
  handlePage: (pageId: string) => void | undefined;
}

const FilterOptions = ({title, handlePage}: FilterOptionsProps) => {
  const handlePageId = () => {
    handlePage('genres');
  };

  return (
    <TouchableOpacity
      style={styles.genres}
      activeOpacity={0.7}
      onPress={handlePageId}>
      <BoldText>{title}</BoldText>
      <View style={styles.checkedFilterContainer}>
        <Text style={styles.checkedFilterText}>Все</Text>
        <ArrowRight />
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
