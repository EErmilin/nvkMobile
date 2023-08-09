import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SkipRight} from '../../../components/SVGcomponents/media/SkipRight';
import {useTheme} from '../../../Styles/Styles';
import {
  Close,
  Heart,
  PauseCircle,
  PlayCircle,
} from '../../../components/SVGcomponents';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {MusicPlayerContext} from '../../../contexts/musicContext';
import {MediumText} from '../../../components';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {TrackSlider} from './TrackSlider';
import {createFavorite} from '../../../redux/thunks/favorite/CreateFavorite';
import {removeFavorite} from '../../../redux/thunks/favorite/RemoveFavorite';
import {useNavigation} from '@react-navigation/native';
import {setLogged} from '../../../redux/slices/authSlice';
import {TrackPlayerReset} from '../../../services/service';

interface IProps {
  insets?: number;
}

export const MusicTrackView = (props: IProps) => {
  const {insets} = props;
  const {colors} = useTheme();
  const token = useAppSelector(state1 => state1.auth.token);
  const favorites = useAppSelector(state1 => state1.favorite.favorites).filter(
    favorite => favorite.song !== null,
  );
  const musicContext = React.useContext(MusicPlayerContext);
  const [like, setLike] = React.useState(
    musicContext.musicPlayerOption.type === 'fairytale' ||
      musicContext.musicPlayerOption.type === 'olonho' ||
      musicContext.musicPlayerOption.type === 'podcast'
      ? favorites
          .map(favorite => favorite.podcastEpisode?.id)
          .includes(musicContext.musicPlayerOption.music?.id ?? 0)
      : favorites
          .map(favorite => favorite.song?.id)
          .includes(musicContext.musicPlayerOption.music?.id ?? 0),
  );
  const trackState = usePlaybackState();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const [likeIsDisabled, setLikeIsDisabled] = React.useState(false);
  const [end, setEnd] = React.useState(false);

  React.useEffect(() => {
    setLike(
      favorites
        .map(favorite => favorite.song?.id)
        .includes(musicContext.musicPlayerOption.music?.id),
    );
  }, [favorites, musicContext.musicPlayerOption.music?.id]);

  const checkEnded = React.useCallback(() => {
    if (trackState.state === State.Ended) {
      setEnd(true);
    }
  }, [trackState.state]);

  React.useEffect(() => {
    checkEnded();
  }, [checkEnded]);

  return musicContext.musicPlayerOption.music !== null ? (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.playerView,
        {
          borderBottomColor: colors.borderPrimary,
          backgroundColor: colors.fillPrimary,
          marginBottom: insets,
        },
      ]}
      onPress={async () => {
        if (musicContext.musicPlayerOption.type === 'radio') {
          navigation.navigate('RadioScreen');
        } else {
          let trackIndex = await TrackPlayer.getCurrentTrack();
          navigation.navigate('MusicPlayer', {
            ...musicContext.musicPlayerOption,
            index: trackIndex,
          });
        }
      }}>
      {musicContext.musicPlayerOption.type !== 'radio' ? (
        <TouchableOpacity
          style={styles.touchFavorite}
          disabled={likeIsDisabled}
          onPress={async () => {
            if (token) {
              setLikeIsDisabled(true);
              if (like) {
                setLike(false);
                const response = await dispatch(
                  removeFavorite(
                    favorites.filter(favorite =>
                      musicContext.musicPlayerOption.type === 'fairytale' ||
                      musicContext.musicPlayerOption.type === 'olonho' ||
                      musicContext.musicPlayerOption.type === 'podcast'
                        ? favorite.podcastEpisode?.id ===
                          musicContext.musicPlayerOption.music?.id
                        : favorite.song?.id ===
                          musicContext.musicPlayerOption.music?.id,
                    )[0].id,
                  ),
                );
                if (response.meta.requestStatus === 'rejected') {
                  setLike(true);
                }
                setLikeIsDisabled(false);
              } else {
                setLike(true);
                const response = await dispatch(
                  createFavorite({
                    songId:
                      musicContext.musicPlayerOption.type !== 'fairytale' &&
                      musicContext.musicPlayerOption.type !== 'olonho' &&
                      musicContext.musicPlayerOption.type !== 'podcast'
                        ? musicContext.musicPlayerOption.music?.id
                        : undefined,
                    podcastEpisodeId:
                      musicContext.musicPlayerOption.type === 'fairytale' ||
                      musicContext.musicPlayerOption.type === 'olonho' ||
                      musicContext.musicPlayerOption.type === 'podcast'
                        ? musicContext.musicPlayerOption.music?.id
                        : undefined,
                  }),
                );
                if (response.meta.requestStatus === 'rejected') {
                  setLike(false);
                }
                setLikeIsDisabled(false);
              }
            } else {
              dispatch(setLogged(false));
            }
          }}>
          <Heart
            color={colors.colorMain}
            inColor={like ? colors.colorMain : colors.fillPrimary}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <View
        style={{
          flex: 1,
          paddingHorizontal:
            musicContext.musicPlayerOption.type === 'radio' ? 15 : 0,
          marginRight: 7.5,
        }}>
        <MediumText numberOfLines={1}>
          {musicContext.musicPlayerOption.music?.title}
        </MediumText>

        <MediumText
          fontSize={12}
          style={{color: colors.textSecondary}}
          numberOfLines={1}>
          {musicContext.musicPlayerOption.music?.artist}
        </MediumText>
      </View>
      <TouchableOpacity
        style={{
          width: 36,
          height: 36,
          marginRight: 6,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          if (trackState.state === State.Playing) {
            TrackPlayer.pause();
          } else {
            if (trackState.state === State.Paused && end) {
              TrackPlayer.seekTo(0);
              TrackPlayer.play();
            } else {
              TrackPlayer.play();
              setEnd(false);
            }
          }
        }}>
        {trackState.state === State.Loading ? (
          <ActivityIndicator color={colors.white} size={'small'} />
        ) : trackState.state === State.Playing ? (
          <PauseCircle size={28} color={colors.colorMain} fillOpacity={1} />
        ) : (
          <PlayCircle size={28} color={colors.colorMain} fillOpacity={1} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 0,
          width: 36,
          height: 36,
          marginRight: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={async () => {
          if (
            trackState.state === State.Paused ||
            musicContext.musicPlayerOption.type === 'radio'
          ) {
            musicContext.setMusicPlayerOption({
              music: null,
              album: undefined,
              albumID: 0,
              type: undefined,
            });
            await TrackPlayerReset();
          } else {
            TrackPlayer.skipToNext();
          }
        }}>
        {trackState.state === State.Paused ||
        musicContext.musicPlayerOption.type === 'radio' ? (
          <Close size="24" color={colors.colorMain} />
        ) : (
          <SkipRight size={24} color={colors.colorMain} />
        )}
      </TouchableOpacity>
      <TrackSlider />
    </TouchableOpacity>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  playerView: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  touchFavorite: {
    marginRight: 12,
    width: 36,
    height: 36,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
