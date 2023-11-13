import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';
import RankComponent from '../../components/RankComponent';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors, useTheme} from '../../Styles/Styles';
import {BoldText, Containter, MediumText} from '../../components';
import {Review} from '../../components/Review';
import {StarIcon} from '../../components/SVGcomponents/StarIcon';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import BottomSheet from '../../components/BottomSheet';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {createReview} from '../../redux/thunks/review/CreateReview';
import {getReviews} from '../../redux/thunks/screens/getReviews/GetReviews';

//dummy data

const item = {
  name: 'name',
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
      rating_nbk: 2.5,
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

const rankNumber = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const ReviewsScreen: React.FC<RootNavigationProps<'ViewLive'>> = () => {
  // const {route, navigation} = props;
  // const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const id = route.params?.id!;
  const name = route.params?.name ?? '';
  const year = route.params?.year;
  const imageUrl = route.params?.imageUrl;
  const idField = route.params?.idField;

  const reviews = useAppSelector(state => state.screens.reviews ?? []);

  React.useEffect(() => {
    dispatch(
      getReviews({
        where: {[idField]: id},
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  }, []);

  const bottomSheetRef = React.useRef(null);

  const openModal = () => {
    bottomSheetRef?.current?.open();
  };

  const [activeReview, setActiveReview] = useState<number | null>(null);
  const [rankReview, setRankReview] = useState<number | null>(null);

  console.log(activeReview);

  const [isReviewedFilm] = useState(false);
  //component Unmount
  useEffect(() => {
    return () => {
      setActiveReview(null);
      setRankReview(null);
    };
  }, []);

  const onReview = async (comment: string, vote: number) => {
    console.log('CREATE REVIEW');
    const data = await dispatch(
      createReview({
        comment,
        vote,
        userId: 1,
        [idField]: id,
      }),
    );
    await dispatch(
      getReviews({
        where: {[idField]: id},
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        name={name}
        imageUrl={imageUrl}
        year={year}
        ref={bottomSheetRef}
        activeReview={activeReview}
        onReview={(comment, vote) => onReview(comment, vote)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Containter style={{gap: 25}}>
          {isReviewedFilm ? (
            <>
              {/*Отзыв пользователя*/}
              <BoldText fontSize={16}>Ваш отзыв</BoldText>
              <Review item={item.reviews[0]} cardWidth />
            </>
          ) : (
            <>
              {/* Титул */}
              <BoldText fontSize={16}>Как Вам фильм?</BoldText>
              {/* Оценка */}

              <RankComponent style setActiveReview={setActiveReview} />

              {/* Оставить отзыв */}
              <TouchableOpacity
                style={[
                  styles.btn,
                  styles.btnOutlined,
                  {flexDirection: 'row', gap: 8, paddingVertical: 16},
                ]}
                onPress={openModal}>
                <StarIcon color={colors.orange} size={20} />
                <MediumText style={{color: colors.blackText}}>
                  Оставить Отзыв
                </MediumText>
              </TouchableOpacity>
            </>
          )}
          <BoldText fontSize={16}>Отзывы пользователей</BoldText>
          {/* Reviews Cards */}
          <View style={{gap: 16}}>
            {reviews.length > 0 ? (
              reviews?.map(r => <Review key={r.id} item={r} cardWidth />)
            ) : (
              <ActivityIndicator color={colors.white} size={'large'} />
            )}
          </View>
        </Containter>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  rating: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
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
  textColorOutlined: {
    color: colors.orange,
  },
});
