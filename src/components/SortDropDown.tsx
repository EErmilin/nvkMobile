import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import MediumText from './MediumText';
import {colors, useTheme} from '../Styles/Styles';
import BoldText from './BoldText';
import {IFilterOrderBy} from '../redux/types/FilterTypes';

export const sortOptions: Record<IFilterOrderBy, string> = {
  UPDATES: 'По обновлению',
  NEW: 'По новизне',
  VIEWS: 'По просмотрам',
  KINOPOISK: 'По Кинопоиску',
};

const options = Object.entries(sortOptions).map(
  ([value, text]) =>
    ({value, text} as {
      value: IFilterOrderBy;
      text: string;
    }),
);

interface SortDropDownProps {
  sortOption: IFilterOrderBy;
  setSortOption: (value: IFilterOrderBy) => void;
  setSortVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortDropDown = ({
  sortOption,
  setSortOption,
  setSortVisible,
}: SortDropDownProps) => {
  const onSortHandle = (sortItem: IFilterOrderBy) => {
    if (sortItem) {
      setSortOption(sortItem);
      setSortVisible(false);
    }
  };
  const theme = useTheme();

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
        {options.map(item => {
          return (
            <Pressable onPress={() => onSortHandle(item.value)}>
              {sortOption === item.value ? (
                <BoldText
                  style={{
                    color: theme.colors.colorMain,
                  }}>
                  {item.text}
                </BoldText>
              ) : (
                <MediumText style={{color: colors.gray}}>
                  {item.text}
                </MediumText>
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
