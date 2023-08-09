import * as React from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {BoldText, MediumText, MusicItem} from '../../components';
import {useTheme} from '../../Styles/Styles';
import {Play} from '../../components/SVGcomponents';
import {useAppSelector} from '../../redux/hooks';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
import {MusicPlayerContext} from '../../contexts/musicContext';
import {Track} from 'react-native-track-player';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const FavoriteMusic = (props: {
  navigation: TabNavigationProps<'Favorite'>['navigation'];
}) => {
  const {navigation} = props;
  const {colors} = useTheme();
  const favorites = useAppSelector(state => state.favorite.favorites).filter(
    favorite => favorite.song !== null && Boolean(favorite.song?.url),
  );
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
        contentContainerStyle={{flex: favorites.length === 0 ? 1 : 0}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <MusicItem
            key={item.id.toString()}
            item={
              {
                id: item.song?.id,
                url: item.song!.url,
                title: item.song?.title,
                artist: item.song?.artist?.name,
                artwork: item.song?.artwork?.url_512,
                type: item.song?.media ? 'hls' : 'default',
              } as Track
            }
            navigation={navigation}
            index={index}
            album={favorites.map(favorite => {
              return {
                id: favorite.song!.id,
                url: favorite.song!.url,
                title: favorite.song?.title,
                artist: favorite.song?.artist?.name,
                artwork: favorite.song?.artwork?.url_512,
                type: favorite.song?.media ? 'hls' : 'default',
              } as Track;
            })}
            albumID={0}
            type={'playlist'}
          />
        )}
        ListHeaderComponent={
          <View style={{alignItems: 'center', marginTop: 20, marginBottom: 30}}>
            <Image
              style={{
                borderRadius: 16,
              }}
              source={require('../../assets/images/myMusicLogo.png')}
            />
            <BoldText fontSize={20} style={{marginTop: 15, fontWeight: '700'}}>
              Мой плейлист
            </BoldText>
            <MediumText style={{marginTop: 5, color: colors.textSecondary}}>
              {favorites.length} трека
            </MediumText>
            {favorites.length > 0 ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 40,
                  borderRadius: 46,
                  backgroundColor: colors.colorMain,
                  paddingHorizontal: 20,
                  marginTop: 20,
                }}
                onPress={() => {
                  navigation.navigate('MusicPlayer', {
                    album: favorites.map(favorite => {
                      return {
                        id: favorite.song!.id,
                        url: favorite.song!.url,
                        title: favorite.song?.title,
                        artist: favorite.song?.artist?.name,
                        artwork: favorite.song?.artwork?.url_512,
                        type: favorite.song?.media ? 'hls' : 'default',
                      } as Track;
                    }),
                    music: {
                      id: favorites[0].song?.id,
                      url: favorites[0].song!.url,
                      title: favorites[0].song?.title,
                      artist: favorites[0].song?.artist?.name,
                      artwork: favorites[0].song?.artwork?.url_512,
                      type: favorites[0].song?.media ? 'hls' : 'default',
                    } as Track,
                    index: 0,
                    albumID: 0,
                    type: 'playlist',
                  });
                }}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: colors.white,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  <Play size={10} color={colors.colorMain} />
                </View>
                <MediumText style={{fontWeight: '600', color: colors.white}}>
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
              marginTop: 50,
              textAlign: 'center',
              color: colors.textSecondary,
            }}>
            У вас нет избранной музыки
          </BoldText>
        }
        ListFooterComponent={
          <View
            style={{
              marginBottom:
                musicContext.musicPlayerOption.music !== null ? 80 : 0,
            }}
          />
        }
      />
    </View>
  );
};
