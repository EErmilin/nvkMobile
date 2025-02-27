import * as React from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {useTheme} from '../../Styles/Styles';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {FC, useState} from 'react';
import Toast from 'react-native-toast-message';
import {BoldText, Containter, SearchComponent} from '../../components';
import {FilterIcon} from '../../components/SVGcomponents/FilterIcon';
import {ArrowsIcon} from '../../components/SVGcomponents/ArrowsIcon';
import {ArrowDownIcon} from '../../components/SVGcomponents/ArrowDownIcon';
import ContentLoader from 'react-content-loader';
import {Rect} from 'react-native-svg';
import {LayoutVideoItem} from '../../components/LayoutVideoItem';
import {getSeries} from '../../redux/thunks/screens/getSeries/GetSeries';
import SortDropDown, {sortOptions} from '../../components/SortDropDown';
import {useFilter} from '../../helpers/useFilter';
import {useOrderBy} from '../../helpers/useOrderBy';
import {setOrderBy} from '../../redux/slices/filterSlice';

interface Props {
  id: number;
  name: string;
  rating: number;
}

export const SeriesScreen: FC<RootNavigationProps<'Series'>> = ({
  navigation,
}) => {
  const screenWidth = useWindowDimensions().width;
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const serials = useAppSelector(state => state.screens.serials);

  const length = Math.ceil((screenWidth - 30) / (140 + 10));
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sortVisible, setSortVisible] = useState(false);

  const mainFilter = useFilter('SERIES');
  const [sortOption, orderBy] = useOrderBy('SERIES');

  const update = React.useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(
        getSeries({
          take: 10,
          search,
          orderBy,
          where: {
            mainFilter,
          },
        }),
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, search, mainFilter, orderBy]);

  const showSortModalHandle = () => {
    setSortVisible(prevState => !prevState);
  };

  React.useEffect(() => {
    (async () => {
      await update();
    })();
  }, [update]);

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
          onRefresh={update}
        />
      }>
      <SearchComponent
        style={styles.search}
        value={search}
        containerStyle={{backgroundColor: colors.fillPrimary}}
        onChangeText={setSearch}
        placeholder={'Поиск по названию'}
      />
      <Containter style={{zIndex: 1}}>
        <View style={styles.textContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Filter', {
                type: 'SERIES',
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
                <BoldText fontSize={16}>{sortOptions[sortOption]}</BoldText>
                <ArrowDownIcon color={colors.colorMain} />
              </View>
            </TouchableOpacity>
            {sortVisible ? (
              <SortDropDown
                sortOption={sortOption}
                setSortOption={orderBy =>
                  dispatch(
                    setOrderBy({
                      type: 'SERIES',
                      orderBy,
                    }),
                  )
                }
                setSortVisible={setSortVisible}
              />
            ) : null}
          </View>
        </View>
      </Containter>
      <ScrollView>
        {serials?.length === 0 && !isLoading && (
          <Containter>
            <BoldText>Не найдено</BoldText>
          </Containter>
        )}
        {serials?.length > 0 && (
          <FlatList
            data={serials}
            style={styles.items}
            contentContainerStyle={styles.itemContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AllSeries', {
                    id: item?.id,
                    title: item?.name,
                    content: item?.content,
                  })
                }>
                <LayoutVideoItem item={item} height={162} heightImage={110} />
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
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 200,
  },
  btn: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  search: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  items: {
    flex: 1,
    marginBottom: 20,
  },
  itemContainer: {
    paddingHorizontal: 15,
    gap: 15,
  },
});
// function setScreenSerials(): any {
//   throw new Error('Function not implemented.');
// }
