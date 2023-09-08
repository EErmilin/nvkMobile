import {current} from '@reduxjs/toolkit';
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';

// import {
//   setUserSettingsModalRef,
//   setWatchCompanionModalRefACTION,
// } from '../../store/app/actions';
// import {useAnalyticEvent} from '../../api/analytics/useAnalyticEvent';

export type WatchCompanionsHandle = {
  open: () => void;
};

const Modilize = forwardRef((_, ref) => {
  //   const dispatch = useTypedDispatch();
  //   const trackEvent = useAnalyticEvent();
  const modalizeRef = useRef<any>(null);

  useImperativeHandle<unknown, WatchCompanionsHandle>(ref, () => ({
    open: () => modalizeRef.current?.open(),
  }));

  useEffect(() => {
    // dispatch(setWatchCompanionModalRefACTION(ref));
  }, []);

  return (
    <View
      ref={modalizeRef}
      // modalStyle={styles.modalizeStyle}
      // scrollViewProps={{ keyboardShouldPersistTaps: "always" }}
      // closeOnOverlayTap={false}
      // closeSnapPointStraightEnabled={false}
      // adjustToContentHeight
    >
      <View style={styles.loader}></View>
    </View>
  );
});

export default Modilize;

const styles = StyleSheet.create({
  modalizeStyle: {},
  loader: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  image: {
    width: 50,
    height: 80,
    marginVertical: 16,
    marginLeft: 32,
    marginRight: 16,
  },
  text: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
  },
});
