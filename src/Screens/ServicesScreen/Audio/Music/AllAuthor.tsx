import * as React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {RootNavigationProps} from '../../../../navigation/types/RootStackTypes';
import {SONG_AUTHORS} from '../../../../gql/query/music/Music';
import {useTheme} from '../../../../Styles/Styles';
import {IArtist} from '../../../../models/Music';
import {View, RefreshControl, Platform} from 'react-native';
import MediumText from '../../../../components/MediumText';
import {treckCountPural} from '../../../../helpers/audioHelpers';
import {getUpdateClient} from '../../../../requests/updateHeaders';

const TAKE = 20;
const ACTIVITY_SIZE = 30;

export const AllAuthor: React.FC<RootNavigationProps<'AllAuthor'>> = ({
  navigation,
}) => {
  const [albums, setAlbums] = React.useState<IArtist[]>();
  const {Style, colors, theme} = useTheme();
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
        query: SONG_AUTHORS,
        variables: {
          take: take,
          skip: skip,
        },
      });
      let _albums: IArtist[] | null = null;
      _albums = response.data.musics.artists;
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
          query: SONG_AUTHORS,
          variables: {
            take: take,
            skip: skip,
          },
        });
        setAlbums(response.data.musics.artists);
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    [],
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
        data={getSortedData()}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[
          Style.marginHorizontal,
          {paddingTop: 20, paddingBottom: 40},
        ]}
        showsVerticalScrollIndicator={false}
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
                Нет популярных артистов
              </MediumText>
            </View>
          )
        }
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
        onEndReachedThreshold={0}
        onEndReached={() => {
          albums &&
            albums?.length >= TAKE &&
            uploadEndReached({take: TAKE, skip: albums.length});
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AlbumList', {album: item, type: 'artist'})
            }
            style={[
              {
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center',
              },
            ]}>
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 70 / 2,
                marginRight: 15,
                backgroundColor:
                  theme === 'light' ? colors.borderPrimary : colors.bgPrimary,
              }}
              source={{
                uri: item.cover?.url_512 ?? undefined,
              }}
            />
            <View>
              <MediumText numberOfLines={2}>{item.name}</MediumText>
              <MediumText fontSize={12} style={[{color: colors.textSecondary}]}>
                {`${item._count.songs} ${treckCountPural(item._count.songs)}`}
              </MediumText>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
