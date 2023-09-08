import * as React from 'react';
import {
  View,
  useWindowDimensions,
  ActivityIndicator,
  Platform,
  AppState,
} from 'react-native';
import Toast from 'react-native-toast-message';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import {
  BoldText,
  Containter,
  ProgramLive,
  VideoPlayer,
} from '../../../components';
import { LIVERSTREAM } from '../../../gql/query/livestreams/LiveStreams';
import { ILive } from '../../../models/LiveStream';
import { IProgram } from '../../../models/Program';
import { RootNavigationProps } from '../../../navigation/types/RootStackTypes';
import { useAppSelector } from '../../../redux/hooks';
import { useTheme } from '../../../Styles/Styles';
import DeviceInfo from 'react-native-device-info';
import { TrackPlayerReset } from '../../../services/service';
import { useApolloClient } from '@apollo/client';
import { LiveSkeleton } from './LIveSkeleton';
import { MusicPlayerContext } from '../../../contexts/musicContext';
import { ButtonQuestion } from './components/ButtonQuestion';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NextProgram } from './components/NextProgram';
import { CurrentProgram } from './components/CurrentProgram';
import PipHandler, { usePipModeListener } from 'react-native-pip-android';

export const ViewLive: React.FC<RootNavigationProps<'ViewLive'>> = props => {
  const { route, navigation } = props;
  const { id } = route.params;
  const screenWidth = useWindowDimensions().width;
  const [data, setData] = React.useState<ILive | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { colors } = useTheme();
  const user = useAppSelector(state => state.user.data);
  const client = useApolloClient();
  const musicContext = React.useContext(MusicPlayerContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const appState = React.useRef(AppState.currentState);

  const insets = useSafeAreaInsets();
  const inPipMode = usePipModeListener();

  const [programs, setPrograms] = React.useState<IProgram[]>([]);

  const update = React.useCallback(async () => {
    try {
      TrackPlayerReset().then(() => {
        musicContext.setMusicPlayerOption({
          music: null,
          album: undefined,
          albumID: 0,
          type: undefined,
        });
      });
      setLoading(true);
      let response = await client.query({
        query: LIVERSTREAM,
        variables: {
          id: id,
        },
      });

      if (response.data.liveStream) {
        setData(response.data.liveStream);
        setIsOpen(response.data.liveStream.isOpen);
        AppMetrica.reportEvent('VIEW_LIVE', {
          user: user,
          live_name: response.data.liveStream.name,
          date: new Date(),
          date_string: new Date().toString(),
          platform: Platform.OS,
          device_id: !user ? DeviceInfo.getDeviceId() : undefined,
          app_version: DeviceInfo.getVersion(),
        });
        // start();
      }
    } catch (e: unknown) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2: 'При загрузке данных произошла ошибка',
      });
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, id, user]);

  React.useEffect(() => {
    update();
  }, [update]);

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState == "background") {
        PipHandler.enterPipMode();
        navigation.setOptions({
          headerShown: false,
        });
      } else {
        navigation.setOptions({
          headerShown: true,
        });
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);



  return (
    <View style={{ flex: 1, backgroundColor: colors.bgSecondary }}>
      {data?.url ? (
        <VideoPlayer
          urls={{
            url: data?.url + '?zoid=app' ?? '',
            hls: data.media?.hls ?? [],
          }}
          live={true}
        />
      ) : (
        <View
          style={{
            height: (screenWidth / 16) * 9,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={colors.colorMain} size={'large'} />
        </View>
      )}

      <Containter style={{ paddingBottom: 0 }}>
        {loading && programs.length > 0 ? (
          <LiveSkeleton />
        ) : (
          <>
            <NextProgram programs={programs} />
            <BoldText fontSize={18} style={{ marginTop: 10, fontWeight: '800' }}>
              {data?.name ?? ''}
            </BoldText>
            <CurrentProgram programs={programs} />
          </>
        )}
      </Containter>
      <View
        style={{
          flex: 1,
          marginTop: 25,
          paddingBottom: isOpen ? 75 + insets.bottom : insets.bottom,
        }}>
        <ProgramLive id={id} setPrograms={setPrograms} />
      </View>
      <ButtonQuestion id={id} initialIsOpen={isOpen} setIsOpen={setIsOpen} />
    </View>
  );
};
