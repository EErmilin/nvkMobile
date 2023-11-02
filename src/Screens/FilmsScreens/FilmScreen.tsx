import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import {FC} from 'react';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {BoldText, Containter, RegularText, VideoPlayer} from '../../components';
import {colors, useTheme} from '../../Styles/Styles';
import {HeartIcon} from '../../components/SVGcomponents/HeartIcon';
import {ClockIcon} from '../../components/SVGcomponents/ClockIcon';
import {ViewedIcon} from '../../components/SVGcomponents/ViewedIcon';
// import WebView from 'react-native-webview';
import {ArrowRight} from '../../components/SVGcomponents';
import {Review} from '../../components/Review';
import Animated from 'react-native-reanimated';
import MediumText from '../../components/MediumText';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '../../components/BottomSheet';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getFilm } from '../../redux/thunks/screens/getFilms/GetFilms';
import Toast from 'react-native-toast-message';

//mock data

export const FilmScreen: FC<RootNavigationProps<'Film'>> = ({route}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const filmRedux = useAppSelector(state => state.screens.movie);
  const [isLoading, setIsLoading] = React.useState(false);
  console.log('props')
  console.log(filmRedux)

  const bottomSheetRef = React.useRef();
  //
  const openModal = () => {
    bottomSheetRef?.current?.open();
  };


  const update = React.useCallback(async () => {
    try {
      setIsLoading(true);
    const response =  await dispatch(getFilm({movieId:route.params.id }));
    } catch (e) {
      Toast.show({type: 'error', text1: 'Что-то пошло не так'});
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  React.useEffect(() => {
    (async () => {
      await update();
    })();
  }, [update]);
  
  if(!filmRedux)return

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet name={'film'} ref={bottomSheetRef} />
      <ScrollView>
        {filmRedux ? (
          <VideoPlayer urls={{url: filmRedux?.media.indexM3u8Url, hls: []}} />
        ) : (
          <ActivityIndicator color={colors.colorMain} size={'large'} />
        )}

        <Containter style={{gap: 25}}>
          <Animated.View style={{gap: 10}}>
            <Animated.View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Animated.View
                style={{gap: 5, flexDirection: 'row', alignItems: 'center'}}>
                <BoldText fontSize={18}>{filmRedux?.name}</BoldText>
                <RegularText style={{color: colors.textSecondary}}>
                  {filmRedux?.age}
                </RegularText>
              </Animated.View>
              <TouchableOpacity>
                <Animated.View style={styles.circle}>
                  <HeartIcon color={colors.white} />
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={{gap: 10, flexDirection: 'row', alignItems: 'center'}}>
              <ClockIcon color={colors.colorMain} />
              <RegularText>{filmRedux?.duration}</RegularText>
              <RegularText style={{color: colors.colorMain}}>/</RegularText>
              <RegularText>{filmRedux?.genre}</RegularText>
            </Animated.View>
            <Animated.View>
              <RegularText style={{color: colors.textSecondary}}>
                {filmRedux?.date} / {filmRedux?.country} / {filmRedux?.views}
              </RegularText>
            </Animated.View>
          </Animated.View>
          <Animated.View style={{flexDirection: 'row', gap: 15}}>
 {/*           <TouchableOpacity style={styles.btn}>
              <MediumText style={styles.textColor}>Смотреть</MediumText>
              <MediumText style={styles.textColor} fontSize={12}>
                За {filmRedux.price} p
              </MediumText>
        </TouchableOpacity> */}
{/*            <TouchableOpacity
              style={[
                styles.btn,
                styles.btnOutlined,
                {flexDirection: 'row', gap: 8},
              ]}>
              <MediumText style={styles.textColorOutlined}>
                Просмотрен
              </MediumText>
              <ViewedIcon color={colors.colorMain} />
            </TouchableOpacity> */}
          </Animated.View>
          <Animated.View
            style={{
              borderBottomColor: colors.borderPrimary,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Animated.View style={{gap: 20}}>
            <BoldText fontSize={16}>О фильме</BoldText>
            <MediumText>{filmRedux.content}</MediumText>
          </Animated.View>
         {/*  <Animated.View>
            <BoldText fontSize={16}>Трейлер</BoldText>
            {/*<WebView*/}
            {/*    style={{flex: 1}}*/}
            {/*    javaScriptEnabled={true}*/}
            {/*    source={{uri: 'https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0&autoplay=0&showinfo=0&controls=0'}}*/}
            {/*    // style={{ marginTop: 20, width: 320, height: 230 }}*/}
            {/*    // javaScriptEnabled={true}*/}
            {/*    // domStorageEnabled={true}*/}
            {/*    // source={{ uri: "https://www.youtube.com/embed/-ZZPOXn6_9w" }}*/}
            {/*/>
          </Animated.View></ScrollView>*/}
          <Animated.View>
            <BoldText fontSize={16}>{filmRedux.name}</BoldText>
            <MediumText>{filmRedux.date}</MediumText>
          </Animated.View>
          <Animated.View style={styles.flexBetween}>
            <MediumText>Языки</MediumText>
            <TouchableOpacity style={styles.smallBtn}>
              <MediumText style={styles.textColor}>{filmRedux.language}</MediumText>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              borderBottomColor: colors.borderGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
{/*          <Animated.View style={styles.flexBetween}>
            <MediumText>Субтитры</MediumText>
            <TouchableOpacity style={styles.smallBtn}>
              <MediumText style={styles.textColor}>Русские</MediumText>
            </TouchableOpacity>
          </Animated.View>*/}
          <Animated.View style={{gap: 10}}>
            <Animated.View style={styles.box}>
              <Animated.View style={styles.flexBetween}>
                <Animated.View style={{flexDirection: 'row', gap: 15}}>
                  <Animated.View style={styles.rating}>
                    <BoldText style={{color: colors.white}} fontSize={16}>
                      {//filmRedux.rating_kinopoisk.toString()
                      }
                    </BoldText>
                  </Animated.View>
                  <Animated.View>
                    <BoldText>Рейтинг Кинопоиск</BoldText>
                    <RegularText fontSize={12}>
                      {filmRedux.reviews_kinopoisk} отзывов
                    </RegularText>
                  </Animated.View>
                </Animated.View>
                <ArrowRight color={colors.colorMain} />
              </Animated.View>
            </Animated.View>
            <Animated.View style={styles.box}>
              <Animated.View style={styles.flexBetween}>
                <Animated.View style={{flexDirection: 'row', gap: 15}}>
                  <Animated.View style={styles.rating}>
                    <BoldText style={{color: colors.white}} fontSize={16}>
                      {//item.rating_nbk.toString()
                      }
                    </BoldText>
                  </Animated.View>
                  <Animated.View>
                    <BoldText>Рейтинг НБК</BoldText>
                    <RegularText fontSize={12}>
                      {//item.reviews_kinopoisk
                      } отзывов
                    </RegularText>
                  </Animated.View>
                </Animated.View>
                <TouchableOpacity
                  onPress={openModal}
                  style={[styles.smallBtn, styles.btnOutlined]}>
                  <RegularText>Оценить</RegularText>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </Animated.View>
          <Animated.View style={styles.flexBetween}>
            <BoldText fontSize={16}>Отзывы</BoldText>
            <Animated.View
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <BoldText fontSize={16}>
                {//item.reviews_nbk.toString()
                }</BoldText>
              <ArrowRight
                onPress={() =>
                  navigation.navigate('Reviews', {name: filmRedux.name})
                }
              />
            </Animated.View>
          </Animated.View>
          <ScrollView horizontal>
            <Animated.View style={{flexDirection: 'row', gap: 16}}>
              {filmRedux.reviews?.length ? (
                filmRedux.reviews.map(item => <Review key={item.id} item={item} />)
              ) : (
                <ActivityIndicator color={colors.colorMain} size={'large'} />
              )}
            </Animated.View>
          </ScrollView>
          <TouchableOpacity
            style={[styles.smallBtn, {borderRadius: 42}]}
            onPress={() => navigation.navigate('Reviews', {name: filmRedux.name})}>
            <MediumText style={styles.textColor}>
              Прочитать все отзывы
            </MediumText>
          </TouchableOpacity>
        </Containter>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexGrow: 1,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 16,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOutlined: {
    backgroundColor: colors.white,
    borderStyle: 'solid',
    borderColor: colors.orange,
    borderWidth: 1,
  },
  smallBtn: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: colors.orange,
  },
  textColor: {
    color: colors.white,
  },
  textColorOutlined: {
    color: colors.orange,
  },
  box: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 15,
  },
  rating: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
