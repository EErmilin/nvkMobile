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
import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getReviews} from '../../redux/thunks/screens/getReviews/GetReviews';

export const CartoonScreen: FC<RootNavigationProps<'Cartoon'>> = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const routes = useRoute();
  const bottomSheetRef = React.useRef();
  //   const {reviewSheet} = useSelector(state => state.bottomSheet);
  const {cartoon, season, episode} = routes.params;

  const dispatch = useAppDispatch();
  const reviews = useAppSelector(state => state.screens.reviews ?? []);
  React.useEffect(() => {
    dispatch(
      getReviews({
        where: {animationId: cartoon?.id},
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  }, []);

  // console.log(url);
  const openModal = () => {
    bottomSheetRef?.current?.open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet name={'cartoon'} ref={bottomSheetRef} />
      <ScrollView>
        {!!episode?.media ? (
          <VideoPlayer urls={{url: episode?.media?.indexM3u8Url, hls: []}} />
        ) : (
          <ActivityIndicator color={colors.colorMain} size={'large'} />
        )}
        <Containter style={{gap: 25}}>
          <Animated.View style={{gap: 10}}>
            <Animated.View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Animated.View
                style={{gap: 5, flexDirection: 'row', alignItems: 'center'}}>
                <BoldText fontSize={18}>{cartoon.name}</BoldText>
                <RegularText style={{color: colors.textSecondary}}>
                  {`${cartoon.age}+`}
                </RegularText>
              </Animated.View>
              <TouchableOpacity>
                <Animated.View style={styles.circle}>
                  <HeartIcon color={colors.white} />
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <MediumText>{`${season.number} сезон. ${episode.number} серия`}</MediumText>

            <Animated.View
              style={{gap: 10, flexDirection: 'row', alignItems: 'center'}}>
              <ClockIcon color={colors.colorMain} />
              <RegularText>{`${cartoon.duration} минут`}</RegularText>
              <RegularText style={{color: colors.colorMain}}>/</RegularText>
              <RegularText>{cartoon.genre}</RegularText>
            </Animated.View>
            <Animated.View>
              <RegularText style={{color: colors.textSecondary}}>
                {cartoon.date} / {cartoon.country} / {cartoon.views}
              </RegularText>
            </Animated.View>
          </Animated.View>
          {/* <Animated.View style={{flexDirection: 'row', gap: 15}}>
            <TouchableOpacity style={styles.btn}>
              <MediumText style={styles.textColor}>Смотреть</MediumText>
              <MediumText style={styles.textColor} fontSize={12}>
                За {item.price} p
              </MediumText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                styles.btnOutlined,
                {flexDirection: 'row', gap: 8},
              ]}>
              <MediumText style={styles.textColorOutlined}>
                Просмотрен
              </MediumText>
              <ViewedIcon color={colors.colorMain} />
            </TouchableOpacity>
          </Animated.View> */}
          <Animated.View
            style={{
              borderBottomColor: colors.borderPrimary,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Animated.View style={{gap: 20}}>
            <BoldText fontSize={16}>О мультсериале</BoldText>
            <MediumText>{cartoon.content}</MediumText>
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
                {cartoon.language}
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
          <Animated.View style={styles.box}>
            <Animated.View style={styles.flexBetween}>
              <Animated.View style={{flexDirection: 'row', gap: 15}}>
                <Animated.View style={styles.rating}>
                  <BoldText style={{color: colors.white}} fontSize={16}>
                    {cartoon.ratingKinopoisk.toString()}
                  </BoldText>
                </Animated.View>
                <Animated.View>
                  <BoldText>Рейтинг НБК</BoldText>
                  <RegularText fontSize={12}>
                    {reviews.length} отзывов
                  </RegularText>
                </Animated.View>
              </Animated.View>
              <TouchableOpacity
                style={[styles.smallBtn, styles.btnOutlined]}
                onPress={openModal}>
                <RegularText>Оценить</RegularText>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
          <Animated.View style={styles.flexBetween}>
            <BoldText fontSize={16}>Отзывы</BoldText>
            <Animated.View
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <BoldText fontSize={16}>{reviews.length.toString()}</BoldText>
              <ArrowRight
                onPress={() =>
                  navigation.navigate('Reviews', {
                    id: cartoon.id,
                    name: cartoon.name,
                    year: cartoon.date,
                    imageUrl: cartoon.cover?.url,
                    userVote: reviews,
                    idField: 'animationId',
                  })
                }
              />
            </Animated.View>
          </Animated.View>
          <ScrollView horizontal>
            <Animated.View style={{flexDirection: 'row', gap: 16}}>
              {reviews.length ? (
                reviews.map(item => <Review key={item.id} item={item} />)
              ) : (
                <ActivityIndicator color={colors.colorMain} size={'large'} />
              )}
            </Animated.View>
          </ScrollView>
          <TouchableOpacity
            style={[styles.smallBtn, {borderRadius: 42}]}
            onPress={() =>
              navigation.navigate('Reviews', {
                id: cartoon.id,
                name: cartoon.name,
                year: cartoon.date,
                imageUrl: cartoon.cover?.url,
                userVote: reviews,
                idField: 'animationId',
              })
            }>
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
