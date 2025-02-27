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
import Animated from 'react-native-reanimated';
import {HeartIcon} from '../../components/SVGcomponents/HeartIcon';
import {ClockIcon} from '../../components/SVGcomponents/ClockIcon';
import {ViewedIcon} from '../../components/SVGcomponents/ViewedIcon';
import WebView from 'react-native-webview';
import {ArrowRight} from '../../components/SVGcomponents';
import {Review} from '../../components/Review';
import MediumText from '../../components/MediumText';
import {useNavigation, useRoute} from '@react-navigation/native';
import BottomSheet from '../../components/BottomSheet';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getReviews} from '../../redux/thunks/screens/getReviews/GetReviews';
import {useMovieViewed} from '../../helpers/useMovieViewed';
import {createReview} from '../../redux/thunks/review/CreateReview';
import {useFavorite} from '../../helpers/useFavorite';
import {ReviewBottomSheet} from '../../components/ReviewBottomSheet';

//mock data
const data = [1];
const item = {
  name: 'name',
  season: 1,
  series: 1,
  age: '16+',
  time: '40 min',
  genre: 'comedy',
  year: 2022,
  country: 'russia',
  views: 231,
  price: 199,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus aspernatur consectetur distinctio, ducimus ipsa maxime molestiae nobis obcaecati quibusdam quod quos sint voluptatem. At harum id magni nemo quasi.',
  rating_kinopoisk: 6.6,
  rating_nbk: 8.6,
  reviews_kinopoisk: 112,
  reviews_nbk: 32,
  reviews: [
    {
      id: 1,
      author: 'author1',
      url: '',
      rating_nbk: 2.3,
      reviews_nbk:
        'psum dolor sit amet, consectetur adipisicing elit. Ab accusamus aspernatur consectetur distinctio, ducimus ipsa maxime molestiae nobis obcaecati quibusdam quod quos sint voluptatem. At harum id magni nemo quasi.',
      date: '31.11.22',
    },
    {
      id: 2,
      author: 'author2',
      url: '',
      rating_nbk: 6.3,
      reviews_nbk:
        'distinctio, ducimus ipsa maxime molestiae nobis obcaecati quibusdam quod quos sint voluptatem. At harum id magni nemo quasi.',
      date: '21.01.23',
    },
  ],
};

export const CurrentSeriesScreen: FC<
  RootNavigationProps<'CurrentSeries'>
> = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const bottomSheetRef = React.useRef(null);
  const routes = useRoute();
  const {serialData, url, content} = routes.params;
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(state => state.screens.reviews);

  const {isViewed, fetchViewed, markAsView} = useMovieViewed(
    serialData.series?.id,
    'SERIES',
  );

  React.useEffect(() => {
    dispatch(getReviews({where: {seriesId: serialData.series?.id}}));
    fetchViewed();
  }, []);

  const openModal = () => {
    bottomSheetRef?.current?.open();
  };

  const userId = useAppSelector(state => state.user.data?.id);
  const onReview = async (comment: string, vote: number) => {
    console.log('CREATE REVIEW');
    if (!userId) {
      return;
    }
    const data = await dispatch(
      createReview({
        comment,
        vote,
        userId: userId,
        seriesId: serialData.series?.id,
      }),
    );
    await dispatch(getReviews({where: {seriesId: serialData.series?.id}}));
  };
  const {isFavorite, toggle} = useFavorite({seriesId: serialData.series?.id});

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.bgSecondary}]}>
      <ReviewBottomSheet
        name={serialData.series?.name}
        imageUrl={serialData?.series?.image?.url}
        year={serialData?.series?.date}
        ref={bottomSheetRef}
        idField="seriesId"
        id={serialData.series?.id}
        rating={serialData.series?.ratingNvk}
      />
      <ScrollView>
        {data.length ? (
          <VideoPlayer
            urls={{
              url: url,
              hls: [],
            }}
          />
        ) : (
          <ActivityIndicator color={colors.colorMain} size={'large'} />
        )}
        <Containter style={{gap: 25}}>
          <Animated.View style={{gap: 10}}>
            <Animated.View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Animated.View
                style={{gap: 5, flexDirection: 'row', alignItems: 'center'}}>
                <BoldText fontSize={18}>{serialData?.series.name}</BoldText>
                <RegularText style={{color: colors.textSecondary}}>
                  {serialData?.series.age} +
                </RegularText>
              </Animated.View>
              <TouchableOpacity onPress={toggle}>
                <Animated.View
                  style={[
                    isFavorite ? styles.circle : styles.circleNotActive,
                    {
                      backgroundColor: isFavorite
                        ? styles.circle.backgroundColor
                        : colors.fillPrimary,
                    },
                  ]}>
                  <HeartIcon
                    color={isFavorite ? colors.white : colors.orange}
                  />
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <MediumText>{`${serialData.name} ${item.series} серия`}</MediumText>

            <Animated.View
              style={{gap: 10, flexDirection: 'row', alignItems: 'center'}}>
              <ClockIcon color={colors.colorMain} />
              <RegularText>{serialData?.series.duration} минут</RegularText>
              <RegularText style={{color: colors.colorMain}}>/</RegularText>
              <RegularText>{serialData?.series.genre}</RegularText>
            </Animated.View>
            <Animated.View>
              <RegularText style={{color: colors.textSecondary}}>
                {serialData?.series.date} / {serialData?.series.country} /{' '}
                {item.views}
              </RegularText>
            </Animated.View>
          </Animated.View>
          <Animated.View style={{flexDirection: 'row', gap: 15}}>
            {/* <TouchableOpacity style={styles.btn}>
              <MediumText style={styles.textColor}>Смотреть</MediumText>
              <MediumText style={styles.textColor} fontSize={12}>
                За {item.price} p
              </MediumText>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={markAsView}
              disabled={isViewed}
              style={[
                styles.btn,
                styles.btnOutlined,
                isViewed && styles.btnDisabled,
                {
                  flexDirection: 'row',
                  gap: 8,
                  backgroundColor: colors.bgPrimary,
                },
              ]}>
              <MediumText
                style={
                  isViewed ? styles.textColorDisabled : styles.textColorOutlined
                }>
                Просмотрен
              </MediumText>
              <ViewedIcon color={isViewed ? colors.gray : colors.colorMain} />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              borderBottomColor: colors.borderPrimary,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Animated.View style={{gap: 20}}>
            <BoldText fontSize={16}>О сериале</BoldText>
            <MediumText>{content}</MediumText>
          </Animated.View>
          <Animated.View>
            {/* <BoldText fontSize={16}>Трейлер</BoldText> */}
            {/*<WebView*/}
            {/*    style={{flex: 1}}*/}
            {/*    javaScriptEnabled={true}*/}
            {/*    source={{uri: 'https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0&autoplay=0&showinfo=0&controls=0'}}*/}
            {/*    // style={{ marginTop: 20, width: 320, height: 230 }}*/}
            {/*    // javaScriptEnabled={true}*/}
            {/*    // domStorageEnabled={true}*/}
            {/*    // source={{ uri: "https://www.youtube.com/embed/-ZZPOXn6_9w" }}*/}
            {/*/>*/}
          </Animated.View>
          {/* <Animated.View>
            <BoldText fontSize={16}>{item.name}</BoldText>
            <MediumText>1 february 2021</MediumText>
          </Animated.View> */}
          <Animated.View style={styles.flexBetween}>
            <MediumText>Языки</MediumText>
            <TouchableOpacity style={styles.smallBtn}>
              <MediumText style={styles.textColor}>
                {serialData?.series.language}
              </MediumText>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              borderBottomColor: colors.borderGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          {/* <Animated.View style={styles.flexBetween}>
            <MediumText>Субтитры</MediumText>
            <TouchableOpacity style={styles.smallBtn}>
              <MediumText style={styles.textColor}>Русские</MediumText>
            </TouchableOpacity>
          </Animated.View> */}
          <Animated.View style={{gap: 10}}>
            <Animated.View
              style={[styles.box, {backgroundColor: colors.bgPrimary}]}>
              <Animated.View style={styles.flexBetween}>
                <Animated.View style={{flexDirection: 'row', gap: 15}}>
                  <Animated.View style={styles.rating}>
                    <BoldText style={{color: colors.white}} fontSize={16}>
                      {serialData?.series?.ratingKinopoisk?.toFixed(1) ?? '-'}
                    </BoldText>
                  </Animated.View>
                  <Animated.View>
                    <BoldText>Рейтинг Кинопоиск</BoldText>
                    {/* <RegularText fontSize={12}>
                      {filmRedux.reviews_kinopoisk} отзывов
                    </RegularText> */}
                  </Animated.View>
                </Animated.View>
                <ArrowRight color={colors.colorMain} />
              </Animated.View>
            </Animated.View>
            <Animated.View
              style={[styles.box, {backgroundColor: colors.bgPrimary}]}>
              <Animated.View style={styles.flexBetween}>
                <Animated.View style={{flexDirection: 'row', gap: 15}}>
                  <Animated.View style={styles.rating}>
                    <BoldText style={{color: colors.white}} fontSize={16}>
                      {serialData?.series?.ratingNvk?.toFixed(1) ?? '-'}
                    </BoldText>
                  </Animated.View>
                  <Animated.View>
                    <BoldText>Рейтинг НВК</BoldText>
                    <RegularText fontSize={12}>
                      {reviews?.length ?? 0} отзывов
                    </RegularText>
                  </Animated.View>
                </Animated.View>
                <TouchableOpacity
                  style={[
                    styles.smallBtn,
                    styles.btnOutlined,
                    {backgroundColor: colors.bgPrimary},
                  ]}
                  onPress={openModal}>
                  <RegularText>Оценить</RegularText>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </Animated.View>

          <Animated.View style={styles.flexBetween}>
            <BoldText fontSize={16}>Отзывы</BoldText>
            <Animated.View
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <BoldText fontSize={16}>{reviews?.length ?? 0}</BoldText>
              <ArrowRight
                onPress={() =>
                  navigation.navigate('Reviews', {
                    id: serialData?.series?.id,
                    name: serialData?.series?.name,
                    year: serialData?.series?.date,
                    imageUrl: serialData?.series?.image?.url,
                    userVote: reviews,
                    idField: 'seriesId',
                  })
                }
              />
            </Animated.View>
          </Animated.View>
          <ScrollView horizontal>
            <Animated.View style={{flexDirection: 'row', gap: 16}}>
              {reviews?.length ? (
                reviews?.map(item => (
                  <Review key={item.id} item={item} numberOfLines={5} />
                ))
              ) : (
                <ActivityIndicator color={colors.colorMain} size={'large'} />
              )}
            </Animated.View>
          </ScrollView>
          <TouchableOpacity
            style={[styles.smallBtn, {borderRadius: 42}]}
            onPress={() => {
              navigation.navigate('Reviews', {
                id: serialData?.series?.id,
                name: serialData?.series?.name,
                year: serialData?.series?.date,
                imageUrl: serialData?.series?.image?.url,
                userVote: reviews,
                idField: 'seriesId',
              });
            }}>
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
  circleNotActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: colors.orange,
    borderWidth: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  btn: {
    flexGrow: 1,
    paddingVertical: 8,
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
  btnDisabled: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  smallBtn: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.orange,
  },
  textColor: {
    color: colors.white,
  },
  textColorOutlined: {
    color: colors.orange,
  },
  textColorDisabled: {
    color: colors.gray,
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
});
