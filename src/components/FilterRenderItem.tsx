import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BoldText from './BoldText';
import CheckedInput from '../assets/icons/CheckedInput';
import {TouchableOpacity} from 'react-native';
import {colors} from '../Styles/Styles';

interface FilterRenderItemProps {
  item: string;
  index: number;
}

const FilterRenderItem = ({item, index}: FilterRenderItemProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckboxHandler = () => {
    setIsChecked(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <BoldText style={{marginTop: index === 0 ? 10 : 0}}>{item}</BoldText>
      <TouchableOpacity
        onPress={toggleCheckboxHandler}
        style={[styles.checkbox, !isChecked ? styles.inActive : null]}>
        {isChecked && <CheckedInput />}
      </TouchableOpacity>
    </View>
  );
};

export default FilterRenderItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 28,
    height: 28,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  inActive: {
    backgroundColor: colors.bluishGray,
  },
});
