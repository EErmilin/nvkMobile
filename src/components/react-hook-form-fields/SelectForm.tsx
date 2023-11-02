import React, { FC } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Image, StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import { colors } from '../../../api/staticData/colors';
import { fonts } from '../../../../assets/fonts';
import { images } from '../../../../assets/images';

type TSelectFormProps = {
  name: string;
  title?: string;
  subTitle?: string;
  data: string[];
  control: Control;
  rules?: { [x: string]: any };
  defaultButtonText?: string;
};

export const SelectForm: FC<TSelectFormProps> = ({
  name,
  title,
  subTitle,
  data,
  control,
  rules,
  defaultButtonText,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            {title && (
              <Text style={[styles.title, { color: error ? colors.red : colors.black }]}>
                {title}
              </Text>
            )}
            {subTitle && (
              <Text
                style={[
                  styles.subTitle,
                  { color: error ? colors.red : colors.greyLight1 },
                ]}>
                {subTitle}
              </Text>
            )}
          </View>

          <View
            style={[
              styles.inputWrapper,
              { borderColor: error ? 'red' : colors.greyLight },
            ]}>
            <SelectDropdown
              // dropdownStyle={{ textAlign: 'left' }}
              // rowStyle={{ textAlign: 'left' }}
              buttonStyle={styles.selectStyle}
              buttonTextStyle={styles.selectStyle_text}
              rowTextStyle={styles.selectStyle_row__Text}
              selectedRowStyle={styles.selected_row}
              data={data}
              onBlur={onBlur}
              defaultButtonText={defaultButtonText}
              defaultValue={value}
              onChangeSearchInputText={onChange}
              onSelect={(selectedItem, index) => {
                onChange(selectedItem);
              }}
              renderDropdownIcon={isOpened => {
                return <Image source={images.drop_down_icon} />;
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            {error && (
              <Text style={styles.text_error}>
                {error.message || 'Error not specified'}
              </Text>
            )}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  inputWrapper: {
    position: 'relative',
    backgroundColor: colors.white,
    width: '100%',
    borderColor: colors.greyLight,
    borderWidth: 1,
    borderRadius: 4,
    padding: 0,
    marginTop: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  title: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.integralCF_bold,
    letterSpacing: 0.84,
    lineHeight: 13,
  },
  subTitle: {
    fontSize: 14,
    color: colors.greyLight1,
    fontFamily: fonts.quincyCF_regular,
    letterSpacing: -0.14,
    lineHeight: 14,
  },
  selectStyle: {
    width: '100%',
    borderRadius: 4,
  },
  selectStyle_text: {
    flex: 1,
    color: colors.black,
    textAlign: 'left',
    fontFamily: fonts.quincyCF_medium,
    lineHeight: 19,
  },
  selectStyle_row__Text: {
    textAlign: 'left',
    fontFamily: fonts.quincyCF_medium,
    lineHeight: 19,
  },
  selected_row: {
    justifyContent: 'flex-start',
  },
  text_error: {
    position: 'absolute',
    fontSize: 12,
    color: 'red',
    left: 0,
    bottom: -15,
    lineHeight: 13,
  },
});
