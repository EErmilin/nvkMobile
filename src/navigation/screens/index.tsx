import * as React from 'react';
import {useState} from 'react';
import {
  Appearance,
  LogBox,
  PermissionsAndroid,
  Platform,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import {BoldText, VideoFullPlayer} from '../../components';
import {ArrowLeft} from '../../components/SVGcomponents';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useTheme} from '../../Styles/Styles';

import {RootStackParamList} from '../types/RootStackTypes';
import {LoginNavigation} from './LoginNavigation';
import {TabNavigation} from './TabNavigation';

import {Region} from '../../Screens/ProfilesScreen/Region';
import {NewsView} from '../../Screens/NewsScreen/NewsView';
import {ViewTag} from '../../Screens/SearchScreens/ViewTag';

import {EditProfile} from '../../Screens/ProfilesScreen/EditProfile';
import {HashtagScreen} from '../../Screens/ProfilesScreen/HashtagScreen';
import {PrivacyPolicy} from '../../Screens/ProfilesScreen/PrivacyPolicy';
import {UseOfTerms} from '../../Screens/ProfilesScreen/UseOfTerms';
import {PasswordEdit} from '../../Screens/ProfilesScreen/PasswordEdit';
import {PasswordEditNew} from '../../Screens/ProfilesScreen/PasswordEditNew';
import {AboutScreen} from '../../Screens/ProfilesScreen/AboutScreen';
import {Settings} from '../../Screens/ProfilesScreen/Settings';
import {TechSupport} from '../../Screens/ProfilesScreen/screenComponents/TechSupport';

import {ViewLive} from '../../Screens/ServicesScreen/Live/ViewLive';
import {LiveQuestion} from '../../Screens/ServicesScreen/Live/LiveQuestion';

import {ServicesScreen} from '../../Screens/ServicesScreen/Services/ServicesScreen';
import {ViewService} from '../../Screens/ServicesScreen/Services/ViewService';

import {Broadcasts} from '../../Screens/ServicesScreen/Broadcast/Broadcasts';
import {BroadcastsView} from '../../Screens/ServicesScreen/Broadcast/BroadcastView';
import {BroadcastSeasonList} from '../../Screens/ServicesScreen/Broadcast/BroadcastSeasonList';

import {Music} from '../../Screens/ServicesScreen/Audio/Music/Music';
import {AlbumList} from '../../Screens/ServicesScreen/Audio/Music/AlbumList';

import {Horoscope} from '../../Screens/ServicesScreen/Horoscope/Horoscope';
import {MusicPlayer} from '../../Screens/ServicesScreen/Audio/MusicPlayer';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import messaging from '@react-native-firebase/messaging';
import {MusicPlayerContext} from '../../contexts/musicContext';
import {Podcast} from '../../Screens/ServicesScreen/Audio/Podcast/Podcast';
import {VideoPlayerContext} from '../../contexts/videoContext';
import {AllAlbum} from '../../Screens/ServicesScreen/Audio/Music/AllAlbum';
import {AllAuthor} from '../../Screens/ServicesScreen/Audio/Music/AllAuthor';
import {AllMusic} from '../../Screens/ServicesScreen/Audio/Music/AllMusic';
import {MyFavoriteSongs} from '../../Screens/ServicesScreen/Audio/MyFavoriteSongs';
import {RadioScreen} from '../../Screens/ServicesScreen/Radio/RadioScreen';
import {MusicTrackView} from './TabBar/MusicTrackView';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Orientation, {
  OrientationLocker,
  PORTRAIT,
} from 'react-native-orientation-locker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {setTheme} from '../../redux/slices/themeSlice';
import {AllAlbumPodcast} from '../../Screens/ServicesScreen/Audio/Podcast/AllAlbum';
import {VALIDATE_TOKEN} from '../../gql/mutation/auth/ValidateToken';
import {logout} from '../../redux/thunks/auth/Logout';
import {getUpdateClient} from '../../requests/updateHeaders';
import {toastConfig} from '../../api/configToast';
import {FilmsScreen} from '../../Screens/FilmsScreens/FilmsScreen';
import {FilmScreen} from '../../Screens/FilmsScreens/FilmScreen';
import {Rating} from '../../components/Rating';
import {SeriesScreen} from '../../Screens/SeriesScreen/SeriesScreen';
import {AllSeriesScreen} from '../../Screens/SeriesScreen/AllSeriesScreen';
import {CurrentSeriesScreen} from '../../Screens/SeriesScreen/CurrentSeriesScreen';
import {CartoonsScreen} from '../../Screens/CartoonsScreen/CartoonsScreen';
import {CartoonScreen} from '../../Screens/CartoonsScreen/CartoonScreen';
import {ChildrenModeModal} from '../../components/ChildrenModeModal';
import CreateBloger from '../../Screens/BlogerScreens/CreateBloger';
import BlogerProfile from '../../Screens/BlogerScreens/BlogerProfile';
import EditBlogger from '../../Screens/BlogerScreens/EditBloger';
import ReviewsScreen from '../../Screens/ ReviewsScreen/ReviewsScreen';
import {useSelector} from 'react-redux';
import NewsComments from '../../Screens/NewsScreen/NewsCommets';
import FilterScreen from '../../Screens/FilterScreen/FilterScreen';
import {CartoonsSeasons} from '../../Screens/CartoonsScreen/CartoonsSeasons';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator<RootStackParamList>();
const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  // Event.PlaybackActiveTrackChanged,
];

