import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../Styles/Styles';
import BoldText from './BoldText';
import {Rating} from './Rating';
import RankComponent from './RankComponent';

import {useDispatch} from 'react-redux';
import {setOpen} from '../redux/slices/bottomSheetSlice';
import MediumText from './MediumText';

const {width, height} = Dimensions.get('window');

export type BottomSheetHandle = {
  open: () => void;
};

interface IProps {
  name: string;
  isReview?: boolean;
  activeReview?: number | null | undefined;
}

const BottomSheet = forwardRef(({name, activeReview}: IProps, ref) => {
  const modalRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const translateYR = useSharedValue(0);
  const dispatch = useDispatch();
  //open BottomSheet
  useImperativeHandle<unknown, BottomSheetHandle>(ref, () => ({
    open: () => {
      if (translateYR.value !== -height) {
        dispatch(setOpen(false));
        translateYR.value = withTiming(translateYR.value - height, {
          duration: 600,
        });
      }
    },
  }));
  //leave Comment and close bottomSheet
  const publishReviewHandler = (rank: number, comment: string) => {
    if (ref) {
      dispatch(setOpen(true));
      translateYR.value = withTiming(translateYR.value + height, {
        duration: 600,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyboardVisibility = (
    isKeyboardVisible: boolean | React.SetStateAction<boolean>,
  ) => {
    setKeyboardVisible(isKeyboardVisible);
    if (isKeyboardVisible) {
      translateYR.value = withTiming(translateYR.value + height / 3, {
        duration: 100,
      });
    } else {
      translateYR.value = withTiming(translateYR.value - height / 3, {
        duration: 100,
      });
    }
  };

  //reset state
  useEffect(() => {
    return () => {
      dispatch(setOpen(true));
    };
  }, [dispatch]);

  // keyboard listener
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (Platform.OS === 'android') {
          handleKeyboardVisibility(false);
        }
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (Platform.OS === 'android') {
          handleKeyboardVisibility(false);
        }
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [handleKeyboardVisibility]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === 'ios' ? insets.top : 0,
          paddingBottom: Platform.OS === 'ios' ? insets.top : 0,
        },
        {
          transform: [{translateY: translateYR}],
        },
      ]}
      ref={modalRef}>
      <KeyboardAvoidingView>
        <View>
          <View style={styles.drag} />
          <BoldText fontSize={18} style={{textAlign: 'center'}}>
            Оценить
          </BoldText>
          <View style={styles.movieInfo}>
            {/* mock */}
            {name === 'film' && (
              <Image
                source={{
                  uri: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/6fa09de3-4afd-4155-a6b9-4149be130ccd/3840x',
                }}
                style={styles.poster}
              />
            )}
            {name === 'serial' && (
              <Image
                source={{
                  uri: 'https://nvk-online.ru/new/movie/html/wp-content/uploads/2019/12/st1.jpg',
                }}
                style={styles.poster}
              />
            )}

            {name === 'cartoon' ? (
              <Image
                source={{
                  uri: 'https://kartinkof.club/uploads/posts/2022-09/1662203681_1-kartinkof-club-p-novie-i-krasivie-kartinki-masha-i-medved-1.jpg',
                }}
                style={styles.poster}
              />
            ) : null}
            <View>
              <View style={{alignSelf: 'flex-start'}}>
                <Rating isStar />
              </View>

              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <BoldText fontSize={18}>
                  {(name === 'film' && 'Пугало') ||
                    (name === 'cartoon' && 'Маша и медведь') ||
                    (name === 'serial' && 'Дьулаан дьыала')}
                </BoldText>
                <MediumText
                  style={{
                    paddingVertical: 2,
                    color: colors.secondaryGray,
                    fontSize: 13,
                    marginLeft: 6,
                  }}>
                  2020
                </MediumText>
              </View>
            </View>
          </View>

          <BoldText fontSize={18}>Как Вам фильм?</BoldText>
          <RankComponent
            publishReviewHandler={publishReviewHandler}
            activeReview={activeReview}
          />
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
});

export default React.memo(BottomSheet);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.white,
    alignItems: 'center',
    height,
    width,
    bottom: -height,
    zIndex: 200,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  drag: {
    width: 50,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
    alignSelf: 'center',
  },
  movieInfo: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
  },
  poster: {
    width: 120,
    height: 170,
    borderRadius: 15,
    marginRight: 15,
  },
});
