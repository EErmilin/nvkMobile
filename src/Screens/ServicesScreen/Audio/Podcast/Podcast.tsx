import * as React from 'react';
import {
  FlatList,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import {useTheme} from '../../../../Styles/Styles';
import {RootNavigationProps} from '../../../../navigation/types/RootStackTypes';
import {StyleSheet, View} from 'react-native';
import {SearchComponent} from '../../../../components/SearchComponent';
import BoldText from '../../../../components/BoldText';
import {Containter} from '../../../../components/Container';
import {AlbumItem} from '../../../../components/AlbumItem';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {getPodcasts} from '../../../../redux/thunks/screens/podcasts/GetPodcasts';
import ContentLoader, {Rect} from 'react-content-loader/native';
import Toast from 'react-native-toast-message';
import {getUpdateClient} from '../../../../requests/updateHeaders';
import {MusicItem} from '../../../../components/MusicItem';
import {Track} from 'react-native-track-player';
import {IPodcastData, ISongPodcast} from '../../../../models/Music';
import {PODCAST_SEARCH} from '../../../../gql/query/podcast/Podcast';

const HorizontalSkeleton: React.FC<{type: 'first' | 'album'}> = props => {
  const {type} = props;
  const {colors} = useTheme();
  const screenWidth = useWindowDimensions().width;
  const length = Math.ceil((screenWidth - 30) / (140 + 10));
  return (
    <ContentLoader
      backgroundColor={colors.skeletonBg}
      foregroundColor={colors.skeletonFg}
      width={(150 * length).toString()}
      height={'174'}>
      {Array(length)
        .fill(0)
        .map((item, index) => (
          <>
            <Rect
              key={index.toString() + 'image_' + type}
              x={(150 * index).toString()}
              y="0"
              rx={'20'}
              ry={'20'}
              width={'140'}
              height={'140'}
            />
            <Rect
              key={index.toString() + 'text'}
              x={(150 * index).toString()}
              y={'150'}
              rx={'8'}
              ry={'8'}
              width={'140'}
              height={'24'}
            />
          </>
        ))}
    </ContentLoader>
  );
};

export const Podcast: React.FC<RootNavigationProps<'Podcast'>> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  const screenWidth = useWindowDimensions().width;
  const podcastsRedux = useAppSelector(state => state.screens.podcasts);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [podcastsSearch, setPodcastsSearch] = React.useState<Track[] | []>([]);

  const update = React.useCallback(async () => {
    await dispatch(getPodcasts({take: 8}));
  }, [dispatch]);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await update();
      } catch (e) {
        Toast.show({type: 'success', text1: 'Что-то пошло не так'});
      } finally {
        setLoading(false);
      }
    })();
  }, [update]);

  React.useEffect(() => {
    search.length
      ? (async () => {
          try {
            setSearchLoading(true);
            const client = await getUpdateClient();
            const resSearch = await client.query({
              query: PODCAST_SEARCH,
              variables: {
                search: search,
              },
            });
            setPodcastsSearch(
              resSearch.data.searchPodcasts
                ?.filter((item: ISongPodcast) => Boolean(item.url))
                ?.map((item2: ISongPodcast) => {
                  return {
                    id: item2.id,
                    url: item2.url,
                    title: item2.title,
                    artist: item2.podcastAlbum?.name,
                    artwork: item2.artwork?.url_512,
                    type: item2?.media ? 'hls' : 'default',
                  };
                }) ?? [],
            );
          } catch (e) {
            console.log(JSON.stringify(e, null, 2));
          } finally {
            setSearchLoading(false);
          }
        })()
      : setPodcastsSearch([]);
  }, [search]);

  const renderPodcastAlbums = ({item}: {item: IPodcastData}) => {
    if (item.podcastAlbums?.length) {
      return (
        <>
          <Containter style={styles.textContainer}>
            <BoldText fontSize={16}>{item.name}</BoldText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AllAlbumPodcast', {id: item.id});
              }}>
              <BoldText style={{color: colors.colorMain, fontWeight: '600'}}>
                Все
              </BoldText>
            </TouchableOpacity>
          </Containter>
          <FlatList
            data={item.podcastAlbums}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.albumStyle}
            contentContainerStyle={styles.albumContainer}
            keyExtractor={(_item, _index) => _index.toString()}
            ListEmptyComponent={
              loading ? <HorizontalSkeleton type="first" /> : <></>
            }
            renderItem={({item: itemRender}) => (
              <AlbumItem
                onPress={() => {
                  navigation.navigate('AlbumList', {
                    album: itemRender,
                    type: 'podcast',
                  });
                }}
                item={itemRender}
              />
            )}
          />
        </>
      );
    }
    return <></>;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.bgSecondary}}
      keyboardShouldPersistTaps={'always'}
      refreshControl={
        <RefreshControl
          colors={[colors.colorMain]}
          tintColor={colors.colorMain}
          refreshing={loading}
          onRefresh={async () => {
            try {
              setLoading(true);
              await update();
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          }}
        />
      }>
      <SearchComponent
        style={styles.search}
        value={search}
        containerStyle={{backgroundColor: colors.fillPrimary}}
        onChangeText={value => setSearch(value)}
        placeholder={'Поиск по названию'}
      />
      {search ? (
        <>
          <View style={styles.musicContainer}>
            {podcastsSearch.length
              ? podcastsSearch.map((item, index) => {
                  return (
                    <MusicItem
                      key={index}
                      album={podcastsSearch}
                      navigation={navigation}
                      item={item}
                      index={index}
                      albumID={'search'}
                      type={'podcast'}
                    />
                  );
                })
              : searchLoading && (
                  <ContentLoader
                    width={screenWidth.toString()}
                    height={3 * 70}
                    backgroundColor={colors.skeletonBg}
                    foregroundColor={colors.skeletonFg}>
                    {Array(3)
                      .fill(0)
                      .map((item, index) => (
                        <>
                          <Rect
                            key={index.toString() + 'image_music'}
                            width={'60'}
                            height={'60'}
                            rx={'10'}
                            ry={'10'}
                            x="15"
                            y={(70 * index).toString()}
                          />
                          <Rect
                            key={index.toString() + 'title_music'}
                            width={(screenWidth - 144).toString()}
                            height={'24'}
                            rx={'8'}
                            ry="8"
                            x={'90'}
                            y={(70 * index + 4.5).toString()}
                          />
                          <Rect
                            key={index.toString() + 'author_music'}
                            width={(screenWidth - 144).toString()}
                            height={'24'}
                            rx={'8'}
                            ry="8"
                            x={'90'}
                            y={(70 * index + 33).toString()}
                          />
                          <Rect
                            key={index.toString() + 'like_music'}
                            width={'24'}
                            height={'24'}
                            rx="4"
                            ry="4"
                            x={screenWidth - 15 - 24}
                            y={(70 * index + 18).toString()}
                          />
                        </>
                      ))}
                  </ContentLoader>
                )}
          </View>
        </>
      ) : (
        <View>
          {podcastsRedux.map(item => renderPodcastAlbums({item: item}))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    height: 110,
    marginBottom: 5,
    borderRadius: 15,
  },
  search: {
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  albumStyle: {
    flex: 1,
    marginBottom: 40,
  },
  albumContainer: {
    paddingHorizontal: 15,
    gap: 15,
  },
  musicContainer: {
    paddingBottom: 40,
  },
});
