import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {Containter} from '../../../components/Container';
import {
  RootNavigationProps,
  RootStackParamList,
} from '../../../navigation/types/RootStackTypes';
import BoldText from '../../../components/BoldText';
import MediumText from '../../../components/MediumText';
import RegularText from '../../../components/RegularText';
import {Divider} from '../../../components/Divider';
import {Button} from '../../../components/Button';
// import {BookMark} from '../../../components/SVGcomponents/Bookmark';
import {FlatList} from 'react-native-gesture-handler';
import {
  IBroadcast,
  IHlsBroadcast,
  ISeasonBroadcast,
} from '../../../models/Broadcast';
import {Heart} from '../../../components/SVGcomponents/Heart';
import {VideoItem} from '../../../components/VideoItem';
import {VideoPlayer} from '../../../components/VideoPlayer';
import {VideoPlayerContext} from '../../../contexts/videoContext';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {createFavorite} from '../../../redux/thunks/favorite/CreateFavorite';
import {removeFavorite} from '../../../redux/thunks/favorite/RemoveFavorite';
import {useTheme} from '../../../Styles/Styles';
import {BROADCAST} from '../../../gql/query/broadcast/Broadcast';
import {ClockCircle} from '../../../components/SVGcomponents/ClockCircle';
import {setLogged} from '../../../redux/slices/authSlice';
import {getUpdateClient} from '../../../requests/updateHeaders';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import DeviceInfo from 'react-native-device-info';
import {IEpisodeBroadcast} from '../../../models/Broadcast';

export const BroadcastsView: React.FC<
  RootNavigationProps<'BroadcastView'>
