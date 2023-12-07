import * as React from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {BoldText, Containter} from '../../components';
import {useAppSelector} from '../../redux/hooks';
import {useTheme} from '../../Styles/Styles';
import {LayoutVideoItem} from '../../components/LayoutVideoItem';
import ContentLoader from 'react-content-loader';
import {Rect} from 'react-content-loader/native';
import {useQuery} from '@apollo/client';
import {GET_MOVIES} from '../../gql/query/films/films';

export const FavoriteMovie = props => {
  const {navigation} = props;
  const {colors} = useTheme();
  const userId = useAppSelector(state => state.user.data?.id);
  const screenWidth = useWindowDimensions().width;

  const {data, loading, refetch} = useQuery(GET_MOVIES, {
    variables: {
      skip: 0,
      take: 10000,
      where: {
        favorites: {
          some: {
            userId,
          },
        },
      },
    },
  });

  console.log(data);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

  const cartoons = data?.movies || [];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.bgSecondary, paddingVertical: 16}}>
      {cartoons.length === 0 && !loading && (
        <Containter>
          <BoldText>Не найдено</BoldText>
        </Containter>
      )}
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
                  cartoon: item,
                })
              }>
              <LayoutVideoItem item={item} height={144} heightImage={110} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            loading ? (
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
