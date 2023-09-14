import {
  Button,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {colors, useTheme} from '../../Styles/Styles';
import {useAppDispatch} from '../../redux/hooks';
import {FC, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  BoldText,
  Containter,
  MediumText,
  SearchComponent,
} from '../../components';
import {FilterIcon} from '../../components/SVGcomponents/FilterIcon';
import {ArrowsIcon} from '../../components/SVGcomponents/ArrowsIcon';
import {ArrowDownIcon} from '../../components/SVGcomponents/ArrowDownIcon';
import ContentLoader from 'react-content-loader';
import {Rect} from 'react-native-svg';
import {LayoutVideoItem} from '../../components/LayoutVideoItem';

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
  //mock data
  const cartoons: Props[] = [
    {id: 1, name: 'cartoon1', price: 199, rating: 6.5},
    {id: 2, name: 'cartoon2', price: null, rating: 1.8},
  ];

  const getCartoons = () => {
    // dispatch()
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await getCartoons();
      } catch (e) {
        Toast.show({type: 'error', text1: 'Что-то пошло не так'});
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
              await getCartoons();
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
        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <View style={styles.btn}>
            <FilterIcon color={colors.colorMain} />
            <BoldText fontSize={16}>Фильтры</BoldText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.btn}>
            <ArrowsIcon color={colors.colorMain} />
            <BoldText fontSize={16}>По просмотру</BoldText>
            <ArrowDownIcon color={colors.colorMain} />
          </View>
        </TouchableOpacity>
      </Containter>
      <ScrollView>
        {cartoons.length && (
          <FlatList
            data={cartoons}
            style={styles.items}
            contentContainerStyle={styles.itemContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Cartoon', {
                    id: item.id,
                    title: item.name,
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
