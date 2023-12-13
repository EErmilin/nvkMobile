import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BoldText, MediumText, SearchComponent} from './index';
import * as React from 'react';
import {colors, useTheme} from '../Styles/Styles';
import {FC, useMemo, useState} from 'react';
import {getRandomNumber} from '../helpers/childrenModeHelpers';

interface Props {
  isBottomSheetVisible: boolean;
  setBottomSheetVisible: (value: boolean) => void;
  setIsChildrenMode: (value: boolean) => void;
}

export const ChildrenModeModal: FC<Props> = ({
  isBottomSheetVisible,
  setBottomSheetVisible,
  setIsChildrenMode,
}) => {
  let a = useMemo(() => getRandomNumber(1, 5), [isBottomSheetVisible]);
  let b = useMemo(() => getRandomNumber(1, 5), [isBottomSheetVisible]);
  const [value, setValue] = useState('');
  const theme = useTheme();

  const onSubmit = () => {
    if ((a * b).toString() === value) {
      setBottomSheetVisible(false);
      setIsChildrenMode(false);
    } else {
      setBottomSheetVisible(false);
    }
    setValue('');
  };

  return (
    <Modal visible={isBottomSheetVisible} animationType="slide">
      <View style={[styles.modal, {backgroundColor: theme.colors.bgPrimary}]}>
        <BoldText style={{marginTop: 24}} fontSize={16}>
          Решите эту задачу
        </BoldText>
        <View
          style={[styles.container, {backgroundColor: theme.colors.bgPrimary}]}>
          <BoldText fontSize={24}>
            {a.toString()} * {b.toString()} =
          </BoldText>
        </View>
        <SearchComponent
          style={{width: '100%'}}
          value={value}
          isSearch={false}
          onChangeText={setValue}
          placeholder={'Ответ'}
          containerStyle={{
            backgroundColor: theme.colors.fillPrimary,
            width: '100%',
          }}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <MediumText style={{color: colors.white}}>Отправить ответ</MediumText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    alignItems: 'center',
    paddingVertical: 18,
    backgroundColor: colors.orange,
    borderRadius: 16,
    width: '100%',
  },
  input: {
    height: 60,
    width: '100%',
    backgroundColor: colors.background,
  },
  modal: {
    flex: 1,
    padding: 15,
    gap: 20,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    paddingVertical: 54,
    borderRadius: 15,
    gap: 10,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
