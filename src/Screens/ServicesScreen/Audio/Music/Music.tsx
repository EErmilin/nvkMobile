import * as React from 'react';
import {
  FlatList,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Track} from 'react-native-track-player';
import {
  SearchComponent,
  BoldText,
  Containter,
  AlbumItem,
  MusicItem,
} from '../../../../components';
import {RootNavigationProps} from '../../../../navigation/types/RootStackTypes';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {useTheme} from '../../../../Styles/Styles';
import {getMusics} from '../../../../redux/thunks/screens/musics/GetMusics';
import Toast from 'react-native-toast-message';
import {getUpdateClient} from '../../../../requests/updateHeaders';
import {MUSIC_SEARCH} from '../../../../gql/query/music/Music';
import {ISong} from '../../../../models/Music';

const TAKE = 8;
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

export const Music: React.FC<RootNavigationProps<'Music'>> = ({navigation}) => {
  const screenWidth = useWindowDimensions().width;
  const {colors} = useTheme();
  const user = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  const musicsRedux = useAppSelector(state => state.screens.musics);
  const length = Math.ceil((screenWidth - 30) / (140 + 10));
  const [loading, setLoading] = React.useState(false);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [musicsSearch, setMusicsSearch] = React.useState<Track[] | []>([]);

  const update = React.useCallback(async () => {
    await dispatch(getMusics({take: TAKE}));
  }, [dispatch]);

  // React.useEffect(() => {
  //   update();
  // }, [update]);

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
              query: MUSIC_SEARCH,
              variables: {search: search},
            });
            setMusicsSearch(
              resSearch.data.searchMusics.songs
                ?.filter((item2: ISong) => Boolean(item2.url))
                ?.map((item2: ISong) => {
                  return {
                    id: item2.id,
                    url: item2.url,
                    title: item2.title,
                    artist: item2.artist?.name,
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
      : setMusicsSearch([]);
  }, [search]);

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
            {musicsSearch.length
              ? musicsSearch.map((item, index) => {
                  return (
                    <MusicItem
                      key={index}
                      album={musicsSearch}
                      navigation={navigation}
                      item={item}
                      index={index}
                      albumID={'search'}
                      type={'playlist'}
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
          <Containter style={styles.textContainer}>
            <BoldText fontSize={16}>Сборник</BoldText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AllAlbum', {type: 'playlist'});
              }}>
              <BoldText style={{color: colors.colorMain, fontWeight: '600'}}>
                Все
              </BoldText>
            </TouchableOpacity>
          </Containter>
          {musicsRedux?.playlists?.length || user || loading ? (
            <FlatList
              data={musicsRedux?.playlists}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.albumStyle}
              contentContainerStyle={styles.albumContainer}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={
                user ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MyFavoriteSongs', {type: 'music'});
                    }}
                    style={[{width: 140}]}>
                    <Image
                      style={{height: 140, width: 140, borderRadius: 20}}
                      source={require('../../../../assets/images/myMusicLogo.png')}
                    />
                    <BoldText numberOfLines={2} style={[{marginTop: 5}]}>
                      Мой плейлист
                    </BoldText>
                  </TouchableOpacity>
                ) : null
              }
              ListEmptyComponent={
                loading ? <HorizontalSkeleton type="first" /> : <></>
              }
              renderItem={({item}) => (
                <AlbumItem
                  onPress={() => {
                    navigation.navigate('AlbumList', {
                      album: item,
                      type: 'playlist',
                    });
                  }}
                  item={item}
                />
              )}
            />
          ) : (
            <></>
          )}
          {musicsRedux?.albums?.length || loading ? (
            <>
              <Containter style={styles.textContainer}>
                <BoldText fontSize={16}>Популярные альбомы</BoldText>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AllAlbum', {type: 'album'});
                  }}>
                  <BoldText
                    style={{color: colors.colorMain, fontWeight: '600'}}>
                    Все
                  </BoldText>
                </TouchableOpacity>
              </Containter>
              <FlatList
                data={musicsRedux?.albums}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.albumStyle}
                contentContainerStyle={styles.albumContainer}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <AlbumItem
                    onPress={() => {
                      navigation.navigate('AlbumList', {
                        album: item,
                        type: 'album',
                      });
                    }}
                    item={item}
                  />
                )}
                ListEmptyComponent={
                  loading ? <HorizontalSkeleton type="album" /> : <></>
                }
              />
            </>
          ) : (
            <></>
          )}
          <Containter style={styles.textContainer}>
            <BoldText fontSize={16}>Популярные артисты</BoldText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AllAuthor');
              }}>
              <BoldText style={{color: colors.colorMain, fontWeight: '600'}}>
                Все
              </BoldText>
            </TouchableOpacity>
          </Containter>
          {musicsRedux?.artists?.length || loading ? (
            <FlatList
              data={musicsRedux?.artists}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.albumStyle}
              contentContainerStyle={styles.albumContainer}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <AlbumItem
                  type="artist"
                  onPress={() => {
                    navigation.navigate('AlbumList', {
                      album: item,
                      type: 'artist',
                    });
                  }}
                  item={item}
                />
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
                  <></>
                )
              }
            />
          ) : (
            <></>
          )}
          <Containter style={styles.textContainer}>
            <BoldText fontSize={16}>Новые треки</BoldText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AllMusic');
              }}>
              <BoldText style={{color: colors.colorMain, fontWeight: '600'}}>
                Все
              </BoldText>
            </TouchableOpacity>
          </Containter>
          <View style={styles.musicContainer}>
            {musicsRedux?.songs && musicsRedux.songs.length > 0 ? (
              musicsRedux.songs
                ?.filter(item2 => Boolean(item2.url))
                ?.map((item, index) => {
                  return (
                    <MusicItem
                      key={index}
                      album={
                        (musicsRedux.songs
                          ?.filter((item2: ISong) => Boolean(item2.url))
                          ?.map(item2 => {
                            return {
                              id: item2.id,
                              url: item2.url,
                              title: item2.title,
                              artist: item2.artist?.name,
                              artwork: item2.artwork?.url_512,
                              type: item2?.media ? 'hls' : 'default',
                            };
                          }) as Track[]) ?? []
                      }
                      navigation={navigation}
                      item={
                        {
                          id: item.id,
                          url: item.url,
                          title: item.title,
                          artist: item.artist?.name,
                          artwork: item.artwork?.url_512,
                          type: item?.media ? 'hls' : 'default',
                        } as Track
                      }
                      index={index}
                      albumID={'alltrack'}
                      type={'playlist'}
                    />
                  );
                })
            ) : loading ? (
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
            ) : (
              <></>
            )}
          </View>
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
