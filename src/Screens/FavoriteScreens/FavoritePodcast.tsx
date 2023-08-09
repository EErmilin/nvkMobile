import * as React from 'react';
import {
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {BoldText, MediumText, MusicItem, RegularText} from '../../components';
import {useAppSelector} from '../../redux/hooks';
import {useTheme} from '../../Styles/Styles';
import {useNavigation} from '@react-navigation/native';
import {MusicPlayerContext} from '../../contexts/musicContext';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
import {Track} from 'react-native-track-player';
import {PlayCircle} from '../../components/SVGcomponents';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const FavoritePodcast = () => {
  const favorites = useAppSelector(state => state.favorite.favorites).filter(
    favorite =>
      favorite.podcastEpisode !== null && Boolean(favorite.podcastEpisode?.url),
  );
  const {colors, theme} = useTheme();
  const navigation =
    useNavigation<TabNavigationProps<'Favorite'>['navigation']>();
  const musicContext = React.useContext(MusicPlayerContext);
  const insets = useSafeAreaInsets();

  const getPaddingBottom = () => {
    return musicContext.musicPlayerOption.music !== null
      ? 70 + 55 + insets.bottom
      : 70 + insets.bottom;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgSecondary,
        paddingBottom: getPaddingBottom(),
      }}>
      <FlatList
        data={favorites}
        keyExtractor={item => item!.podcastEpisode!.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <MusicItem
            key={item.id.toString()}
            item={
              {
                id: item.podcastEpisode!.id,
                url: item.podcastEpisode!.url,
                title: item.podcastEpisode?.title,
                artist: item.podcastEpisode?.podcastAlbum?.name,
                artwork: item.podcastEpisode?.artwork?.url_512,
                type: item.podcastEpisode?.media ? 'hls' : 'default',
              } as Track
            }
            navigation={navigation}
            index={index}
            album={favorites.map(favorite => {
              return {
                id: favorite.podcastEpisode!.id,
                url: favorite.podcastEpisode!.url,
                title: favorite.podcastEpisode?.title,
                artist: favorite.podcastEpisode?.podcastAlbum?.name,
                artwork: favorite.podcastEpisode?.artwork?.url_512,
                type: favorite.podcastEpisode?.media ? 'hls' : 'default',
              } as Track;
            })}
            albumID={0}
            type={'podcast'}
          />
        )}
        ListHeaderComponent={
          <View style={styles.headerView}>
            <Image
              source={require('../../assets/images/myPodcastLogo.png')}
              style={styles.image}
            />
            <BoldText fontSize={20} style={styles.textPodcast}>
              Мои подкасты
            </BoldText>
            <RegularText style={{color: colors.textSecondary, marginTop: 5}}>
              {favorites.length} подкаста
            </RegularText>
            {favorites.length > 0 ? (
              <TouchableOpacity
                style={[
                  styles.touchListen,
                  {
                    backgroundColor: colors.colorMain,
                  },
                ]}
                onPress={() => {
                  navigation.navigate('MusicPlayer', {
                    album: favorites.map(favorite => {
                      return {
                        id: favorite.podcastEpisode!.id,
                        url: favorite.podcastEpisode!.url,
                        title: favorite.podcastEpisode?.title,
                        artist: favorite.podcastEpisode?.podcastAlbum?.name,
                        artwork: favorite.podcastEpisode?.artwork?.url_512,
                        type: favorite.podcastEpisode?.media
                          ? 'hls'
                          : 'default',
                      } as Track;
                    }),
                    music: {
                      id: favorites[0].podcastEpisode?.id,
                      url: favorites[0].podcastEpisode!.url,
                      title: favorites[0].podcastEpisode?.title,
                      artist: favorites[0].podcastEpisode?.podcastAlbum?.name,
                      artwork: favorites[0].podcastEpisode?.artwork?.url_512,
                      type: favorites[0].podcastEpisode?.media
                        ? 'hls'
                        : 'default',
                    } as Track,
                    index: 0,
                    albumID: 0,
                    type: 'podcast',
                  });
                }}>
                <PlayCircle color={colors.white} fillOpacity={1} size={24} />
                <MediumText
                  style={{
                    paddingBottom: Platform.OS === 'android' ? 3 : 0,
                    color: theme === 'dark' ? colors.black : colors.white,
                    marginLeft: 8,
                  }}>
                  Слушать
                </MediumText>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        }
        ListEmptyComponent={
          <BoldText
            style={{
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: 50,
            }}>
            У вас нет избранных подкастов
          </BoldText>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  image: {
    borderRadius: 16,
  },
  textPodcast: {
    marginTop: 15,
    fontWeight: '800',
  },
  touchListen: {
    marginTop: 15,
    height: 40,
    borderRadius: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
