import React from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {colors, useTheme} from '../../Styles/Styles';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {FC, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {BoldText, Containter, SearchComponent} from '../../components';
import {FilterIcon} from '../../components/SVGcomponents/FilterIcon';
import {ArrowsIcon} from '../../components/SVGcomponents/ArrowsIcon';
import {ArrowDownIcon} from '../../components/SVGcomponents/ArrowDownIcon';
import ContentLoader from 'react-content-loader';
import {Rect} from 'react-native-svg';
import {LayoutVideoItem} from '../../components/LayoutVideoItem';
import SortDropDown from '../../components/SortDropDown';
import {getCartoons} from '../../redux/thunks/screens/cartoons/GetCartoons';

interface Props {
  id: number;
  name: string;
  price: number | null;
  rating: number;
}

export const CartoonsScreen: FC<RootNavigationProps<'Cartoons'>> = ({
  navigation,
}) => {
  const screenWidth = useWindowDimensions().width;
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const length = Math.ceil((screenWidth - 30) / (140 + 10));
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [sortOption, setSortOption] = useState('По просмотрам');

  const cartoons = useAppSelector(state => state.screens.cartoons);

  const update = React.useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(getCartoons({take: 10, orderBy: {date: 'desc'}}));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  const showSortModalHandle = () => {
    setSortVisible(prevState => !prevState);
  };

  React.useEffect(() => {
    (async () => {
      await update();
    })();
  }, [update]);

  // const getCartoons = () => {
  //   // dispatch()
  // };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setIsLoading(true);
  //       await getCartoons();
  //     } catch (e) {
  //       Toast.show({type: 'error', text1: 'Что-то пошло не так'});
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, []);

  if (cartoons.length === 0) {
    return <ActivityIndicator />;
  }

  console.log(cartoons);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.bgSecondary}}
      keyboardShouldPersistTaps={'always'}
      refreshControl={
        <RefreshControl
          colors={[colors.colorMain]}
          tintColor={colors.colorMain}
          refreshing={isLoading}
          onRefresh={async () => {
            try {
              setIsLoading(true);
              await update();
            } catch (e) {
              console.log(e);
            } finally {
              setIsLoading(false);
            }
          }}
        />
      }>
      <SearchComponent
        style={styles.search}
        value={search}
        containerStyle={{backgroundColor: colors.fillPrimary}}
        onChangeText={setSearch}
        placeholder={'Поиск по названию'}
      />
      <Containter style={styles.textContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Filter', {
              type: 'ANIMATION',
            })
          }>
          <View style={styles.btn}>
            <FilterIcon color={colors.colorMain} />
            <BoldText fontSize={16}>Фильтры</BoldText>
          </View>
        </TouchableOpacity>
        <View style={{position: 'relative'}}>
          <TouchableOpacity onPress={showSortModalHandle}>
            <View style={styles.btn}>
              <ArrowsIcon color={colors.colorMain} />
              <BoldText fontSize={16}>{sortOption}</BoldText>
              <ArrowDownIcon color={colors.colorMain} />
            </View>
          </TouchableOpacity>
          {sortVisible ? (
            <SortDropDown
              sortOption={sortOption}
              setSortOption={setSortOption}
              setSortVisible={setSortVisible}
            />
          ) : null}
        </View>
      </Containter>
      <ScrollView>
        {cartoons.length > 0 && (
          <FlatList
            data={cartoons}
            style={styles.items}
            contentContainerStyle={styles.itemContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CartoonSeasons', {
                    id: item?.id,
                    title: item?.name,
                    content: item?.content,
                  })
                }>
                <LayoutVideoItem item={item} height={144} heightImage={110} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              isLoading ? (
                <ContentLoader
                  width={screenWidth.toString()}
                  height={'114'}
                  backgroundColor={colors.skeletonBg}
                  foregroundColor={colors.skeletonFg}>
                  {Array(Math.ceil(90 * length))
                    .fill(0)
                    .map((item, index) => (
                      <>
                        <Rect
                          key={index.toString() + 'image_artist'}
                          width={'80'}
                          height={'80'}
                          x={(90 * index).toString()}
                          y="0"
                          rx={'40'}
                          ry={'40'}
                        />
                        <Rect
                          key={index.toString() + 'text_artist'}
                          width={'80'}
                          height={'24'}
                          x={(90 * index).toString()}
                          y="90"
                          rx="8"
                          ry="8"
                        />
                      </>
                    ))}
                </ContentLoader>
              ) : (
                <BoldText>Не найдено</BoldText>
              )
            }
          />
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  btn: {
    flexDirection: 'row',
    gap: 15,
  },
  search: {
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  items: {
    flex: 1,
    marginBottom: 20,
  },
  itemContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
  },
});
