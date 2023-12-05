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
  Keyboard,
  Platform,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, useTheme} from '../Styles/Styles';
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
  imageUrl?: string;
  year?: string;
  isReview?: boolean;
  activeReview?: number | null | undefined;
  onReview: (comment: string, vote: number) => void;
}

const BottomSheet = forwardRef(
  ({name, activeReview, imageUrl, year, onReview}: IProps, ref) => {
    const modalRef = useRef(null);
    const insets = useSafeAreaInsets();
    //state
    const [keyboardVisible, setKeyboardVisible] = useState(false);
const {colors} = useTheme()
    //shared Value
    const translateYR = useSharedValue(0);
    const scrollContentY = useSharedValue(0);
    const pressed = useSharedValue(false);

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
      console.log(rank, comment);
      onReview(comment, rank);
      if (ref) {
        dispatch(setOpen(true));
        translateYR.value = withTiming(translateYR.value + height, {
          duration: 600,
        });
      }
    };
    //reset header state onPanGestureHandler
    const resetHeaderState = (isTrue: boolean) => {
      dispatch(setOpen(isTrue));
    };

    //pan gesture handler
    const pan = Gesture.Pan()
      .onBegin(() => {
        pressed.value = true;
      })
      .onChange(event => {
        if (event.translationY > 0) {
          translateYR.value = withTiming(
            translateYR.value + Math.floor(event.translationY),
          );
        }
      })
      .onFinalize(event => {
        if (event.velocityY > 600) {
          translateYR.value = withTiming(0, {duration: 300}, () => {
            runOnJS(resetHeaderState)(true);
          });
        } else {
          if (event.translationY !== 0) {
            translateYR.value = withTiming(-height);
          }
        }
        pressed.value = false;
      });

    //translate bottom sheet platform  android
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyboardVisibility = (
      isKeyboardVisible: boolean | React.SetStateAction<boolean>,
    ) => {
      if (isKeyboardVisible) {
        if (Platform.OS === 'android') {
          // setKeyboardVisible(true);
          translateYR.value = withTiming(translateYR.value + height / 4);
        }
      } else {
        if (Platform.OS === 'android') {
          // setKeyboardVisible(false);
          translateYR.value = withTiming(translateYR.value - height / 4);
        }
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
      //show keyboard
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          handleKeyboardVisibility(true);
          if (Platform.OS === 'ios' && scrollContentY.value === 0) {
            scrollContentY.value = withTiming(
              scrollContentY.value + -height / 5,
            );
          }
        },
      );
      //hide keyboard
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          handleKeyboardVisibility(false);
          if (Platform.OS === 'ios') {
            scrollContentY.value = withTiming(
              scrollContentY.value - -height / 5,
            );
          }
        },
      );
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, [handleKeyboardVisibility, scrollContentY]);

    return (
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            styles.container,
            {

              paddingTop: Platform.OS === 'ios' ? insets.top : 12,
              paddingBottom: Platform.OS === 'ios' ? insets.bottom : 12,
            },
            {
              transform: [{translateY: translateYR}],
            },
          ]}
          ref={modalRef}>
          <Animated.View
            style={[
              styles.contentContainer,
              Platform.OS === 'ios' ? {marginTop: scrollContentY} : null,
            ]}>
            <Pressable onPress={() => Keyboard.dismiss()}>
              <View style={styles.drag} />
              <BoldText fontSize={18} style={{textAlign: 'center'}}>
                Оценить
              </BoldText>
              <View style={styles.movieInfo}>
                <Image
                  source={{
                    uri: imageUrl,
                  }}
                  style={styles.poster}
                />
                <View>
                  <View style={{alignSelf: 'flex-start'}}>
                    <Rating isStar />
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <BoldText fontSize={18}>{name}</BoldText>
                    <MediumText
                      style={{
                        paddingVertical: 2,
                        color: colors.secondaryGray,
                        fontSize: 13,
                        marginLeft: 6,
                      }}>
                      {year ?? ''}
                    </MediumText>
                  </View>
                </View>
              </View>

              <BoldText fontSize={18}>Как Вам фильм?</BoldText>
              <RankComponent
                publishReviewHandler={publishReviewHandler}
                activeReview={activeReview}
              />
            </Pressable>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  },
);

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
    // paddingVertical: 12,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
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