> = props => {
  const screenWidth = useWindowDimensions().width;
  const {route, navigation} = props;
  const {broadcast} = route.params;
  const {colors} = useTheme();
  const user = useAppSelector(state => state.user.data);
  const scrollRef = React.useRef<ScrollView>(null);
  const contextVideoPlayer = React.useContext(VideoPlayerContext);
  const [loading, setLoading] = React.useState(false);
  const [broadcastData, setBroadcastData] = React.useState<IBroadcast>(
    {} as IBroadcast,
  );
  const [urlsVideo, setUrlsVideo] = React.useState<{
    url: string;
    hls: IHlsBroadcast[] | [];
  }>({url: '', hls: []});
  const [duration, setDuration] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const client = await getUpdateClient();
      await client
        .query({
          query: BROADCAST,
          variables: {showId: broadcast.id},
        })
        .then(res => {
          AppMetrica.reportEvent('BROADCAST_VIEW', {
            user: user,
            broadcast_name: broadcast.name,
            date: new Date(),
            date_string: new Date().toString(),
            platform: Platform.OS,
            device_id: !user ? DeviceInfo.getDeviceId() : undefined,
            app_version: DeviceInfo.getVersion(),
          });
          setBroadcastData(res.data.show);
          const startEpisode: IEpisodeBroadcast = res.data.show.seasons
            ?.sort(
              (a: ISeasonBroadcast, b: ISeasonBroadcast) => a.number - b.number,
            )[0]
            ?.episodes?.sort(
              (a: IEpisodeBroadcast, b: IEpisodeBroadcast) =>
                a.number - b.number,
            )[0];
          setUrlsVideo({
            url: startEpisode?.media?.indexM3u8Url ?? '',
            hls: startEpisode?.media?.hls ?? [],
          });
          setDuration(startEpisode?.duration);
        })
        .catch(e => {
          console.log(JSON.stringify(e, null, 2));
        })
        .finally(() => {
          setLoading(false);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [broadcast.id]);

  return (
    <ScrollView
      ref={scrollRef}
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
      scrollEnabled={!contextVideoPlayer.videoPlayerOption?.fullscreen}
      contentContainerStyle={{flexGrow: 1}}
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}>
      {urlsVideo.url ? (
        <VideoPlayer scrollRef={scrollRef} urls={urlsVideo} />
      ) : (
        <View
          style={{
            height: (screenWidth / 16) * 9,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loading ? (
            <ActivityIndicator color={colors.colorMain} size={'large'} />
          ) : (
            <MediumText style={{color: colors.white}}>
              Файл не найден
            </MediumText>
          )}
        </View>
      )}

      <Containter>
        <View style={[styles.rowContainer, styles.infoContainer]}>
          <View>
            <BoldText
              style={{width: screenWidth - 30 - 36 - 20}} //screenWidth-paddingHorizontall-LikeButton-insets
              numberOfLines={2}
              fontSize={18}>
              {broadcast.name}
            </BoldText>
            <RegularText>1 сезон. 1 серия</RegularText>
          </View>
          <LikeButton item={broadcast} />
        </View>
        {duration ? (
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <ClockCircle />
            <RegularText style={{marginLeft: 10}} fontSize={12}>
              {duration + ' мин'}
            </RegularText>
          </View>
        ) : (
          <></>
        )}

        <Divider style={styles.divider} />
        <View style={[styles.rowContainer, styles.buttonContainer]}>
          <Button
            title="Смотреть"
            style={styles.leftButton}
            onPress={() => {
              contextVideoPlayer.setVideoPlayerOption({
                fullscreen: false,
                pressPlay: true,
              });
            }}
          />
          {/* <Button
            title="Просмотрен"
            textStyle={{color: colors.orange}}
            icon={<BookMark color={colors.orange} />}
            style={[
              styles.rightButton,
              {
                borderColor: colors.orange,
              },
            ]}
          /> */}
        </View>
        <View style={styles.aboutContainer}>
          <BoldText style={{marginBottom: 15}} fontSize={16}>
            О передаче
          </BoldText>
          <RegularText>{broadcast.content}</RegularText>
        </View>
        <View style={styles.rowContainer} />
      </Containter>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.colorMain} />
      ) : broadcastData?.seasons?.length ? (
        <SeasonsTabView broadcast={broadcastData} navigation={navigation} />
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

const LikeButton = (props: {item: IBroadcast}) => {
  const {item} = props;
  const {colors, Style} = useTheme();
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  const favoriteBroadcasts = useAppSelector(
    state => state.favorite.favorites,
  ).filter(favorite => favorite.show !== null);
  const [like, setLike] = React.useState(
    favoriteBroadcasts.map(favorite => favorite.show?.id).includes(item.id),
  );
  const [likeIsDisabled, setLikeIsDisabled] = React.useState(false);

  return (
    <TouchableOpacity
      disabled={likeIsDisabled}
      onPress={async () => {
        if (token) {
          setLikeIsDisabled(true);
          if (like) {
            let idFavorite = favoriteBroadcasts.find(
              favorite => favorite.show?.id === item.id,
            )?.id;
            if (idFavorite) {
              setLike(false);
              const response = await dispatch(removeFavorite(idFavorite));
              if (response.meta.requestStatus === 'rejected') {
                setLike(true);
              }
            }
            setLikeIsDisabled(false);
          } else {
            setLike(true);
            const response = await dispatch(
              createFavorite({
                showId: item.id,
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
      }}
      style={Style.orangeCircle}>
      <Heart inColor={like ? colors.white : colors.colorMain} />
    </TouchableOpacity>
  );
};

interface SeasonsTabViewProps {
  broadcast: IBroadcast;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'BroadcastView',
    undefined
  >;
}

const SeasonsTabView = ({broadcast, navigation}: SeasonsTabViewProps) => {
  const seasons = broadcast.seasons;
  const {colors, Style} = useTheme();
  const [seasonSelect, setSeasonSelect] = React.useState(0);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {seasons?.filter(item => (item.number ? true : false)).length ? (
          <FlatList
            horizontal
            data={seasons?.sort((a, b) => a.number - b.number) ?? []}
            contentContainerStyle={{paddingHorizontal: 15}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => setSeasonSelect(index)}
                style={{marginRight: 15}}>
                <MediumText
                  style={{
                    color:
                      seasonSelect === index
                        ? colors.colorMain
                        : colors.textPrimary,
                  }}
                  fontSize={14}>{`${
                  item.number ?? index + 1
                } сезон`}</MediumText>
                <View
                  style={{
                    flex: 1,
                    height: 3,
                    marginTop: 5,
                    backgroundColor:
                      seasonSelect === index ? colors.colorMain : 'transparent',
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <TouchableOpacity style={{marginRight: 15, paddingHorizontal: 15}}>
            <MediumText
              style={{
                color: colors.colorMain,
              }}
              fontSize={14}>
              Серии
            </MediumText>
            <View
              style={{
                flex: 1,
                height: 3,
                marginTop: 5,
                backgroundColor: colors.colorMain,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
              }}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{marginHorizontal: 15}}
          onPress={() => {
            navigation.navigate('BroadcastSeasonList', {broadcast: broadcast});
          }}>
          <MediumText style={{color: colors.colorMain}} fontSize={14}>
            Все
          </MediumText>
        </TouchableOpacity>
      </View>
      <Divider style={Style.marginHorizontal} />
      <FlatList
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
          marginBottom: 60,
          marginTop: 20,
          gap: 15,
        }}
        showsHorizontalScrollIndicator={false}
        data={
          seasons?.length
            ? seasons[seasonSelect]?.episodes?.sort(
                (a, b) => a.number - b.number,
              )
            : []
        }
        renderItem={({item, index}) => (
          <VideoItem
            urlImage={item.media?.covers[0] && item.media?.covers[0]?.url_512}
            video={item}
            style={{height: 150, width: 150}}
            child={
              <View>
                <MediumText numberOfLines={2} fontSize={14}>{`${index + 1}. ${
                  item.name
                }`}</MediumText>
                <RegularText fontSize={12} style={{color: colors.gray}}>
                  {item?.duration ? item.duration + ' мин' : ''}
                </RegularText>
              </View>
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    justifyContent: 'space-between',
  },
  aboutContainer: {
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 25,
  },
  leftButton: {
    flex: 1,
    // marginRight: 15,
  },
  rightButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  divider: {
    marginVertical: 25,
  },
});
