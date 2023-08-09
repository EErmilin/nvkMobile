import * as React from 'react';
import {
  Image,
  View,
  Linking,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import Toast from 'react-native-toast-message';
import ContentLoader, {Rect} from 'react-content-loader/native';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import {BoldText, Button, Containter, MediumText} from '../../../components';
import {RootNavigationProps} from '../../../navigation/types/RootStackTypes';
import {useTheme} from '../../../Styles/Styles';
import {useApolloClient} from '@apollo/client';
import {SERVICE} from '../../../gql/query/services/Services';
import {IService} from '../../../models/Service';
import {ANNOUNCEMENT} from '../../../gql/query/services/Announcements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from '../../../redux/hooks';
import DeviceInfo from 'react-native-device-info';
import {LeftCircle} from '../../../components/SVGcomponents';

const Skeleton = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ContentLoader
      width={screenWidth}
      height={screenHeight - 60}
      backgroundColor={colors.skeletonBg}
      foregroundColor={colors.skeletonFg}>
      <Rect width={screenWidth} height={180} />
      <Rect width={120} height={28} x={15} y={190} rx={13} ry={13} />
      <Rect
        width={(screenWidth - 30) * 0.7}
        height={26}
        rx={8}
        ry={8}
        x={15}
        y={228}
      />
      <Rect width={100} height={18} rx={6} ry={6} x={15} y={259} />
      <Rect width={screenWidth - 30} height={26} rx={8} ry={8} x={15} y={287} />
      <Rect
        width={((screenWidth - 30) / 3) * 2}
        height={26}
        rx={8}
        ry={8}
        x={15}
        y={287 + 36}
      />
      <Rect
        width={((screenWidth - 30) / 5) * 2}
        height={26}
        rx={8}
        ry={8}
        x={15}
        y={287 + 36 + 36}
      />
      <Rect
        width={screenWidth - 30}
        height={60}
        rx={16}
        ry={16}
        x={15}
        y={screenHeight - 60 - 60 - insets.bottom - 15}
      />
    </ContentLoader>
  );
};

export const ViewService = (props: RootNavigationProps<'ViewService'>) => {
  const {route} = props;
  const {type, id} = route.params;
  const {colors, theme} = useTheme();
  const screenWidth = useWindowDimensions().width;
  let client = useApolloClient();
  const [data, setData] = React.useState<IService | null>(null);
  const [loading, setLoading] = React.useState(false);
  const insets = useSafeAreaInsets();
  const user = useAppSelector(state => state.user.data);

  const update = React.useCallback(async () => {
    try {
      setLoading(true);
      let response = await client.query({
        query: type === 'Услуга' ? SERVICE : ANNOUNCEMENT,
        variables: {
          serviceId: type === 'Услуга' ? id : undefined,
          adId: type === 'Заявка на рекламу' ? id : undefined,
        },
      });
      AppMetrica.reportEvent('SERVICE_VIEW', {
        user: user,
        date: new Date(),
        date_string: new Date().toString(),
        platform: Platform.OS,
        device_id: !user ? DeviceInfo.getDeviceId() : undefined,
        service_type: type,
        service_data:
          type === 'Услуга'
            ? JSON.stringify({...response.data.service, content: undefined})
            : JSON.stringify({...response.data.ad, content: undefined}),
        app_version: DeviceInfo.getVersion(),
      });
      setData(type === 'Услуга' ? response.data.service : response.data.ad);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2:
          type === 'Заявка на рекламу'
            ? 'Не удалось получить рекламу'
            : 'Не удалось получить услугу',
      });
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, id, type]);

  React.useEffect(() => {
    update();
  }, [update]);

  if (loading && data === null) {
    return (
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        style={{flex: 1, backgroundColor: colors.bgSecondary}}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            colors={[colors.colorMain]}
            tintColor={colors.colorMain}
            onRefresh={() => {
              update();
            }}
          />
        }>
        <Skeleton />
      </ScrollView>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.bgSecondary}}>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        style={{flex: 1, marginBottom: data?.url ? 60 : 0}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            colors={[colors.colorMain]}
            tintColor={colors.colorMain}
            onRefresh={() => {
              update();
            }}
          />
        }>
        {data?.images ? (
          <Image
            style={{
              borderRadius: 20,
              backgroundColor: colors.textSecondary,
              height: 120,
              width: screenWidth - 30,
              alignSelf: 'center',
              marginTop: 20,
            }}
            resizeMode={Platform.OS === 'android' ? 'contain' : 'cover'}
            source={
              data.images.length > 0
                ? {uri: data?.images[0].url_1536}
                : require('../../../assets/images/emptyImageLong.png')
            }
          />
        ) : (
          <></>
        )}
        <Containter>
          <View
            style={{
              paddingVertical: 4,
              paddingHorizontal: 9,
              borderRadius: 26,
              backgroundColor: colors.colorMainInActive,
              alignSelf: 'flex-start',
              marginTop: data?.images ? 20 : 0,
            }}>
            <MediumText
              fontSize={12}
              style={{fontWeight: '600', color: colors.colorMain}}>
              {type}
            </MediumText>
          </View>
          <BoldText fontSize={16} style={{marginTop: 15, fontWeight: '700'}}>
            {data?.name}
          </BoldText>
          <MediumText
            fontSize={14}
            style={{
              color: colors.colorMain,
              fontWeight: '600',
              marginTop: 10,
            }}>
            от {data?.price} руб.
          </MediumText>
          {data?.content ? (
            <RenderHtml
              contentWidth={screenWidth}
              baseStyle={{
                color: colors.textPrimary,
                marginTop: 10,
                paddingBottom: insets.bottom,
              }}
              systemFonts={['NotoSans-Regular']}
              source={{
                html: data?.content ?? '',
              }}
            />
          ) : (
            <></>
          )}
        </Containter>
      </ScrollView>
      {data?.url ? (
        <Button
          title={data?.link_text ?? 'Перейти на сайт'}
          style={{
            marginHorizontal: 15,
            marginBottom: 15,
            position: 'absolute',
            bottom: insets.bottom,
            width: screenWidth - 30,
          }}
          onPress={() => {
            AppMetrica.reportEvent('SERVICE_VIEW_LINK', {
              user: user,
              service_data: JSON.stringify(data),
              date: new Date(),
              date_string: new Date().toString(),
              platform: Platform.OS,
              device_id: !user ? DeviceInfo.getDeviceId() : undefined,
              app_version: DeviceInfo.getVersion(),
            });
            Linking.openURL(data?.url);
          }}
          icon={
            <View
              style={{
                transform: [
                  {
                    rotate: '135deg',
                  },
                ],
              }}>
              <LeftCircle
                color={theme === 'dark' ? colors.black : colors.white}
              />
            </View>
          }
        />
      ) : (
        <></>
      )}
    </View>
  );
};
