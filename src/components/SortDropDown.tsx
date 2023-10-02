import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import MediumText from './MediumText';
import {colors} from '../Styles/Styles';
import BoldText from './BoldText';

const sortOptions = [
  'По обновлению',
  'По новизне',
  'По просмотрам',
  'По Кинопоиску',
];

interface SortDropDownProps {
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  setSortVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortDropDown = ({
  sortOption,
  setSortOption,
  setSortVisible,
}: SortDropDownProps) => {
  const onSortHandle = (sortItem: string) => {
    if (sortItem) {
      setSortOption(sortItem);
      setSortVisible(false);
    }
  };
  return (
    <View style={styles.sortContainer}>
      <MediumText style={{color: colors.gray}}>Сортировать</MediumText>
      <View
        style={{
          height: 1,
          backgroundColor: colors.borderGray,
          marginVertical: 15,
        }}
      />
      <View style={styles.option}>
        {sortOptions.map(item => {
          return (
            <Pressable onPress={() => onSortHandle(item.toString())}>
              {sortOption === item ? (
                <BoldText>{item}</BoldText>
              ) : (
                <MediumText style={{color: colors.gray}}>{item}</MediumText>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default SortDropDown;

const styles = StyleSheet.create({
  sortContainer: {
    position: 'absolute',
    width: 194,
    padding: 20,
    bottom: Platform.OS === 'ios' ? -220 : -250,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 14,
  },
  option: {
    flex: 1,
    gap: 15,
  },
});
