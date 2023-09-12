import React from 'react';
import {Platform, UIManager} from 'react-native';
import {apolloClient} from './src/apolloClient';
import {ApolloProvider} from '@apollo/client';
import SplashScreen from 'react-native-splash-screen';
import {persistor} from './src/redux/persist';
import {PersistGate} from 'redux-persist/integration/react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {VideoPlayerProvider} from './src/contexts/videoContext';
import {AppNavigation} from './src/navigation/screens';
import TrackPlayer from 'react-native-track-player';
import {MusicPlayerProvider} from './src/contexts/musicContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import remoteConfig from '@react-native-firebase/remote-config';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import {YANDEX_APPMETRICA_API_KEY} from './src/api/config';
import {TrackPlayerReset} from './src/services/service';
import BottomSheet from './src/components/BottomSheet';

export default function App() {
  const tempRef = React.useRef(false);
  const modalRef = React.useRef();

  React.useEffect(() => {
    (async function () {
      await remoteConfig().fetch(0);
    })();
  }, []);

  React.useEffect(() => {
    SplashScreen.hide();
    (async () => {
      if (tempRef.current === false) {
        AppMetrica.activate({
          apiKey: YANDEX_APPMETRICA_API_KEY,
          sessionTimeout: 120,
          firstActivationAsUpdate: false,
          installedAppCollecting: true,
          activationAsSessionStart: true,
          crashReporting: true,
        });
        await SetupService();
        tempRef.current = true;
      }
    })();
  }, []);

  React.useEffect(() => {
    remoteConfig()
      .setDefaults({
        awesome_new_feature: 'disabled',
        onBoarding_text_1:
          'Добро пожаловать в приложение НВК«Саха»!Теперь все медиапроекты нашей компании – в одном месте!',
        onBoarding_text_2:
          'Мы не забыли и про наших самых маленьких зрителей – хиты Российской мультипликации, а так же мультики нашего собственного производства теперь доступны на родном языке.',
        onBoarding_text_3:
          'Здесь вы сможете общаться с другими пользователями, делиться мнениями, стать блогером и публиковать свой собственный контент.',
        onBoarding_title_1: 'Прямые эфиры',
        onBoarding_title_2: 'Сервисы',
        onBoarding_title_3: 'Блогеры и посты',
        onBoard_carousel_interval: 6000,
        onBoard_duration: 300,
        broadcast_visible: false,
        broadcast_android_visible: false,
        music_visible: false,
        music_android_visible: false,
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          console.log(
            'Configs were retrieved from the backend and activated.',
            fetchedRemotely,
          );
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      });
  }, []);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={apolloClient}>
        <VideoPlayerProvider>
          <MusicPlayerProvider>
            <BottomSheetModalProvider>
              <GestureHandlerRootView style={{flex: 1}}>
                <SafeAreaProvider>
                  <BottomSheet ref={modalRef} />
                  <AppNavigation />
                </SafeAreaProvider>
              </GestureHandlerRootView>
            </BottomSheetModalProvider>
          </MusicPlayerProvider>
        </VideoPlayerProvider>
      </ApolloProvider>
    </PersistGate>
  );
}

const setupPlayer = async (
  options: Parameters<typeof TrackPlayer.setupPlayer>[0],
) => {
  const setup = async () => {
    try {
      await TrackPlayer.setupPlayer(options);
    } catch (error) {
      return (error as Error & {code?: string}).code;
    }
  };
  while ((await setup()) === 'android_cannot_setup_player_in_background') {
    await new Promise<void>(resolve => setTimeout(resolve, 1));
  }
};

const SetupService = async () => {
  await setupPlayer({autoHandleInterruptions: true}).then(async () => {
    await TrackPlayerReset();
  });
};
