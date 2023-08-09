import * as React from 'react';
import {Modal, View, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetModal from '@gorhom/bottom-sheet';
import {BlurView} from '@react-native-community/blur';

import {useTheme} from '../Styles/Styles';
import Text from './MediumText';

interface IProps {
  visible: boolean;
  date: Date;
  onChangeDate: (value: Date) => void;
  shouldClose: () => void;
  onStart: () => void;
  snapPointsArr?: number[] | string[];
  snapStartIndex?: number;
  mode?: 'datetime' | 'date' | 'time';
}

export const ModalDatePicker = (props: IProps) => {
  const {
    visible,
    date,
    onChangeDate,
    shouldClose,
    onStart,
    snapPointsArr = ['35%'],
    snapStartIndex = 0,
    mode,
  } = props;
  const sheetRef = React.useRef<BottomSheetModal>(null);
  const handleSheetChange = React.useCallback(() => {
    onStart && onStart();
  }, [onStart]);
  const handleClosePress = React.useCallback(() => {
    sheetRef.current?.close();
    shouldClose();
  }, [shouldClose]);
  const [tempDate, setTempDate] = React.useState(date);
  const {colors, theme} = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      onRequestClose={shouldClose}>
      <BlurView style={{flex: 1}} blurType={theme} blurAmount={1}>
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModal
            ref={sheetRef}
            index={snapStartIndex}
            enablePanDownToClose
            backdropComponent={() => (
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  handleClosePress();
                }}
              />
            )}
            handleComponent={() => <View />}
            onClose={handleClosePress}
            snapPoints={snapPointsArr}
            onChange={handleSheetChange}
            style={{overflow: 'hidden', borderRadius: 25}}
            containerStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.fillPrimary,
              }}>
              <View
                style={{
                  height: 49,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  backgroundColor: colors.fillPrimary,
                }}>
                <TouchableOpacity
                  style={{marginRight: 15}}
                  onPress={() => {
                    onChangeDate(tempDate);
                    shouldClose();
                  }}>
                  <Text fontSize={16} style={{color: colors.colorMain}}>
                    Готово
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{backgroundColor: colors.fillPrimary}}>
                <DatePicker
                  date={tempDate}
                  onDateChange={setTempDate}
                  style={{
                    alignSelf: 'center',
                    marginTop: 20,
                    backgroundColor: colors.fillPrimary,
                  }}
                  locale="ru"
                  fadeToColor={colors.fillPrimary}
                  textColor={colors.textPrimary}
                  maximumDate={new Date()}
                  mode={mode}
                />
              </View>
            </View>
          </BottomSheetModal>
        </GestureHandlerRootView>
      </BlurView>
    </Modal>
  );
};
