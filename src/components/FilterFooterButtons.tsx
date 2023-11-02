import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from './Button';
import {colors} from '../Styles/Styles';

const FilterFooterButtons = () => {
  return (
    <View style={styles.buttons}>
      <Button
        title="Сбросить"
        style={{
          backgroundColor: colors.bluishGray,
          flex: 1,
        }}
        textStyle={{color: colors.gray}}
      />
      <Button title="Показать" style={{flex: 1}} />
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
