import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';

import RankComponent from '../../components/RankComponent';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors, useTheme} from '../../Styles/Styles';

//components
import {BoldText, Containter, MediumText} from '../../components';
import {Review} from '../../components/Review';
import {StarIcon} from '../../components/SVGcomponents/StarIcon';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';

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

const ReviewsScreen: React.FC<RootNavigationProps<'ViewLive'>> = props => {
  const {route, navigation} = props;
  const {colors} = useTheme();
  //dummy
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const [isReviewedFilm, setIsReviewedFilm] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Containter style={{gap: 25}}>
          {isReviewedFilm ? (
            <>
              {/*ОТзыв пользователя*/}
              <BoldText fontSize={16}>Ваш отзыв</BoldText>
              <Review item={item.reviews[0]} cardWidth />
            </>
          ) : (
            <>
              {/* Титул */}
              <BoldText fontSize={16}>Как Вам фильм?</BoldText>
              {/* Оценка */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {rankNumber &&
                  rankNumber.map((itemNumber, index) => {
                    return (
                      <RankComponent
                        item={itemNumber}
                        index={index}
                        activeIndex={activeIndex}
                        key={index}
                        setActiveIndex={setActiveIndex}
                        setRank={setRank}
                        style
                      />
                    );
                  })}
              </ScrollView>
              {/* Оставить отзыв */}
              <TouchableOpacity
                style={[
                  styles.btn,
                  styles.btnOutlined,
                  {flexDirection: 'row', gap: 8, paddingVertical: 16},
                ]}>
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
            {item.reviews.length ? (
              item.reviews.map(r => (
                <Review key={r.id.toString()} item={r} cardWidth />
              ))
            ) : (
              <ActivityIndicator color={colors.colorMain} size={'large'} />
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
