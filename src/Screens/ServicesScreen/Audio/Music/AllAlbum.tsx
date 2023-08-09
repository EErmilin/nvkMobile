import * as React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import {RootNavigationProps} from '../../../../navigation/types/RootStackTypes';
import {SONG_ALBUMS, SONG_PLAYLISTS} from '../../../../gql/query/music/Music';
import {useTheme} from '../../../../Styles/Styles';
import {IAlbum} from '../../../../models/Music';
import BoldText from '../../../../components/BoldText';
import {getUpdateClient} from '../../../../requests/updateHeaders';
import {View, ActivityIndicator, Platform} from 'react-native';
import MediumText from '../../../../components/MediumText';

const PADDING = 15;
const TAKE = 20;
const ACTIVITY_SIZE = 30;

export const AllAlbum: React.FC<RootNavigationProps<'AllAlbum'>> = ({
  route,
  navigation,
}) => {
  const [albums, setAlbums] = React.useState<IAlbum[]>();
  const {Style, colors, theme} = useTheme();
  const {type} = route.params;
  const SCREEN_WIDTH = useWindowDimensions().width;
  const [loading, setLoading] = React.useState(false);
  const [loadingEnd, setLoadingEnd] = React.useState(false);

  const uploadEndReached = async ({
    take,
    skip,
  }: {
    take: number;
    skip: number;
  }) => {
    try {
      setLoadingEnd(true);
      const client = await getUpdateClient();
      const response = await client.query({
        query: type === 'album' ? SONG_ALBUMS : SONG_PLAYLISTS,
        variables: {
          take: take,
          skip: skip,
        },
      });
      let _albums: IAlbum[] | null = null;
      switch (type) {
        case 'album':
          _albums = response.data.musics.albums;
          break;
        case 'playlist':
          _albums = response.data.musics.playlists;
          break;
        default:
          break;
      }
      let prevData = albums;
      let prevDataIds = prevData?.map(item => item.id);
      let newData = _albums;
      newData?.map(item => {
        if (!prevDataIds?.includes(item.id)) {
          prevData?.push(item);
        } else {
          if (prevData?.find(item2 => item2.id === item.id)) {
            prevData[prevData.findIndex(item2 => item2.id === item.id)] = item;
          }
        }
      });
      setAlbums(prevData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingEnd(false);
    }
  };

  const uploadStart = React.useCallback(
    async ({take, skip}: {take: number; skip: number}) => {
      try {
        const client = await getUpdateClient();
        const response = await client.query({
          query: type === 'album' ? SONG_ALBUMS : SONG_PLAYLISTS,
          variables: {
            take: take,
            skip: skip,
          },
        });
        type === 'album'
          ? setAlbums(response.data.musics.albums)
          : setAlbums(response.data.musics.playlists);
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    [type],
  );

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await uploadStart({take: TAKE, skip: 0});
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [uploadStart]);

  const getSortedData = () => {
    let temp = albums ?? [];
    return temp.sort(function (a, b) {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
      <FlatList
        numColumns={2}
        data={getSortedData()}
        keyExtractor={(item, index) => index.toString()}
        style={[Style.marginHorizontal]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 10,
        }}
        refreshControl={
          <RefreshControl
            colors={[colors.colorMain]}
            tintColor={colors.colorMain}
            refreshing={loading}
            onRefresh={async () => {
              try {
                setLoading(true);
                await uploadStart({take: 20, skip: 0});
              } catch (e) {
                console.log(e);
              } finally {
                setLoading(false);
              }
            }}
          />
        }
        ListEmptyComponent={
          loading ? (
            Platform.OS === 'ios' ? (
              <View style={{height: ACTIVITY_SIZE}}>
                <ActivityIndicator
                  color={colors.colorMain}
                  style={{alignSelf: 'center'}}
                  size={ACTIVITY_SIZE}
                />
              </View>
            ) : (
              <></>
            )
          ) : (
            <View style={{height: ACTIVITY_SIZE}}>
              <MediumText
                style={{color: colors.textSecondary, textAlign: 'center'}}>
                Нет популярных альбомов
              </MediumText>
            </View>
          )
        }
        onEndReachedThreshold={0}
        onEndReached={() => {
          albums &&
            albums?.length >= TAKE &&
            uploadEndReached({take: TAKE, skip: albums.length});
        }}
        ListFooterComponent={
          <View style={{height: ACTIVITY_SIZE}}>
            {loadingEnd && (
              <ActivityIndicator
                color={colors.colorMain}
                style={{alignSelf: 'center'}}
                size={ACTIVITY_SIZE}
              />
            )}
          </View>
        }
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AlbumList', {album: item, type: type})
            }
            style={[
              {
                marginBottom: 15,
                marginRight: index % 2 === 0 ? 15 : 0,
              },
            ]}>
            <Image
              style={{
                height: SCREEN_WIDTH / 2 - PADDING * 1.5,
                width: SCREEN_WIDTH / 2 - PADDING * 1.5,
                borderRadius: 20,
                backgroundColor:
                  theme === 'light' ? colors.borderPrimary : colors.bgPrimary,
              }}
              source={{
                uri: item.cover?.url_512 ?? undefined,
              }}
            />
            <BoldText
              numberOfLines={2}
              style={[{marginTop: 5, width: SCREEN_WIDTH / 2 - PADDING * 1.5}]}>
              {item.name}
            </BoldText>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
