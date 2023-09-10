import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Text,
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
import {useDispatch, useSelector} from 'react-redux';
import {setIsVisible} from '../redux/slices/bottomSheetSlice';
import MediumText from './MediumText';

const {width, height} = Dimensions.get('window');

const rankNumber = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const BottomSheet = forwardRef((_, ref) => {
  //state
  const [activeIndex, setActiveIndex] = useState(4);

  const showModalRef = useRef<any>(null);
  const translateYR = useSharedValue(0);
  const {isVisible} = useSelector(state => state.bottomSheet);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    show: () => {
      if (!isVisible) {
        translateYR.value = withTiming(translateYR.value - height, {
          duration: 400,
        });
        dispatch(setIsVisible(true));
      }
    },
  }));

  const publishReviewHandler = () => {
    if (isVisible) {
      translateYR.value = withTiming(translateYR.value + height, {
        duration: 400,
      });
      dispatch(setIsVisible(false));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setIsVisible(false));
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: translateYR}],
          height,
          width,
        },
      ]}
      ref={showModalRef}>
      <View style={styles.topInfo}>
        <View style={styles.drag} />
        <BoldText fontSize={18} style={{textAlign: 'center'}}>
          Оценить
        </BoldText>
        <View style={styles.movieInfo}>
          <Image
            source={{
              uri: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/6fa09de3-4afd-4155-a6b9-4149be130ccd/3840x',
            }}
            style={styles.poster}
          />
          <View>
            <View style={{alignSelf: 'flex-start'}}>
              <Rating isStar />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <BoldText fontSize={18}>Пугало</BoldText>
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
              // placeholderTextColor={colors.textSecondary}
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
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
    bottom: -height,
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  topInfo: {},
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
