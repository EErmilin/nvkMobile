import React from 'react';
import {
  TextStyle,
  StyleProp,
  TouchableOpacity,
  View,
  Linking,
  Platform,
} from 'react-native';
import {useTheme} from '../Styles/Styles';
import BoldText from './BoldText';
import MediumText from './MediumText';
import {RedFlagValute} from './SVGcomponents/RedFlagValute';
import {GreenFlagValue} from './SVGcomponents/GreenFlagValute';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import DeviceInfo from 'react-native-device-info';
import {useIsFocused} from '@react-navigation/native';
import {setCurrency} from '../redux/slices/mainSlice';

interface CurrentciesProps {
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Currentcies: React.FC<CurrentciesProps> = props => {
  const {colors} = useTheme();
  const currentciesRedux = useAppSelector(state => state.main.currency);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);
  const focus = useIsFocused();

  // console.log('cur Selev', currentciesRedux);

  const update = React.useCallback(async () => {
    try {
      const response = await fetch(
        'https://www.cbr-xml-daily.ru/daily_json.js',
        {
          method: 'GET',
        },
      );
      let responseData = await response.json();
      dispatch(
        setCurrency({
          usd: {
            value: parseFloat(responseData.Valute.USD.Value) ?? 0,
            previous: parseFloat(responseData.Valute.USD.Previous) ?? 0,
          },
          eur: {
            value: parseFloat(responseData.Valute.EUR.Value) ?? 0,
            previous: parseFloat(responseData.Valute.EUR.Previous) ?? 0,
          },
          cny: {
            value: parseFloat(responseData.Valute.CNY.Value) ?? 0,
            previous: parseFloat(responseData.Valute.CNY.Previous) ?? 0,
          },
        }),
      );
    } catch (e) {
      console.log('e currentcies', e);
    }
  }, [dispatch]);

  React.useEffect(() => {
    focus && update();
  }, [update, focus]);

  const flagDirection = ({
    value,
    previous,
  }: {
    value: number;
    previous: number;
  }) => {
    switch (true) {
      case value === previous:
        return <></>;
      case value > previous:
        return <GreenFlagValue />;
      case value < previous:
        return <RedFlagValute />;
      default:
        return <></>;
    }
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        AppMetrica.reportEvent('CURRENTCIES_VIEW', {
          user: user,
          date: new Date(),
          date_string: new Date().toString(),
          platform: Platform.OS,
          device_id: !user ? DeviceInfo.getDeviceId() : undefined,
          app_version: DeviceInfo.getVersion(),
        });
        await Linking.openURL('https://www.cbr.ru/key-indicators/');
      }}
      style={[
        {
          height: 68,
          borderRadius: 15,
          backgroundColor: colors.fillPrimary,
          paddingHorizontal: 10,
          paddingVertical: 12,
          justifyContent: 'space-between',
        },
        props.style,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            marginRight: 18,
          }}>
          <BoldText fontSize={12} style={{fontWeight: '700'}}>
            USD
          </BoldText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MediumText fontSize={12} style={{alignSelf: 'flex-end'}}>
              {currentciesRedux.usd.value.toFixed(2)}
            </MediumText>
            <View style={{marginLeft: 3, marginTop: 3}}>
              {flagDirection({
                value: currentciesRedux.usd.value,
                previous: currentciesRedux.usd.previous,
              })}
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            marginRight: 18,
          }}>
          <BoldText fontSize={12} style={{fontWeight: '700'}}>
            EUR
          </BoldText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MediumText fontSize={12} style={{alignSelf: 'flex-end'}}>
              {currentciesRedux.eur.value.toFixed(2)}
            </MediumText>
            <View style={{marginLeft: 3, marginTop: 3}}>
              {flagDirection({
                value: currentciesRedux.eur.value,
                previous: currentciesRedux.eur.previous,
              })}
            </View>
          </View>
        </View>

        <View style={{justifyContent: 'space-between'}}>
          <BoldText fontSize={12} style={{fontWeight: '700'}}>
            CNY
          </BoldText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MediumText fontSize={12} style={{alignSelf: 'flex-end'}}>
              {currentciesRedux.cny.value.toFixed(2)}
            </MediumText>
            <View style={{marginLeft: 3, marginTop: 3}}>
              {flagDirection({
                value: currentciesRedux.cny.value,
                previous: currentciesRedux.cny.previous,
              })}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Currentcies;
