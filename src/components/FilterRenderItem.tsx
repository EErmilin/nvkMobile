import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BoldText from './BoldText';
import CheckedInput from '../assets/icons/CheckedInput';
import {TouchableOpacity} from 'react-native';
import {colors} from '../Styles/Styles';

interface FilterRenderItemProps {
  item: string | number;
  index: number;
  isRatio: boolean;
}

const FilterRenderItem = ({item, index, isRatio}: FilterRenderItemProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckboxHandler = () => {
    setIsChecked(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <BoldText style={{marginTop: index === 0 ? 10 : 0}}>
        {item.toString()}
      </BoldText>
      {isRatio ? (
        <TouchableOpacity onPress={toggleCheckboxHandler}>
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
          onPress={toggleCheckboxHandler}
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
    backgroundColor: colors.bluishGray,
  },
  ratio: {
    width: 28,
    height: 28,
    backgroundColor: colors.bluishGray,
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
