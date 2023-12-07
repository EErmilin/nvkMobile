import * as React from 'react';
import {
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {RootNavigationProps} from '../../../navigation/types/RootStackTypes';
import {StyleSheet} from 'react-native';
import {NativeModules} from 'react-native';
import {colors} from '../../../Styles/Styles';
import {ArrowLeft} from '../../../components/SVGcomponents/ArrowLeft';
import BoldText from '../../../components/BoldText';
import RegularText from '../../../components/RegularText';
import {Slider} from '@miblanchard/react-native-slider';
import {PlayCircle} from '../../../components/SVGcomponents/media/PlayCircle';
import {Heart} from '../../../components/SVGcomponents/Heart';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
  useActiveTrack,
} from 'react-native-track-player';
import {PauseCircle} from '../../../components/SVGcomponents/media/PauseCircle';
import dayjs from 'dayjs';
import {Swap} from '../../../components/SVGcomponents/media/Swap';
import {SkipLeft} from '../../../components/SVGcomponents/media/SkipLeft';
import {SkipRight} from '../../../components/SVGcomponents/media/SkipRight';
import {MusicPlayerContext} from '../../../contexts/musicContext';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {removeFavorite} from '../../../redux/thunks/favorite/RemoveFavorite';
import {createFavorite} from '../../../redux/thunks/favorite/CreateFavorite';
import {RepeatMode} from 'react-native-track-player';
import {SwapOne} from '../../../components/SVGcomponents/media/SwapOne';
import {setLogged} from '../../../redux/slices/authSlice';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import DeviceInfo from 'react-native-device-info';
import {ISongType} from '../../../models/Music';
import {useFavorite} from '../../../helpers/useFavorite';

