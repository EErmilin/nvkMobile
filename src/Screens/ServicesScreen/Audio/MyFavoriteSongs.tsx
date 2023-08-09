import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import BoldText from '../../../components/BoldText';
import {ArrowLeft} from '../../../components/SVGcomponents/ArrowLeft';

import {RootNavigationProps} from '../../../navigation/types/RootStackTypes';
import {
  StyleSheet,
  useWindowDimensions,
  Platform,
  NativeModules,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetModal, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useTheme} from '../../../Styles/Styles';
import {MusicItem} from '../../../components/MusicItem';
import MediumText from '../../../components/MediumText';
import {PauseCircle, PlayCircle} from '../../../components/SVGcomponents';
import TrackPlayer, {
  Track,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import {treckCountPural} from '../../../helpers/audioHelpers';
import {MusicPlayerContext} from '../../../contexts/musicContext';
import {useAppSelector, useAppDispatch} from '../../../redux/hooks';
import {fetchFavorite} from '../../../redux/thunks/favorite/GetFavorites';
import {ISongType} from '../../../models/Music';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MusicTrackView} from '../../../navigation/screens/TabBar/MusicTrackView';

export const MyFavoriteSongs: React.FC<
  RootNavigationProps<'MyFavoriteSongs'>
> = ({route, navigation}) => {
  const {type} = route.params;
  const {StatusBarManager} = NativeModules;
  const dimention = useWindowDimensions();
  const {bottom} = useSafeAreaInsets();
  const {colors} = useTheme();
  const [musics, setMusics] = React.useState<Track[] | null>(null);
  const [count, setCount] = React.useState(0);
  const favoritesMusic = useAppSelector(
    state => state.favorite.favorites,
  ).filter(favorite => favorite.song !== null && Boolean(favorite.song.url));
  const favoritesPodcast = useAppSelector(
    state => state.favorite.favorites,
  ).filter(
    favorite =>
      favorite.podcastEpisode !== null && Boolean(favorite.podcastEpisode.url),
  );
  const musicContext = React.useContext(MusicPlayerContext);
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);

  React.useEffect(() => {
    dispatch(fetchFavorite(token));
    switch (type) {
      case 'music':
        const favoriteFilterMusic = favoritesMusic.filter(item =>
          Boolean(item.song?.url),
        );
        setMusics(
          favoriteFilterMusic.length
            ? favoriteFilterMusic?.map(favorite => {
                return {
                  id: favorite.song?.id ?? 0,
                  url: favorite.song?.url ?? '',
                  title: favorite.song?.title,
                  artist: favorite.song?.artist?.name,
                  artwork: favorite.song?.artwork?.url_512,
                  type: favorite.song?.media ? 'hls' : 'default',
                } as Track;
              })
            : null,
        );
        setCount(favoriteFilterMusic?.length ? favoriteFilterMusic.length : 0);
        break;
      case 'podcast':
        const favoriteFilterPodcast = favoritesPodcast.filter(item =>
          Boolean(item.podcastEpisode?.url),
        );
        setMusics(
          favoriteFilterPodcast.length
            ? favoriteFilterPodcast?.map(favorite => {
                return {
                  id: favorite.podcastEpisode?.id ?? 0,
                  url: favorite.podcastEpisode?.url ?? '',
                  title: favorite.podcastEpisode?.title,
                  artist: favorite.podcastEpisode?.podcastAlbum?.name,
                  artwork: favorite.podcastEpisode?.artwork?.url_512,
                  type: favorite.podcastEpisode?.media ? 'hls' : 'default',
                } as Track;
              })
            : null,
        );
        setCount(
          favoriteFilterPodcast?.length ? favoriteFilterPodcast.length : 0,
        );
        break;
      default:
        setMusics(null);
        setCount(0);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.blackText}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <ImageBackground
          style={[styles.backgroundImage, {width: dimention.width}]}
          blurRadius={10}
          source={
            type === 'music'
              ? require('../../../assets/images/myMusicLogo.png')
              : require('../../../assets/images/myPodcastLogo.png')
          }
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
              {type === 'music' ? 'Музыка' : 'Подкасты'}
            </BoldText>
          </TouchableOpacity>
        </View>
        <Image
          style={[styles.albumImage]}
          source={
            type === 'music'
              ? require('../../../assets/images/myMusicLogo.png')
              : require('../../../assets/images/myPodcastLogo.png')
          }
        />
        <View>
          <BoldText
            fontSize={20}
            style={[styles.albumName, {color: colors.white}]}>
            {type === 'music' ? 'Мой плейлист' : 'Мои подкасты'}
          </BoldText>
          <MediumText style={[styles.artistName, {color: colors.gray}]}>
            {`${count ? count + ' ' + treckCountPural(count) : ''}`}
          </MediumText>
          <View style={styles.buttonActionContainder}>
            <PlayButton
              type={type === 'music' ? 'playlist' : 'podcast'}
              albumID={'favorite'}
              onPress={() => {
                musics?.length &&
                  navigation.navigate('MusicPlayer', {
                    album: musics,
                    music: musics![0],
                    index: 0,
                    albumID: 'favorite',
                    type: type === 'music' ? 'playlist' : 'podcast',
                  });
              }}
            />
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
            ListEmptyComponent={
              <MediumText
                style={{textAlign: 'center', color: colors.textSecondary}}>
                {type === 'music'
                  ? 'У вас нет избранной музыки'
                  : 'У вас нет избранных подкастов'}
              </MediumText>
            }
            renderItem={({item, index}) => (
              <MusicItem
                album={musics ?? []}
                navigation={navigation}
                item={item}
                index={index}
                albumID={'favorite'}
                type={type === 'music' ? 'playlist' : 'podcast'}
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
    height: 600,
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
