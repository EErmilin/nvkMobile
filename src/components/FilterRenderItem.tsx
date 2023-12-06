import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../Styles/Styles';
import CheckedInput from '../assets/icons/CheckedInput';
import BoldText from './BoldText';

interface FilterRenderItemProps {
  item: string | number;
  index: number;
  isRatio: boolean;
  suffix?: string;
  isChecked: boolean;
  onToggle: () => void;
}

const FilterRenderItem = ({
  item,
  index,
  isRatio,
  suffix,
  isChecked,
  onToggle,
}: FilterRenderItemProps) => {
  return (
    <View style={styles.container}>
      <BoldText style={{marginTop: index === 0 ? 10 : 0}}>
        {item.toString()}
        {suffix || ''}
      </BoldText>
      {isRatio ? (
        <TouchableOpacity onPress={onToggle}>
          {!isChecked ? (
            <View style={styles.ratio} />
          ) : (
            <View style={styles.ratioActive}>
              <View style={styles.ratioInner} />
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onToggle}
          style={[
            styles.checkbox,
            !isChecked ? styles.inActiveCheckBox : null,
          ]}>
          {isChecked && <CheckedInput />}
        </TouchableOpacity>
      )}
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
  inActiveCheckBox: {
    backgroundColor: colors.secondaryGray,
  },
  ratio: {
    width: 28,
    height: 28,
    backgroundColor: colors.secondaryGray,
    borderRadius: 14,
  },
  ratioActive: {
    width: 28,
    height: 28,
    backgroundColor: colors.orange,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratioInner: {
    backgroundColor: colors.white,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
