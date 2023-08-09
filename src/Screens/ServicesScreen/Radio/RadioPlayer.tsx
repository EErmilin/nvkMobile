import * as React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {BoldText} from '../../../components';
import {themeColors} from '../../../Styles/Styles';
import {ArrowLeft} from '../../../components/SVGcomponents';
import {useNavigation} from '@react-navigation/native';
import {IProgram} from '../../../models/Program';
import TrackPlayer from 'react-native-track-player';
import {useApolloClient} from '@apollo/client';
import {RADIO} from '../../../gql/query/radios/Radio';
import {TrackPlayerReset} from '../../../services/service';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import DeviceInfo from 'react-native-device-info';
import {MusicPlayerContext} from '../../../contexts/musicContext';
import {RadioController} from './components/RadioController';
import {RadioBody} from './components/RadioBody';
import {
  setRadioImage,
  setRadioProgramRedux,
} from '../../../redux/slices/mainSlice';

const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 12,
        marginTop: Platform.OS === 'android' ? 5 : 0,
      }}>
      <TouchableOpacity
        style={{
          height: 44,
          width: 44,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <ArrowLeft color={themeColors.dark.colorMain} />
      </TouchableOpacity>
      <BoldText
        fontSize={16}
        style={{
          flex: 1,
          marginLeft: 5,
          marginBottom: 2,
          textAlignVertical: 'center',
          color: themeColors.dark.white,
        }}>
        Тэтим
      </BoldText>
    </View>
  );
};

export const RadioPlayer: React.FC = () => {
  const client = useApolloClient();

  const getCurrentTrack = React.useCallback((programs: IProgram[]) => {
    let now = new Date();

    let filters = programs.filter(
      program =>
        now >= new Date(program.date + 'T' + program.startTime) &&
        now <= new Date(program.date + 'T' + program.endTime),
    );

    if (filters.length > 0) {
      return filters[0].name;
    } else {
      return 'Тэтим';
    }
  }, []);

  const [loading, setLoading] = React.useState(false);
  const user = useAppSelector(state => state.user.data);
  const musicContext = React.useContext(MusicPlayerContext);
  const radioImage = useAppSelector(state => state.main.radioImage);
  const [avatarUrl, setAvatarUrl] = React.useState(radioImage);
  const radioProgramRedux = useAppSelector(state => state.main.radioProgram);
  const dispatch = useAppDispatch();
  const [programs, setPrograms] = React.useState<IProgram[]>(
    radioProgramRedux ?? [],
  );

  const update = React.useCallback(async () => {
    try {
      setLoading(true);
      let response = await client.query({
        query: RADIO,
        variables: {
          radioId: 1,
        },
      });
      dispatch(setRadioProgramRedux(response.data.radio.programs));
      dispatch(setRadioImage(response.data.radio.cover));
      setPrograms(response.data.radio.programs);
      if (musicContext.musicPlayerOption.type !== 'radio') {
        await TrackPlayerReset();
        await TrackPlayer.add([
          {
            url: response.data.radio.url,
            title: getCurrentTrack(response.data.radio?.programs ?? []),
            artist: 'Тэтим',
            artwork:
              response.data.radio.cover.length > 0
                ? response.data.radio.cover
                : require('../../../assets/images/tetimIcon.png'),
          },
        ]);
        AppMetrica.reportEvent('VIEW_RADIO', {
          user: user,
          date: new Date(),
          date_string: new Date().toString(),
          platform: Platform.OS,
          radio_name: response.data.radio?.name,
          device_id: !user ? DeviceInfo.getDeviceId() : undefined,
          app_version: DeviceInfo.getVersion(),
        });
        setAvatarUrl(response.data.radio.cover);
        musicContext.setMusicPlayerOption({
          albumID: 'radio',
          music: {
            title: getCurrentTrack(response.data.radio?.programs ?? []),
            artist: 'Тэтим',
            duration: 0,
            url: response.data.radio.url,
          },
          type: 'radio',
        });
        TrackPlayer.play();
      } else {
        setPrograms(radioProgramRedux);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicContext]);

  React.useEffect(() => {
    if (musicContext.musicPlayerOption.type !== 'radio') {
      update();
    }
  }, [musicContext.musicPlayerOption.type, update]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeColors.dark.bgRadio,
        justifyContent: 'space-between',
      }}>
      <StatusBar
        backgroundColor={themeColors.dark.bgRadio}
        barStyle={'light-content'}
      />
      <Header />
      <View style={{alignItems: 'center'}}>
        <RadioBody
          loading={loading}
          avatarUrl={avatarUrl}
          programs={programs}
        />
        <RadioController />
      </View>
      <View style={{height: 52}} />
    </SafeAreaView>
  );
};
