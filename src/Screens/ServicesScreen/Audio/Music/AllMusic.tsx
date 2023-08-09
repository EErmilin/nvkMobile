import * as React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {RootNavigationProps} from '../../../../navigation/types/RootStackTypes';
import {SONG_MUSICS} from '../../../../gql/query/music/Music';
import {useTheme} from '../../../../Styles/Styles';
import {ISong} from '../../../../models/Music';
import {Track} from 'react-native-track-player';
import {MusicItem} from '../../../../components/MusicItem';
import {getUpdateClient} from '../../../../requests/updateHeaders';
import {MediumText} from '../../../../components';
import {Platform} from 'react-native';

const TAKE = 30;
const ACTIVITY_SIZE = 30;

export const AllMusic: React.FC<RootNavigationProps<'AllMusic'>> = ({
  navigation,
}) => {
  const [musics, setMusics] = React.useState<Track[] | null>(null);
  const {colors} = useTheme();
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
        query: SONG_MUSICS,
        variables: {
          take: take,
          skip: skip,
        },
      });
      let _albums: Track[] | null = null;
      _albums = response.data.musics.songs
        ?.filter((item2: ISong) => Boolean(item2.url))
        ?.map((item: ISong) => {
          return {
            id: item.id,
            url: item.url,
            title: item.title,
            artist: item.artist?.name,
            artwork: item.artwork?.url_512,
            type: item.media ? 'hls' : 'default',
          };
        });
      let prevData = musics;
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
      setMusics(prevData);
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
          query: SONG_MUSICS,
          variables: {
            take: take,
            skip: skip,
          },
        });
        setMusics(
          response.data.musics.songs
            ?.filter((item2: ISong) => Boolean(item2.url))
            ?.map((item: ISong) => {
              return {
                id: item.id,
                url: item.url,
                title: item.title,
                artist: item.artist?.name,
                artwork: item.artwork?.url_512,
                type: item.media ? 'hls' : 'default',
              };
            }),
        );
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

  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
      <FlatList
        data={musics}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[{paddingBottom: 40}]}
        refreshControl={
          <RefreshControl
            colors={[colors.colorMain]}
            tintColor={colors.colorMain}
            refreshing={loading}
            onRefresh={async () => {
              try {
                setLoading(true);
                await uploadStart({take: TAKE, skip: 0});
              } catch (e) {
                console.log(e);
              } finally {
                setLoading(false);
              }
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0}
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
                Нет новых треков
              </MediumText>
            </View>
          )
        }
        onEndReached={() => {
          musics &&
            musics?.length >= TAKE &&
            uploadEndReached({take: TAKE, skip: musics.length});
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
          <MusicItem
            key={index}
            album={musics ?? []}
            navigation={navigation}
            item={item}
            index={index}
            albumID={'alltrack'}
            type={'playlist'}
          />
        )}
      />
    </SafeAreaView>
  );
};
