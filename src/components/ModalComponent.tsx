import React, {useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetModal from '@gorhom/bottom-sheet';
import {BlurView} from '@react-native-community/blur';
import {useTheme} from '../Styles/Styles';
import Toast from 'react-native-toast-message';

interface ModalComponentProps {
  visible: boolean;
  title?: string;
  child: React.ReactComponentElement<typeof View>;
  shouldClose: () => void;
  onStart?: () => void;
  snapPointsArr?: number[] | string[];
  snapStartIndex?: number;
  styleTitle?: TextStyle | TextStyle[];
  styler?: any;
}

export const ModalComponent: React.FC<ModalComponentProps> = props => {
  const {
    visible,
    shouldClose,
    child,
    onStart,
    snapPointsArr = ['92%'],
    snapStartIndex = 0,
    styler,
  } = props;
  const sheetRef = useRef<BottomSheetModal>(null);
  const handleSheetChange = useCallback(() => {
    onStart && onStart();
  }, [onStart]);
  const handleClosePress = useCallback(() => {
    shouldClose();
    sheetRef.current?.close();
  }, [shouldClose]);
  const {colors, theme} = useTheme();

  const TouchableBackClose = React.useCallback(
    () => (
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => handleClosePress()}
        activeOpacity={0.99}
      />
    ),
    [handleClosePress],
  );

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
      onRequestClose={shouldClose}>
      <BlurView style={{flex: 1}} blurType={theme} blurAmount={1}>
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModal
            ref={sheetRef}
            backdropComponent={TouchableBackClose}
            handleIndicatorStyle={{backgroundColor: colors.textSecondary}}
            index={snapStartIndex}
            enablePanDownToClose
            onClose={handleClosePress}
            snapPoints={snapPointsArr}
            onChange={handleSheetChange}
            backgroundStyle={[
              styles.handle,
              {backgroundColor: colors.fillPrimary},
              styler,
            ]}
            containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
            {child}
          </BottomSheetModal>
          <Toast />
        </GestureHandlerRootView>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  handle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'NotoSans',
  },
});
