import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetScrollViewMethods,
} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {colors, useTheme} from '../Styles/Styles';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {setOpen} from '../redux/slices/bottomSheetSlice';
import {createReview} from '../redux/thunks/review/CreateReview';
import {getReviews} from '../redux/thunks/screens/getReviews/GetReviews';
import BoldText from './BoldText';
import MediumText from './MediumText';
import RankComponent from './RankComponent';
import {Rating} from './Rating';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBottomSheetBackHandler} from '../helpers/useBottomSheetBackHandler';

const {width, height} = Dimensions.get('window');

type ReviewBottomSheetHandle = {
  open(): void;
};

type Props = {
  name: string;
  imageUrl?: string;
  year?: string;
  activeReview?: number | null | undefined;
  idField: string;
  id: string;
  rating?: number;
};

export const ReviewBottomSheet = forwardRef<ReviewBottomSheetHandle, Props>(
  ({name, year, imageUrl, activeReview, id, idField, rating}, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const {handleSheetPositionChange} = useBottomSheetBackHandler(
      bottomSheetModalRef,
      index => {
        index === -1 && dispatch(setOpen(true));
      },
    );
    const snapPoints = useMemo(() => ['100%'], []);
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.user.data?.id);

    useImperativeHandle(ref, () => ({
      open() {
        bottomSheetModalRef.current?.present();
      },
    }));

    const publishReviewHandler = async (vote: number, comment: string) => {
      if (!userId) {
        return;
      }

      await dispatch(
        createReview({
          comment: comment.trim(),
          vote,
          userId,
          [idField]: id,
        }) as any,
      );
      await dispatch(
        getReviews({
          where: {[idField]: id},
          orderBy: {
            createdAt: 'desc',
          },
        }) as any,
      );

      bottomSheetModalRef.current?.close();
    };

    const insets = useSafeAreaInsets();
    const {colors} = useTheme();
    const scrollRef = useRef<BottomSheetScrollViewMethods>(null);

    useEffect(() => {
      //show keyboard
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => setTimeout(() => scrollRef.current?.scrollToEnd(), 0),
      );
      //hide keyboard
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => setTimeout(() => scrollRef.current?.scrollTo(0), 0),
      );
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, [scrollRef]);

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onChange={handleSheetPositionChange}
        handleIndicatorStyle={styles.drag}
        backgroundStyle={{backgroundColor: colors.bgSecondary}}>
        <BottomSheetScrollView
          keyboardShouldPersistTaps="handled"
          ref={scrollRef}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingVertical: Platform.OS === 'ios' ? insets.top : 12,
            }}>
            <View>
              <BoldText fontSize={18} style={{textAlign: 'center'}}>
                Оценить
              </BoldText>

              <View style={styles.movieInfo}>
                <Image
                  source={{
                    uri: imageUrl,
                  }}
                  style={[styles.poster, {backgroundColor: colors.fillPrimary}]}
                />
                <View>
                  {rating && rating > 0 && (
                    <View style={{alignSelf: 'flex-start'}}>
                      <Rating isStar rating={rating} />
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'flex-end',
                      maxWidth: width - 160,
                    }}>
                    <BoldText fontSize={18} style={{marginRight: 6}}>
                      {name}
                    </BoldText>
                    {year && (
                      <MediumText
                        style={{
                          paddingVertical: 2,
                          color: colors.secondaryGray,
                          fontSize: 13,
                        }}>
                        {year}
                      </MediumText>
                    )}
                  </View>
                </View>
              </View>
            </View>

            <View style={{flex: 1, marginTop: 24}}>
              <BoldText fontSize={18}>Как Вам фильм?</BoldText>
              <RankComponent
                publishReviewHandler={publishReviewHandler}
                activeReview={activeReview}
              />
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
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
    width: 32,
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
    backgroundColor: colors.borderGray,
  },
});
