import * as React from 'react';
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import {Button, Containter, MediumText} from '../../components';
import {Hashtag} from '../../components/SVGcomponents';
import {localRegions} from '../../helpers/regions';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {setRegionScreen} from '../../redux/slices/authSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getProfile} from '../../redux/thunks/user/GetProfile';
import {updateUser} from '../../redux/thunks/user/UpdateUser';
import {useTheme} from '../../Styles/Styles';
import DeviceInfo from 'react-native-device-info';

export const Region = (props: RootNavigationProps<'Region'>) => {
  const {navigation} = props;
  const {colors, theme} = useTheme();
  const user = useAppSelector(state => state.user.data);
  const [choose, setChoose] = React.useState<string[]>(
    user?.hashtags?.map(item => item.hashtag.name) ?? [],
  );
  const [loading, setLoading] = React.useState(false);
  const [loadingNext, setLoadingNext] = React.useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);

  const update = React.useCallback(async () => {
    if (token) {
      setLoading(true);
      const response = await dispatch(getProfile());
      console.log('response', response);
      setLoading(false);
    }
  }, [dispatch, token]);

  const HeaderRight = React.useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setRegionScreen(true));
          AppMetrica.reportEvent('REGION_SKIP', {
            user: user,
            date: new Date(),
            date_string: new Date().toString(),
            platform: Platform.OS,
            device_id: !user ? DeviceInfo.getDeviceId() : undefined,
            app_version: DeviceInfo.getVersion(),
          });
          navigation.replace('Tabs');
        }}>
        <MediumText style={{color: colors.colorMain}}>Пропустить</MediumText>
      </TouchableOpacity>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors.colorMain, dispatch, navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [HeaderRight, navigation]);

  React.useEffect(() => {
    update();
  }, [dispatch, update]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Containter style={{paddingTop: 0, flex: 1}}>
        <FlatList
          data={localRegions}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles.touchItem,
                {
                  shadowColor: colors.background,
                  backgroundColor: choose.includes(item)
                    ? colors.colorMain
                    : colors.bgPrimary,
                  marginBottom: index === localRegions.length - 1 ? 20 : 0,
                },
              ]}
              onPress={() => {
                if (choose.includes(item)) {
                  setChoose(choose.filter(item2 => item2 !== item));
                } else {
                  if (choose.length < 3) {
                    setChoose(choose.concat(item));
                  } else {
                    Toast.show({
                      type: 'error',
                      text1: 'Ошибка',
                      text2: 'Достигнуто максимальное количество',
                    });
                  }
                }
              }}>
              <Hashtag
                color={
                  choose.includes(item) ? colors.colorMain : colors.bgPrimary
                }
                stroke={choose.includes(item) ? colors.white : colors.colorMain}
              />
              <MediumText
                style={{
                  marginLeft: 15,
                  color: choose.includes(item)
                    ? colors.white
                    : colors.textPrimary,
                }}>
                #{item}
              </MediumText>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={async () => {
                update();
              }}
              colors={[colors.colorMain]}
              tintColor={colors.colorMain}
            />
          }
        />
        <Button
          title="Далее"
          loading={loadingNext}
          loadingColor={theme === 'dark' ? colors.black : colors.white}
          onPress={async () => {
            setLoadingNext(true);
            let response = await dispatch(
              updateUser({
                hashtags: choose.map(item => {
                  return {name: item};
                }),
              }),
            );
            AppMetrica.reportEvent('REGION_SET', {
              user: user,
              date: new Date(),
              date_string: new Date(),
              platform: Platform.OS,
              device_id: !user ? DeviceInfo.getDeviceId() : undefined,
              regions: JSON.stringify(
                choose.map(item => {
                  return {name: item};
                }),
              ),
              app_version: DeviceInfo.getVersion(),
            });
            if (response.meta.requestStatus === 'fulfilled') {
              dispatch(setRegionScreen(true));
              setLoadingNext(false);
              navigation.replace('Tabs');
            } else {
              Toast.show({
                type: 'error',
                text1: 'Ошибка',
                text2: 'При сохранении хэштегов произошла ошибка',
              });
              setLoadingNext(false);
              console.log('respo', response);
            }
          }}
        />
      </Containter>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  touchItem: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingRight: 20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderRadius: 15,
    padding: 10,
  },
});
