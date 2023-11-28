import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from './Button';
import {colors} from '../Styles/Styles';

type Props = {
  onClear: () => void;
  onApply: () => void;
};

const FilterFooterButtons = ({onClear, onApply}: Props) => {
  return (
    <View style={styles.buttons}>
      <Button
        title="Сбросить"
        style={{
          backgroundColor: colors.bluishGray,
          flex: 1,
        }}
        textStyle={{color: colors.gray}}
        onPress={onClear}
      />
      <Button title="Показать" style={{flex: 1}} onPress={onApply} />
    </View>
  );
};

export default FilterFooterButtons;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    gap: 15,
  },
});
