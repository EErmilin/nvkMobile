import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import BoldText from '../../../../components/BoldText';
import {ArrowLeft} from '../../../../components/SVGcomponents/ArrowLeft';

import {RootNavigationProps} from '../../../../navigation/types/RootStackTypes';
import {
  StyleSheet,
  useWindowDimensions,
  Platform,
  NativeModules,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetModal, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useTheme} from '../../../../Styles/Styles';
import {ISong, ISongType, ISongPodcast} from '../../../../models/Music';
import {MusicItem} from '../../../../components/MusicItem';
import MediumText from '../../../../components/MediumText';
import {
  // Heart,
  PauseCircle,
  PlayCircle,
} from '../../../../components/SVGcomponents';
import TrackPlayer, {
  Track,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import {treckCountPural} from '../../../../helpers/audioHelpers';
import {
  AlBUM_SONGS,
  PLAYLIST_SONGS,
  ARTIST_SONGS,
} from '../../../../gql/query/music/Music';
import {MusicPlayerContext} from '../../../../contexts/musicContext';
import {getUpdateClient} from '../../../../requests/updateHeaders';
import {PODCAST_ALBUM} from '../../../../gql/query/podcast/Podcast';
import {MusicTrackView} from '../../../../navigation/screens/TabBar/MusicTrackView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const AlbumList: React.FC<RootNavigationProps<'AlbumList'>> = ({
  route,
  navigation,
}) => {
  const {album, type} = route.params;
  const {StatusBarManager} = NativeModules;
  const dimention = useWindowDimensions();
  const {colors} = useTheme();
  const [musics, setMusics] = React.useState<Track[] | null>(null);
  // const [like, setLike] = React.useState(false);
  // const [count, setCount] = React.useState(0);
  const musicContext = React.useContext(MusicPlayerContext);
  const [loading, setLoading] = React.useState(false);
  const {bottom} = useSafeAreaInsets();

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const client = await getUpdateClient();
        const response = await client.query({
          query:
            type === 'album'
              ? AlBUM_SONGS
              : type === 'playlist'
              ? PLAYLIST_SONGS
              : type === 'artist'
              ? ARTIST_SONGS
              : PODCAST_ALBUM,
          variables: {
            id: album.id,
          },
        });
        switch (type) {
          case 'album':
            // setCount(response.data.album._count.songs);
            setMusics(
              response.data.album.songs
                ?.filter((item2: ISong) => Boolean(item2.url))
                ?.map((item: ISong) => {
                  return {
                    id: item.id,
                    url: item.url,
                    title: item.title,
                    artist: item.artist?.name,
                    artwork: item.artwork?.url_256,
                    type: item?.media ? 'hls' : 'default',
                  };
                }),
            );
            break;
          case 'playlist':
            // setCount(response.data.playlist._count.songs);
            setMusics(
              response.data.playlist.songs
                ?.filter((item2: {song: ISong}) => Boolean(item2.song.url))
                ?.map((item: {song: ISong}) => {
                  return {
                    id: item.song.id,
                    url: item.song.url,
                    title: item.song.title,
                    artist: item.song.artist?.name,
                    artwork: item.song.artwork?.url_256,
                    type: item.song?.media ? 'hls' : 'default',
                  };
                }),
            );
            break;
          case 'artist':
            // setCount(response.data.artist.songs.length);
            setMusics(
              response.data.artist.songs
                ?.filter((item2: ISong) => Boolean(item2.url))
                ?.map((item: ISong) => {
                  return {
                    id: item.id,
                    url: item.url,
                    title: item.title,
                    artist: item.artist?.name,
                    artwork: item.artwork?.url_256,
                    type: item?.media ? 'hls' : 'default',
                  };
                }),
            );
            break;
          case 'podcast':
            // setCount(response.data.podcastAlbum.podcastEpisode.length);
            setMusics(
              response.data.podcastAlbum.podcastEpisode
                ?.filter((item2: ISongPodcast) => Boolean(item2.url))
                ?.map((item: ISongPodcast) => {
                  return {
                    id: item.id,
                    url: item.url,
                    title: item.title,
                    artist: item.podcastAlbum?.name,
                    artwork: item.artwork?.url_256,
                    type: item?.media ? 'hls' : 'default',
                  };
                }),
            );
            break;
          default:
            null;
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [album.id, type]);

  const EmptyComponent = React.useCallback(
    () =>
      loading ? (
        <ActivityIndicator size={'small'} color={colors.colorMain} />
      ) : (
        <MediumText style={{color: colors.textSecondary, textAlign: 'center'}}>
          Нет треков
        </MediumText>
      ),
    [colors.colorMain, colors.textSecondary, loading],
  );

  return (
    <View style={{flex: 1, backgroundColor: colors.blackText}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <ImageBackground
          style={[
            styles.backgroundImage,
            {width: dimention.width, height: dimention.height},
          ]}
          blurRadius={5}
          source={{uri: album.cover?.url_512}}
        />
        <StatusBar
          backgroundColor={colors.blackText}
          barStyle={'light-content'}
        />
        <View
          style={[
            styles.header,
            {
              marginTop:
                Platform.OS === 'android' ? 5 : StatusBarManager.HEIGHT,
            },
          ]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerBackButton}>
            <ArrowLeft color={colors.orange} />
            <BoldText
              fontSize={16}
              style={[styles.headerTitile, {color: colors.white}]}>
              {type === 'fairytale' || type === 'olonho' || type === 'podcast'
                ? 'Подкасты'
                : 'Музыка'}
            </BoldText>
          </TouchableOpacity>
        </View>
        <Image
          style={[
            styles.albumImage,
            {
              backgroundColor: colors.greyProgram,
              borderRadius: type === 'artist' ? 170 / 2 : 20,
            },
          ]}
          source={{uri: album.cover?.url_512 ?? undefined}}
        />
        <View>
          <BoldText
            fontSize={20}
            style={[styles.albumName, {color: colors.white}]}>
            {album.name}
          </BoldText>
          <MediumText style={[styles.artistName, {color: colors.gray}]}>
            {`${type === 'album' ? album.artist?.name + ' · ' : ''}${
              musics?.length
                ? musics?.length + ' ' + treckCountPural(musics?.length)
                : ''
            }`}
          </MediumText>
          <View style={styles.buttonActionContainder}>
            <PlayButton
              albumID={album.id}
              type={type}
              onPress={() => {
                musics?.length &&
                  navigation.navigate('MusicPlayer', {
                    album: musics,
                    music: musics[0],
                    index: 0,
                    albumID: album.id,
                    type: type,
                  });
              }}
            />
            {/* <LikeButton onPress={() => setLike(!like)} like={like} /> */}
          </View>
        </View>
        <BottomSheetModal
          backgroundStyle={[
            styles.handle,
            {backgroundColor: colors.fillPrimary},
          ]}
          handleIndicatorStyle={{backgroundColor: colors.textSecondary}}
          snapPoints={[
            dimention.height - 400 - StatusBarManager.HEIGHT,
            Platform.OS === 'ios' ? '88%' : '92%',
          ]}
          index={0}>
          <BottomSheetFlatList
            data={musics}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.musicListContainer,
              {
                paddingBottom: musicContext.musicPlayerOption.music
                  ? 40 + bottom + 56
                  : 40,
              },
            ]}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={EmptyComponent}
            renderItem={({item, index}) => (
              <MusicItem
                album={musics ?? []}
                navigation={navigation}
                item={item}
                index={index}
                albumID={album.id}
                type={type}
              />
            )}
          />
        </BottomSheetModal>
        <View
          style={{
            paddingBottom: bottom,
            backgroundColor: colors.background,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <MusicTrackView />
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

// const LikeButton = ({onPress, like}: {onPress: () => void; like: boolean}) => {
//   const {colors} = useTheme();
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={[styles.buttonLike, {backgroundColor: colors.orange}]}>
//       <Heart inColor={like ? '#FFF' : 'none'} />
//     </TouchableOpacity>
//   );
// };

const PlayButton = ({
  onPress,
  albumID,
  type,
}: {
  onPress: () => void;
  albumID: number | 'alltrack' | 'favorite';
  type: ISongType;
}) => {
  const {colors} = useTheme();
  const playbackState = usePlaybackState();
  const musicContext = React.useContext(MusicPlayerContext);
  if (
    musicContext.musicPlayerOption.albumID === albumID &&
    musicContext.musicPlayerOption.type === type
  ) {
    return playbackState.state === State.Playing ? (
      <TouchableOpacity
        onPress={async () => await TrackPlayer.pause()}
        style={[styles.buttonPlay, {backgroundColor: colors.orange}]}>
        <PauseCircle size={24} color={colors.white} fillOpacity={1} />
        <BoldText style={[styles.buttonText, {color: colors.white}]}>
          Пауза
        </BoldText>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={async () => await TrackPlayer.play()}
        style={[styles.buttonPlay, {backgroundColor: colors.orange}]}>
        <PlayCircle size={24} color={colors.white} fillOpacity={1} />
        <BoldText style={[styles.buttonText, {color: colors.white}]}>
          Слушать
        </BoldText>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.buttonPlay, {backgroundColor: colors.orange}]}>
        <PlayCircle size={24} color={colors.white} fillOpacity={1} />
        <BoldText style={[styles.buttonText, {color: colors.white}]}>
          Слушать
        </BoldText>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    height: 46,
    backgroundColor: 'transparent',
    paddingLeft: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundImage: {
    top: -85,
    position: 'absolute',
  },
  headerBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitile: {
    fontWeight: '700',
    marginLeft: 15,
    marginBottom: 2,
  },
  albumImage: {
    width: 170,
    height: 170,
    alignSelf: 'center',
    marginTop: 20,
  },
  albumName: {
    textAlign: 'center',
    marginTop: 15,
    marginHorizontal: 15,
  },
  artistName: {
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 0 : 5,
  },
  buttonActionContainder: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonPlay: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 20,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    fontWeight: '600',
    marginBottom: Platform.OS === 'android' ? 3 : 0,
  },
  buttonLike: {
    height: 40,
    width: 40,
    marginLeft: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicListContainer: {
    paddingBottom: 40,
    paddingTop: 10,
  },
  handle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
