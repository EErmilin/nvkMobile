import React from 'react';
import {
  TextStyle,
  StyleProp,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {useTheme} from '../Styles/Styles';
import MediumText from './MediumText';
import {weatherConditionIcon} from '../helpers/weatherHelpers';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getWeather} from '../redux/thunks/main/GetWeather';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import DeviceInfo from 'react-native-device-info';
import {useIsFocused} from '@react-navigation/native';
import YandexWeatherLogo from './SVGcomponents/YandexWeatherLogo';

interface WeatherProps {
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Weather: React.FC<WeatherProps> = props => {
  const {colors} = useTheme();
  const lat = '62.032770';
  const lon = '129.751014';
  const weatherRedux = useAppSelector(state => state.main.weather);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);
  const focus = useIsFocused();

  const getWeatherFunction = React.useCallback(async () => {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS).then(async result => {
        switch (result) {
          case RESULTS.DENIED:
          case RESULTS.BLOCKED:
            await dispatch(
              getWeather({
                lat,
                lon,
                date: weatherRedux.date,
              }),
            );
            break;
          case RESULTS.GRANTED:
          case RESULTS.LIMITED:
            Geolocation.getCurrentPosition(async ({coords}) => {
              await dispatch(
                getWeather({
                  lat: coords.latitude.toString(),
                  lon: coords.longitude.toString(),
                  date: weatherRedux.date,
                }),
              );
            });
            break;
        }
      });
    } else {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(async result => {
        switch (result) {
          case RESULTS.DENIED:
          case RESULTS.BLOCKED:
            await dispatch(
              getWeather({
                lat,
                lon,
                date: weatherRedux.date,
              }),
            );
            break;
          case RESULTS.GRANTED:
          case RESULTS.LIMITED:
            Geolocation.getCurrentPosition(async ({coords}) => {
              await dispatch(
                getWeather({
                  lat: coords.latitude.toString(),
                  lon: coords.longitude.toString(),
                  date: weatherRedux.date,
                }),
              );
            });
            break;
        }
      });
    }
  }, [dispatch, weatherRedux.date]);

  React.useEffect(() => {
    focus && getWeatherFunction();
  }, [focus, getWeatherFunction]);

  return (
    <TouchableOpacity
      onPress={async () => {
        AppMetrica.reportEvent('WEATHER_VIEW', {
          user: user,
          date: new Date(),
          date_string: new Date().toString(),
          platform: Platform.OS,
          device_id: !user ? DeviceInfo.getDeviceId() : undefined,
          app_version: DeviceInfo.getVersion(),
        });
        await Linking.openURL('https://yandex.ru/pogoda/');
      }}
      style={[
        {
          height: 68,
          borderRadius: 15,
          backgroundColor: colors.fillPrimary,
          marginRight: 10,
          paddingHorizontal: 10,
          paddingVertical: 12,
          justifyContent: 'space-between',
        },
        props.style,
      ]}>
      {/* <BoldText numberOfLines={1} fontSize={12} style={{fontWeight: '700'}}>
        Яндекс Погода
      </BoldText> */}
      <YandexWeatherLogo color={colors.textPrimary} />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <MediumText
          style={{
            alignSelf: 'flex-end',
            fontWeight: '700',
            marginRight: 5,
            marginBottom: Platform.OS === 'android' ? 2 : 0,
          }}>
          {weatherRedux.temperature ?? 'C'}°
        </MediumText>
        {weatherConditionIcon(weatherRedux.condition)}
      </View>
    </TouchableOpacity>
  );
};

export default Weather;
