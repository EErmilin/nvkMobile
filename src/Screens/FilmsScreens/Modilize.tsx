import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import BottomSheet from '../../components/BottomSheet';

export type WatchCompanionsHandle = {
  open: () => void;
};

const Modilize = forwardRef((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  //   const dispatch = useTypedDispatch();
  //   const trackEvent = useAnalyticEvent();
  const modalizeRef = useRef<any>(null);

  console.log(isVisible);

  useImperativeHandle<unknown, WatchCompanionsHandle>(ref, () => ({
    open: () => setIsVisible(prev => !prev),
  }));

  useEffect(() => {
    // dispatch(setWatchCompanionModalRefACTION(ref));
  }, []);

  return (
    <View ref={modalizeRef}>
      <BottomSheet isVisible={isVisible} />
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