export const MusicPlayer: React.FC<RootNavigationProps<'MusicPlayer'>> = ({
  route,
  navigation,
}) => {
  const {album, music, index, albumID, type} = route.params;
  const {StatusBarManager} = NativeModules;
  const musicContext = React.useContext(MusicPlayerContext);
  const user = useAppSelector(state => state.user.data);
  const activeTrack = useActiveTrack();
  const addMusic = async () => {
    try {
      const albumPlaying = await TrackPlayer.getQueue();
      const filter = album.filter(
        item => !albumPlaying.some(item2 => item2.id === item.id),
      );
      return filter;
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const trackPlayingIndex = await TrackPlayer.getActiveTrackIndex();
        if (
          typeof trackPlayingIndex === 'number' &&
          musicContext.musicPlayerOption.albumID === albumID &&
          musicContext.musicPlayerOption.type === type
        ) {
          const nextMusics = await addMusic();
          if (musicContext.musicPlayerOption?.music?.id === music.id) {
            nextMusics?.length && TrackPlayer.add(nextMusics);
            return;
          } else {
            if (nextMusics?.length) {
              await Promise.all([
                TrackPlayer.add(nextMusics),
                TrackPlayer.skip(index),
              ]);
            } else {
              await TrackPlayer.skip(index);
            }
            await TrackPlayer.play();
            return;
          }
        } else {
          musicContext.setMusicPlayerOption({
            ...musicContext.musicPlayerOption,
            albumID: albumID,
            type: type,
          });
          await Promise.all([
            TrackPlayer.setQueue(album ?? music),
            TrackPlayer.skip(index),
            TrackPlayer.play(),
          ]);
          AppMetrica.reportEvent('MUSIC_LISTEN', {
            user: user,
            music_value: album ?? music,
            date: new Date(),
            date_string: new Date().toString(),
            platform: Platform.OS,
            device_id: !user ? DeviceInfo.getDeviceId() : undefined,
            app_version: DeviceInfo.getVersion(),
          });
          return;
        }
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.blackText}
        barStyle={'light-content'}
      />
      <View
        style={[
          styles.header,
          {
            marginTop: Platform.OS === 'android' ? 5 : StatusBarManager.HEIGHT,
          },
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButtonContainer}>
          <ArrowLeft color={colors.orange} />
          <BoldText
            fontSize={16}
            style={[styles.headerText, {color: colors.white}]}>
            {type === 'olonho' || type === 'fairytale' || type === 'podcast'
              ? activeTrack?.title
              : 'Музыка'}
          </BoldText>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {activeTrack?.artwork ? (
          <View>
            <Image
              source={{
                uri:
                  typeof activeTrack?.artwork === 'string'
                    ? activeTrack?.artwork
                    : undefined,
              }}
              style={styles.image}
            />
            <Image
              source={{
                uri:
                  typeof activeTrack?.artwork === 'string'
                    ? activeTrack.artwork
                    : undefined,
              }}
              style={styles.backImageMidle}
            />
            <Image
              source={{
                uri:
                  typeof activeTrack?.artwork === 'string'
                    ? activeTrack.artwork
                    : undefined,
              }}
              style={styles.backImageJun}
            />
          </View>
        ) : (
          <View>
            <View
              style={[styles.image, {backgroundColor: colors.greyProgram}]}
            />
            <View
              style={[
                styles.backImageMidle,
                {backgroundColor: colors.greyProgram},
              ]}
            />
            <View
              style={[
                styles.backImageJun,
                {backgroundColor: colors.greyProgram},
              ]}
            />
          </View>
        )}
      </View>
      <BoldText fontSize={18} style={[styles.musicName, {color: colors.white}]}>
        {activeTrack?.title}
      </BoldText>
      <RegularText style={[styles.artinstName, {color: colors.iconGray}]}>
        {activeTrack?.artist}
      </RegularText>
      <View style={styles.controllContainer}>
        <ProgressBar />
        <ControlBar
          id={musicContext!.musicPlayerOption?.music?.id}
          type={type}
        />
      </View>
    </View>
  );
};

const ProgressBar = () => {
  const {position, buffered, duration} = useProgress();
  const dimention = Dimensions.get('window');
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setProgress(position);
  }, [position]);

  return (
    <View>
      <Slider
        value={progress}
        maximumValue={duration}
        thumbStyle={{height: 10, width: 10}}
        thumbTouchSize={{height: 30, width: 30}}
        thumbTintColor={colors.white}
        maximumTrackStyle={{opacity: 0.3}}
        trackStyle={{
          width: dimention.width - 30,
          backgroundColor: colors.white,
        }}
        maximumTrackTintColor={colors.white}
        minimumTrackTintColor={colors.white}
        onValueChange={value => {
          setProgress(Math.round(value[0]));
        }}
        onSlidingComplete={async value => {
          try {
            setProgress(Math.round(value[0]));
            await Promise.all([
              TrackPlayer.seekTo(Math.round(value[0])),
              TrackPlayer.play(),
            ]);
          } catch (e) {
            console.log(e);
          }
        }}
        onSlidingStart={async () => {
          await TrackPlayer.pause();
        }}
      />
      <Slider
        value={buffered}
        disabled
        maximumValue={duration}
        containerStyle={{position: 'absolute', zIndex: -1}}
        thumbStyle={{height: 0, width: 0}}
        minimumTrackStyle={{backgroundColor: colors.white, opacity: 0.3}}
        maximumTrackStyle={{backgroundColor: 'transparent'}}
        trackStyle={{
          width: dimention.width - 30,
          backgroundColor: colors.white,
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RegularText fontSize={13} style={{color: colors.white}}>
          {dayjs(0).hour(0).minute(0).second(progress).format('mm:ss')}
        </RegularText>
        <RegularText fontSize={13} style={{color: colors.white}}>
          {dayjs(0).hour(0).minute(0).second(duration).format('mm:ss')}
        </RegularText>
      </View>
    </View>
  );
};

const ControlBar = ({id, type}: {id?: number; type: ISongType}) => {
  const playbackState = usePlaybackState();
  const {position, duration} = useProgress();
  const [repMode, setRepMode] = React.useState<RepeatMode>();
  const {isFavorite, toggle} = useFavorite({songId: id});

  React.useEffect(() => {
    (async () => {
      let replayMode = await TrackPlayer.getRepeatMode();
      setRepMode(replayMode);
    })();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30,
        marginTop: 20,
      }}>
      <TouchableOpacity
        onPress={async () => {
          switch (repMode) {
            case 0:
              await TrackPlayer.setRepeatMode(2);
              setRepMode(2);
              break;
            case 2:
              await TrackPlayer.setRepeatMode(1);
              setRepMode(1);
              break;
            case 1:
              await TrackPlayer.setRepeatMode(0);
              setRepMode(0);
              break;
          }
        }}>
        {repMode === 2 ? (
          <Swap />
        ) : repMode === 1 ? (
          <SwapOne />
        ) : (
          <Swap color="#fff3" />
        )}
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={async () => {
            const queue = await TrackPlayer.getQueue();
            const trackIndex = await TrackPlayer.getActiveTrackIndex();
            if (trackIndex === 0) {
              await TrackPlayer.skip(queue.length - 1);
            } else {
              await TrackPlayer.skipToPrevious();
            }
          }}>
          <SkipLeft />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginHorizontal: 18}}
          onPress={async () => {
            const queue = await TrackPlayer.getQueue();
            const trackIndex = await TrackPlayer.getActiveTrackIndex();
            if (
              queue.length - 1 === trackIndex &&
              Math.round(position) === Math.round(duration)
            ) {
              playbackState.state === State.Playing
                ? await TrackPlayer.pause()
                : await Promise.all([
                    TrackPlayer.seekTo(0),
                    TrackPlayer.play(),
                  ]);
            } else {
              playbackState.state === State.Playing
                ? await TrackPlayer.pause()
                : await TrackPlayer.play();
            }
          }}>
          {playbackState.state === State.Playing ? (
            <PauseCircle size={70} fillOpacity={1} color={colors.orange} />
          ) : (
            <PlayCircle size={70} fillOpacity={1} color={colors.orange} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const queue = await TrackPlayer.getQueue();
            const trackIndex = await TrackPlayer.getActiveTrackIndex();
            if (queue.length - 1 === trackIndex) {
              await TrackPlayer.skip(0);
            } else {
              await TrackPlayer.skipToNext();
            }
          }}>
          <SkipRight />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={toggle}>
        <Heart
          size={24}
          color={colors.white}
          inColor={isFavorite ? colors.white : 'none'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A28',
  },
  header: {
    height: 46,
    backgroundColor: 'transparent',
    paddingLeft: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '700',
    marginLeft: 15,
    marginBottom: 2,
  },
  musicName: {
    textAlign: 'center',
    marginTop: 20,
  },
  artinstName: {
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 0 : 5,
  },
  imageContainer: {
    alignSelf: 'center',
    marginTop: 40,
  },
  image: {
    borderRadius: 20,
    height: 240,
    width: 240,
    backgroundColor: colors.gray,
  },
  backImageMidle: {
    borderRadius: 20,
    height: 220,
    width: 220,
    top: -8,
    left: 10,
    zIndex: -1,
    opacity: 0.6,
    position: 'absolute',
    backgroundColor: colors.gray,
  },
  backImageJun: {
    borderRadius: 20,
    height: 190,
    width: 190,
    top: -14,
    left: 25,
    zIndex: -1,
    opacity: 0.3,
    position: 'absolute',
    backgroundColor: colors.gray,
  },
  controllContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 55,
    paddingBottom: 100,
  },
});
