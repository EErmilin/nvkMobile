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
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {colors} from '../Styles/Styles';
import BoldText from './BoldText';
import {Rating} from './Rating';
import RankComponent from './RankComponent';

import {Button} from './Button';
import {useDispatch} from 'react-redux';
import {setOpen} from '../redux/slices/bottomSheetSlice';
import MediumText from './MediumText';

const {width, height} = Dimensions.get('window');

const rankNumber = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export type BottomSheetHandle = {
  open: () => void;
};

interface IProps {
  name: string;
  rankItem?: number | undefined;
  activeItem?: number | undefined;
}

const BottomSheet = forwardRef(({name, rankItem, activeItem}: IProps, ref) => {
  //state
  const modalRef = useRef<() => void | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const translateYR = useSharedValue(0);
  const dispatch = useDispatch();

  useImperativeHandle<unknown, BottomSheetHandle>(ref, () => ({
    open: () => {
      dispatch(setOpen(false));
      translateYR.value = withTiming(translateYR.value - height, {
        duration: 600,
      });
    },
  }));

  const publishReviewHandler = () => {
    if (ref) {
      dispatch(setOpen(true));
      translateYR.value = withTiming(translateYR.value + height, {
        duration: 600,
      });
    }
  };

  useEffect(() => {
    if (ref) {
      dispatch(setOpen(true));
    }
  }, [ref, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setOpen(true));
      setRank(null);
      setActiveIndex(null);
    };
  }, [dispatch]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: translateYR}],
        },
      ]}
      ref={modalRef}>
      <View>
        <View style={styles.drag} />
        <BoldText fontSize={18} style={{textAlign: 'center'}}>
          Оценить
        </BoldText>
        <View style={styles.movieInfo}>
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

          {name === 'cartoon' && (
            <Image
              source={{
                uri: 'https://kartinkof.club/uploads/posts/2022-09/1662203681_1-kartinkof-club-p-novie-i-krasivie-kartinki-masha-i-medved-1.jpg',
              }}
              style={styles.poster}
            />
          )}
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

        <View style={{width: '100%', marginTop: 15}}>
          <BoldText fontSize={18}>Как Вам фильм?</BoldText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {rankNumber &&
              rankNumber.map((item, index) => {
                return (
                  <RankComponent
                    item={item}
                    index={index}
                    activeIndex={activeIndex}
                    key={index}
                    rankItem={rankItem}
                    activeItem={activeItem}
                    setActiveIndex={setActiveIndex}
                    setRank={setRank}
                  />
                );
              })}
          </ScrollView>
          <View style={{marginTop: 20}}>
            <TextInput
              multiline
              style={[
                styles.inputText,
                // {
                //   backgroundColor: colors.input,
                //   borderColor: textError
                //     ? colors.danger
                //     : textFocused
                //     ? colors.colorMain
                //     : colors.borderPrimary,
                //   color: colors.textPrimary,
                // },
              ]}
              placeholder="Ваш комментарий"
            />
          </View>
        </View>
      </View>

      <Button title="Опубликовать" onPress={publishReviewHandler} />
    </Animated.View>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.white,
    alignItems: 'center',
    height,
    width,
    bottom: -height,
    zIndex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
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
  inputText: {
    minHeight: 100,
    borderRadius: 20,
    textAlignVertical: 'top',
    borderWidth: 1,
    padding: 16,
    paddingTop: 12,
    fontFamily: 'NotoSans-Regular',
    borderColor: colors.secondaryGray,
  },
});
