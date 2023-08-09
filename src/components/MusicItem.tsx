import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import {ViewStyle, TextStyle} from 'react-native';
import BoldText from './BoldText';
import {PlayCircle} from './SVGcomponents/media/PlayCircle';
import {PauseCircle} from './SVGcomponents/media/PauseCircle';
import {MusicPlayerContext} from '../contexts/musicContext';
import {usePlaybackState, State, Track} from 'react-native-track-player';
import {Heart} from './SVGcomponents/Heart';
import {useTheme} from '../Styles/Styles';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {removeFavorite} from '../redux/thunks/favorite/RemoveFavorite';
import {createFavorite} from '../redux/thunks/favorite/CreateFavorite';
import {ISongType} from '../models/Music';
import {MusicNote} from './SVGcomponents/media/MusicNote';
import MediumText from './MediumText';
import {setLogged} from '../redux/slices/authSlice';

interface MusicItemProps {
  item: Track;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  navigation: any;
  index: number;
  album: Track[] | [];
  albumID: number | 'alltrack' | 'favorite' | 'search';
  type: ISongType;
}

export const MusicItem: React.FC<MusicItemProps> = ({
  item,
  style,
  textStyle,
  navigation,
  index,
  album,
  albumID,
  type,
  onPress,
}) => {
  const musicContext = React.useContext(MusicPlayerContext);
  const playbackState = usePlaybackState();
  const userToken = useAppSelector(state => state.auth.token);
  const theme = useTheme();
  const screenWidth = useWindowDimensions().width;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        onPress && onPress();
        navigation.navigate('MusicPlayer', {
          album: album,
          music: item,
          index: index,
          albumID: albumID,
          type: type,
        });
      }}
      style={[
        styles.container,
        {
          backgroundColor:
            musicContext.musicPlayerOption?.music?.id === item.id
              ? theme.colors.bgSecondary
              : 'transparent',
        },
        style,
      ]}>
      <View style={styles.musicContainer}>
        <View>
          {item.artwork ? (
            <Image
              style={[
                styles.image,
                {
                  backgroundColor:
                    theme.theme === 'light'
                      ? theme.colors.fillPrimary
                      : theme.colors.bgPrimary,
                },
              ]}
              source={{
                uri:
                  typeof item.artwork === 'string' ? item.artwork : undefined,
              }}
            />
          ) : (
            <View
              style={[
                styles.image,
                {
                  backgroundColor:
                    theme.theme === 'light'
                      ? theme.colors.fillPrimary
                      : theme.colors.bgPrimary,
                },
              ]}>
              <MusicNote color={theme.colors.textSecondary} />
            </View>
          )}
          {musicContext.musicPlayerOption?.music?.id === item.id ? (
            <View
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{translateX: -24 / 2}, {translateY: -24 / 2}],
              }}>
              {playbackState.state === State.Playing ? (
                <PauseCircle size={24} />
              ) : (
                <PlayCircle size={24} />
              )}
            </View>
          ) : (
            <></>
          )}
        </View>
        <View>
          <BoldText
            numberOfLines={1}
            style={[
              styles.text,
              {
                width: screenWidth - 139,
              },
              textStyle,
            ]}>
            {item.title}
          </BoldText>
          <MediumText
            numberOfLines={1}
            style={[
              styles.text,
              {
                color: theme.colors.textSecondary,
                width: screenWidth - 139,
              },
            ]}>
            {item.artist}
          </MediumText>
        </View>
      </View>
      {userToken && <LikeButton id={item.id} type={type} />}
    </TouchableOpacity>
  );
};

const LikeButton = (props: {id: number; type: ISongType}) => {
  const {id, type} = props;
  const {colors} = useTheme();
  const favorites = useFavoriteAudio(type);
  const dispatch = useAppDispatch();
  const [like, setLike] = React.useState(
    favorites
      .map(favorite =>
        type === 'podcast' || type === 'fairytale' || type === 'olonho'
          ? favorite.podcastEpisode?.id
          : favorite.song?.id,
      )
      .includes(id),
  );
  const [likeIsDisabled, setLikeIsDisabled] = React.useState(false);
  const token = useAppSelector(state => state.auth.token);
  React.useEffect(() => {
    setLike(
      favorites
        .map(favorite =>
          type === 'podcast' || type === 'fairytale' || type === 'olonho'
            ? favorite.podcastEpisode?.id
            : favorite.song?.id,
        )
        .includes(id),
    );
  }, [favorites, id, type]);

  return (
    <TouchableOpacity
      disabled={likeIsDisabled}
      style={styles.likeButtonContainer}
      onPress={async () => {
        if (token) {
          setLikeIsDisabled(true);
          if (like) {
            let idFavorite =
              type !== 'fairytale' && type !== 'olonho' && type !== 'podcast'
                ? favorites.find(favorite => favorite.song?.id === id)?.id
                : favorites.find(favorite => favorite.podcastEpisode?.id === id)
                    ?.id;
            if (idFavorite) {
              setLike(false);
              let response = await dispatch(removeFavorite(idFavorite));
              if (response.meta.requestStatus === 'rejected') {
                setLike(true);
              }
            }
            setLikeIsDisabled(false);
          } else {
            setLike(true);
            let response = await dispatch(
              createFavorite({
                songId:
                  type !== 'podcast' &&
                  type !== 'radio' &&
                  type !== 'fairytale' &&
                  type !== 'olonho'
                    ? id
                    : undefined,
                podcastEpisodeId:
                  type === 'fairytale' ||
                  type === 'olonho' ||
                  type === 'podcast'
                    ? id
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
        inColor={like ? colors.colorMain : 'none'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 15,
  },
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginLeft: 15,
  },
  likeButtonContainer: {
    height: 42,
    width: 48,
    borderRadius: 21,
    paddingRight: 15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

const useFavoriteAudio = (type: ISongType) => {
  const favorites = useAppSelector(state => state.favorite.favorites).filter(
    favorite =>
      type === 'podcast' || type === 'fairytale' || type === 'olonho'
        ? favorite.podcastEpisode !== null
        : favorite.song !== null,
  );
  React.useEffect(() => {
    favorites;
  }, [favorites, type]);
  return favorites;
};
