import * as React from 'react';
import {View, Image, Platform} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import Toast from 'react-native-toast-message';

import {RegularText, Button, FormContainer} from '../../components';
import {LoginNavigationProps} from '../../navigation/types/LoginTypes';
import {useTheme} from '../../Styles/Styles';
import {useAppSelector} from '../../redux/hooks';
import DeviceInfo from 'react-native-device-info';

export const PlacementPermissionScreen = (
  props: LoginNavigationProps<'PlacementPermissionScreen'>,
) => {
  const {navigation} = props;
  const {colors, theme} = useTheme();
  const user = useAppSelector(state => state.user.data);
  const [loading, setLoading] = React.useState(false);

  return (
    <FormContainer style={{backgroundColor: colors.fillPrimary}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <View>
          <Image
            style={{}}
            source={
              theme === 'dark'
                ? require('../../assets/images/notif_perm.png')
                : require('../../assets/images/notif_perm_light.png')
            }
          />
          <RegularText
            style={{
              textAlign: 'center',
              marginTop: 10,
              color: colors.textPrimary,
            }}>
            Разрешите приложению использовать данные о вашем местоположении,
            чтобы получать информацию о погоде
          </RegularText>
        </View>
        <View>
          <Button
            style={{backgroundColor: colors.fillPrimary}}
            textStyle={{color: colors.colorMain}}
            title="Нет, спасибо"
            onPress={() => {
              navigation.navigate('PhoneInputScr');
            }}
          />
          <Button
            style={{marginTop: 15, backgroundColor: colors.colorMain}}
            title="Разрешить местоположение"
            loading={loading}
            loadingColor={theme === 'dark' ? colors.black : colors.white}
            loadingSize={'small'}
            onPress={() => {
              if (Platform.OS === 'ios') {
                setLoading(true);
                request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
                  switch (result) {
                    case RESULTS.GRANTED:
                    case RESULTS.LIMITED: {
                      console.log('result location', result);
                      AppMetrica.reportEvent('PLACEMENT_GRANTED', {
                        user: user,
                        date: new Date(),
                        date_string: new Date().toString(),
                        platform: Platform.OS,
                        device_id: !user ? DeviceInfo.getDeviceId() : undefined,
                        app_version: DeviceInfo.getVersion(),
                      });
                      navigation.navigate('PhoneInputScr');
                      break;
                    }
                    case RESULTS.DENIED:
                    case RESULTS.BLOCKED:
                    case RESULTS.UNAVAILABLE: {
                      console.log('result location', result);
                      AppMetrica.reportEvent('PLACEMENT_NOT_GRANTED', {
                        user: user,
                        date: new Date(),
                        date_string: new Date().toString(),
                        platform: Platform.OS,
                        device_id: !user ? DeviceInfo.getDeviceId() : undefined,
                        status: result,
                        app_version: DeviceInfo.getVersion(),
                      });
                      Toast.show({
                        type: 'error',
                        text1:
                          result === 'blocked'
                            ? 'Доступ заблокирован'
                            : result === 'denied'
                            ? 'Доступ запрещен'
                            : 'Доступ не доступен',
                        text2: 'Проверьте в настройках',
                      });
                      setTimeout(() => {
                        openSettings()
                          .then()
                          .catch()
                          .finally(() => {
                            setLoading(false);
                          });
                      }, 2000);
                      break;
                    }
                  }
                });
              } else {
                setLoading(true);
                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
                  result => {
                    switch (result) {
                      case RESULTS.GRANTED:
                      case RESULTS.LIMITED: {
                        console.log('result location', result);
                        AppMetrica.reportEvent('PLACEMENT_GRANTED', {
                          user: user,
                          date: new Date(),
                          date_string: new Date().toString(),
                          platform: Platform.OS,
                          device_id: !user
                            ? DeviceInfo.getDeviceId()
                            : undefined,
                          status: result,
                          app_version: DeviceInfo.getVersion(),
                        });
                        setLoading(false);
                        navigation.navigate('PhoneInputScr');
                        break;
                      }
                      case RESULTS.DENIED:
                      case RESULTS.BLOCKED:
                      case RESULTS.UNAVAILABLE: {
                        AppMetrica.reportEvent('PLACEMENT_NOT_GRANTED', {
                          user: user,
                          date: new Date(),
                          date_string: new Date().toString(),
                          platform: Platform.OS,
                          device_id: !user
                            ? DeviceInfo.getDeviceId()
                            : undefined,
                          status: result,
                          app_version: DeviceInfo.getVersion(),
                        });
                        Toast.show({
                          type: 'error',
                          text1:
                            result === 'blocked'
                              ? 'Доступ заблокирован'
                              : result === 'denied'
                              ? 'Доступ запрещен'
                              : 'Доступ не доступен',
                          text2: 'Проверьте в настройках',
                        });
                        setTimeout(() => {
                          openSettings()
                            .then()
                            .catch()
                            .finally(() => {
                              setLoading(false);
                            });
                        }, 2000);

                        break;
                      }
                    }
                  },
                );
              }
            }}
          />
        </View>
      </View>
    </FormContainer>
  );
};