export const AppNavigation = () => {
  const logged = useAppSelector(state => state.auth.logged);
  const [state, setState] = React.useState<boolean>(false);
  const musicContext = React.useContext(MusicPlayerContext);
  const videoContext = React.useContext(VideoPlayerContext);
  const {theme, text, colors} = useTheme();
  const dispatch = useAppDispatch();

  const setListenerTheme = React.useCallback(
    (listener: Appearance.AppearancePreferences) => {
      if (text === 'Системная') {
        if (listener.colorScheme === 'dark') {
          dispatch(setTheme('Темная'));
          dispatch(setTheme('Системная'));
        } else {
          dispatch(setTheme('Светлая'));
          dispatch(setTheme('Системная'));
        }
      }
    },
    [dispatch, text],
  );

  React.useEffect(() => {
    const themeListener = Appearance.addChangeListener(setListenerTheme);
    return () => themeListener.remove();
  }, [setListenerTheme]);

  useTrackPlayerEvents(events, async event => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    } else {
      setState(!state);
    }
  });

  React.useEffect(() => {
    (async () => {
      const trackPlayingIndex = await TrackPlayer.getActiveTrackIndex();
      if (typeof trackPlayingIndex === 'number') {
        const activeTrack = await TrackPlayer.getActiveTrack();
        musicContext.setMusicPlayerOption({
          ...musicContext.musicPlayerOption,
          music: activeTrack,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  React.useEffect(() => {
    if (videoContext.videoPlayerOption.video) {
      SystemNavigationBar.navigationHide();
      Orientation.unlockAllOrientations();
      StatusBar.setHidden(true);
    } else {
      SystemNavigationBar.navigationShow();
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    }
  }, [videoContext.videoPlayerOption.video]);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.fillPrimary}
      />
      <OrientationLocker orientation={PORTRAIT} />
      {logged ? <StackNavigation /> : <LoginNavigation />}
      <Toast config={toastConfig} />
      {videoContext.videoPlayerOption?.video && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}>
          <StatusBar hidden />
          {videoContext.videoPlayerOption?.video && (
            <VideoFullPlayer urls={videoContext.videoPlayerOption.video} />
          )}
        </View>
      )}
    </NavigationContainer>
  );
};

async function requestPermission() {
  await messaging().requestPermission({
    sound: true,
    announcement: true,
  });
}

const StackNavigation = () => {
  const {colors} = useTheme();
  const hashtags = useAppSelector(state => state.user.data?.hashtags);
  const regionScreen = useAppSelector(state => state.auth.regionScreen);
  const token = useAppSelector(state => state.auth.token);
  const notificationRedux = useAppSelector(state => state.auth.notification);
  const screenWidth = useWindowDimensions().width;
  const videoContext = React.useContext(VideoPlayerContext);
  const navigation = useNavigation();
  const routes = useNavigationState(state => state?.routes);
  const [flag, setFlag] = React.useState(false);
  const [isChildrenMode, setIsChildrenMode] = React.useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const {isOpen} = useSelector(state => state.bottomSheet);

  const insets = useSafeAreaInsets();
  const userId = useAppSelector(state => state.user.data?.id);
  // const client = useApolloClient();
  const dispatch = useAppDispatch();

  //BOTTOM SHEET

  React.useEffect(() => {
    if (routes?.length) {
      switch (routes[routes?.length - 1].name) {
        case 'Tabs':
        case 'RadioScreen':
        case 'MusicPlayer':
        case 'AlbumList':
        case 'MyFavoriteSongs':
        case 'ViewLive': {
          setFlag(false);
          break;
        }
        default: {
          if (videoContext.videoPlayerOption?.fullscreen) {
            setFlag(false);
          } else {
            setFlag(true);
          }

          break;
        }
      }
    }
  }, [routes, videoContext.videoPlayerOption?.fullscreen]);

  React.useEffect(() => {
    (async function () {
      try {
        if (token && userId) {
          const client = await getUpdateClient();
          let response = await client.mutate({
            mutation: VALIDATE_TOKEN,
            variables: {
              token: token,
              userId: userId,
            },
          });
          if (response.data.validateToken === false) {
            dispatch(logout());
          }
        }
      } catch (e) {
        console.log('e index', e);
      }
    })();
  }, [dispatch, token, userId]);

  function headerLeft() {
    return (
      <TouchableOpacity
        style={{
          width: 36,
          height: 36,
          marginRight: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        accessible={false}
        accessibilityLabel="back button"
        onPress={() => {
          navigation.goBack();
        }}>
        <ArrowLeft color={colors.colorMain} />
      </TouchableOpacity>
    );
  }

  function headerTitle(props: {children: string}) {
    return (
      <BoldText
        numberOfLines={1}
        style={{
          width: screenWidth - 48 - 50,
          textAlign: 'left',
          paddingBottom: 3,
        }}>
        {props.children}
      </BoldText>
    );
  }

  const onChildrenMode = () => {
    if (!isChildrenMode) {
      setIsChildrenMode(true);
    } else {
      setBottomSheetVisible(true);
    }
  };

  const notification = React.useCallback(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Platform.OS === 'android' &&
        Toast.show({
          type: 'success',
          text1: remoteMessage.notification?.title,
          text2: remoteMessage.notification?.body,
        });
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (!remoteMessage.data) {
        return;
      }
      return false;
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } else {
      requestPermission();
    }
    if (notificationRedux) {
      notification();
    }
  }, [notification, notificationRedux]);

  return (
    <View
      style={{
        backgroundColor: colors.bgSecondary,
        flex: 1,
      }}>
      <Stack.Navigator
        initialRouteName={
          (hashtags && hashtags?.length > 0) || regionScreen
            ? 'Tabs'
            : token
            ? 'Region'
            : 'Tabs'
        }
        screenOptions={({}) => ({
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'NotoSans-Bold',
            fontWeight: '700',
            fontSize: 16,
            width: '100%',
          },
          headerStyle: {
            backgroundColor: colors.fillPrimary,
          },
          headerTitleAlign: 'left',
          headerTitle,
          headerLeft: () => headerLeft(),
          headerBackVisible: false,
        })}>
        <Stack.Screen
          name="Tabs"
          component={TabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Region"
          component={Region}
          options={{
            title: 'Выберите 3 хештега',
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen
          name="NewsView"
          component={NewsView}
          options={({route}) => ({
            headerStyle: {backgroundColor: colors.fillPrimary},
            title: route.params.post.title,
          })}
        />
        <Stack.Screen
          name="ViewTag"
          component={ViewTag}
          options={{
            title: 'Хэштеги',
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: 'Изменить мой аккаунт',
            headerTitle,
          }}
        />
        <Stack.Screen
          name="HashtagScreen"
          component={HashtagScreen}
          options={() => ({
            title: 'Мои хэштеги',
          })}
        />
        {/* <Stack.Screen
          name="CreateBloger"
          component={CreateBloger}
          options={() => ({
            title: 'Стать блогером',
          })}
        /> */}
        {/* <Stack.Screen
          name="BlogerProfile"
          component={BlogerProfile}
          options={{
            title: '',
            headerTitle,
          }}
        /> */}
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            presentation: 'modal',
            headerTitleAlign: 'left',
            title: 'Политика конфиденциальности',
          }}
        />
        <Stack.Screen
          name="UseOfTerms"
          component={UseOfTerms}
          options={{
            presentation: 'modal',
            headerTitleAlign: 'left',
            title: 'Условия пользования',
          }}
        />
        <Stack.Screen
          name="PasswordEdit"
          component={PasswordEdit}
          options={{
            presentation: 'modal',
            headerTitleAlign: Platform.OS === 'android' ? 'left' : 'center',
            title: 'Создайте пароль',
            headerTitle: () => (
              <BoldText fontSize={16}>Создайте пароль</BoldText>
            ),
            headerLeft: Platform.OS === 'ios' ? () => null : headerLeft,
          }}
        />
        <Stack.Screen
          name="PasswordEditNew"
          component={PasswordEditNew}
          options={{
            presentation: 'modal',
            headerTitleAlign: Platform.OS === 'android' ? 'left' : 'center',
            title: 'Введите новый пароль',
            headerLeft: Platform.OS === 'ios' ? () => null : headerLeft,
          }}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{
            presentation: 'modal',
            headerShown: Platform.OS === 'ios' ? false : true,
            title: 'О приложении',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            presentation: 'modal',
            headerShown: Platform.OS === 'ios' ? false : true,
            title: 'Настройки',
            headerStyle: {
              backgroundColor:
                Platform.OS === 'android'
                  ? colors.fillPrimary
                  : colors.bgSecondary,
            },
          }}
        />
        <Stack.Screen
          name="TechSupport"
          component={TechSupport}
          options={{
            presentation: 'modal',
            headerShown: Platform.OS === 'ios' ? false : true,
            title: 'Тех.поддержка',
          }}
        />
        <Stack.Screen
          name="ViewLive"
          component={ViewLive}
          options={{
            title: 'Прямой эфир',
            gestureEnabled: !videoContext.videoPlayerOption?.fullscreen,
          }}
        />
        <Stack.Screen
          name="LiveQuestion"
          component={LiveQuestion}
          options={{
            title: 'Задать вопрос',
            presentation: 'modal',
            gestureEnabled: !videoContext.videoPlayerOption?.fullscreen,
            headerLeft: Platform.OS === 'ios' ? () => null : headerLeft,
            headerTitleAlign: Platform.OS === 'android' ? 'left' : 'center',
            headerTitle: () => (
              <BoldText
                fontSize={16}
                style={{
                  width: screenWidth - 48,
                  textAlign: Platform.OS === 'ios' ? 'center' : 'left',
                  paddingRight: Platform.OS === 'android' ? 48 : 0,
                  paddingBottom: Platform.OS === 'android' ? 3 : 0,
                }}>
                Задать вопрос
              </BoldText>
            ),
          }}
        />
        <Stack.Screen
          name="RadioScreen"
          component={RadioScreen}
          options={{
            headerShown: false,
            title: 'Радио Тэтим',
            headerTitle: () => (
              <BoldText
                numberOfLines={1}
                style={{
                  width: screenWidth - 48 - 50,
                  textAlign: 'left',
                  color: colors.white,
                }}>
                Радио Тэтим
              </BoldText>
            ),
            headerStyle: {backgroundColor: colors.blackText},
          }}
        />
        <Stack.Screen
          name="ServicesScreen"
          component={ServicesScreen}
          options={{
            title: 'Услуги НВК Саха',
          }}
        />
        <Stack.Screen
          name="ViewService"
          component={ViewService}
          options={({route}) => ({
            title: route.params.name,
          })}
        />
        <Stack.Screen
          name="Broadcasts"
          component={Broadcasts}
          options={{
            title: 'Передачи',
          }}
        />
        <Stack.Screen
          name="BroadcastView"
          component={BroadcastsView}
          options={({route}) => ({
            title: route.params.broadcast.name,
            gestureEnabled: !videoContext.videoPlayerOption?.fullscreen,
          })}
        />
        <Stack.Screen
          name="BroadcastSeasonList"
          component={BroadcastSeasonList}
          options={({route}) => ({
            title: route.params.broadcast.name,
          })}
        />
        <Stack.Screen
          name="Music"
          component={Music}
          options={{
            title: 'Музыка',
            headerStyle: {backgroundColor: colors.fillPrimary},
          }}
        />
        <Stack.Screen
          name="AlbumList"
          component={AlbumList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AllAlbum"
          component={AllAlbum}
          options={({route}) => ({
            title:
              route.params.type === 'album' ? 'Все альбомы' : 'Все сборники',
          })}
        />
        <Stack.Screen
          name="AllAuthor"
          component={AllAuthor}
          options={{
            title: 'Все авторы',
          }}
        />
        <Stack.Screen
          name="AllMusic"
          component={AllMusic}
          options={{
            title: 'Все треки',
          }}
        />
        <Stack.Screen
          name="MyFavoriteSongs"
          component={MyFavoriteSongs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MusicPlayer"
          component={MusicPlayer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Podcast"
          component={Podcast}
          options={{
            title: 'Подкасты',
            headerStyle: {backgroundColor: colors.background},
          }}
        />
        <Stack.Screen
          name="AllAlbumPodcast"
          component={AllAlbumPodcast}
          options={({route}) => ({
            title:
              route.params.type === 'podcast'
                ? 'Подкасты'
                : route.params.type === 'olonho'
                ? 'Олонхо'
                : 'Сказки',
          })}
        />
        <Stack.Screen
          name="Horoscope"
          component={Horoscope}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Films"
          component={FilmsScreen}
          options={{
            title: 'Фильмы',
            headerStyle: {backgroundColor: colors.fillPrimary},
          }}
        />
        <Stack.Screen
          name="Film"
          component={FilmScreen}
          options={({route}) => ({
            title: route.params.title,
            headerRight: () => <Rating rating={route.params.rating} isStar />,
            headerStyle: {backgroundColor: colors.fillPrimary},
            headerShown: isOpen,
          })}
        />
        <Stack.Screen
          name="Series"
          component={SeriesScreen}
          options={{
            title: 'Сериалы',
            headerStyle: {backgroundColor: colors.fillPrimary},
          }}
        />
        <Stack.Screen
          name="AllSeries"
          component={AllSeriesScreen}
          options={({route}) => ({
            title: route.params.title,
            headerStyle: {backgroundColor: colors.fillPrimary},
          })}
        />
        <Stack.Screen
          name="CurrentSeries"
          component={CurrentSeriesScreen}
          options={({route}) => ({
            title: route.params.title,
            headerRight: () => <Rating rating={route.params.rating} isStar />,
            headerStyle: {backgroundColor: colors.fillPrimary},
            headerShown: isOpen,
          })}
        />
        <Stack.Screen
          name="Cartoons"
          component={CartoonsScreen}
          options={{
            title: 'Мультсериалы',
            headerLeft: () => (isChildrenMode ? null : headerLeft()),
            headerRight: () => (
              <TouchableOpacity onPress={onChildrenMode}>
                <Rating disabled={isChildrenMode} rating={'Детский'} lock />
              </TouchableOpacity>
            ),
            headerStyle: {backgroundColor: colors.fillPrimary},
          }}
        />
        <Stack.Screen
          name="CartoonSeasons"
          component={CartoonsSeasons}
          options={({route}) => ({
            title: 'Сезоны',
            headerLeft: () => (isChildrenMode ? null : headerLeft()),
            headerRight: () => (
              <TouchableOpacity onPress={onChildrenMode}>
                <Rating disabled={isChildrenMode} rating={'Детский'} lock />
              </TouchableOpacity>
            ),
            headerStyle: {backgroundColor: colors.fillPrimary},
            headerShown: isOpen,
          })}
        />
        <Stack.Screen
          name="Cartoon"
          component={CartoonScreen}
          options={({route}) => ({
            title: route.params.title,
            headerLeft: () => (isChildrenMode ? null : headerLeft()),
            headerRight: () => (
              <TouchableOpacity onPress={onChildrenMode}>
                <Rating disabled={isChildrenMode} rating={'Детский'} lock />
              </TouchableOpacity>
            ),
            headerStyle: {backgroundColor: colors.fillPrimary},
            headerShown: isOpen,
          })}
        />
        <Stack.Screen
          name="CreateBloger"
          component={CreateBloger}
          options={() => ({
            title: 'Стать блогером',
          })}
        />
        <Stack.Screen
          name="EditBloger"
          component={EditBlogger}
          options={() => ({
            title: 'Редактировать',
          })}
        />
        <Stack.Screen
          name="BlogerProfile"
          component={BlogerProfile}
          options={{
            title: '',
            headerTitle,
          }}
        />
        {/* ReviewsScreen */}
        <Stack.Screen
          options={({route}) => ({
            headerTitle: `Все отзывы ${route.params.name}`,
            headerShown: isOpen,
          })}
          name="Reviews"
          component={ReviewsScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Все комментарии',
          }}
          name="Comments"
          component={NewsComments}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Фильтры',
            headerShown: isOpen,
          }}
          name="Filter"
          component={FilterScreen}
        />
      </Stack.Navigator>
      {flag ? <MusicTrackView insets={insets.bottom} /> : <></>}
      <ChildrenModeModal
        isBottomSheetVisible={isBottomSheetVisible}
        setIsChildrenMode={setIsChildrenMode}
        setBottomSheetVisible={setBottomSheetVisible}
      />
    </View>
  );
};
