import * as React from 'react';
import {View, Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Rate, {AndroidMarket} from 'react-native-rate';

import {BoldText, Divider, RegularText, NavLink} from '../../components';
import {LogoType} from '../../components/SVGcomponents';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {useAppSelector} from '../../redux/hooks';
import {useTheme} from '../../Styles/Styles';
import {getUpdateClient} from '../../requests/updateHeaders';
import {TERMS} from '../../gql/query/Terms';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const AboutScreen: React.FC<RootNavigationProps<'AboutScreen'>> = ({
  navigation,
}) => {
  const userId = useAppSelector(state => state.user.data?.id);
  const {colors} = useTheme();
  const [data, setData] = React.useState<{name: string; id: number}[]>([]);
  const insets = useSafeAreaInsets();

  const update = async () => {
    try {
      const client = await getUpdateClient();
      const response = await client.query({
        query: TERMS,
      });
      setData(response.data.terms);
    } catch (e) {
      console.log('e', e);
    } finally {
    }
  };

  React.useEffect(() => {
    update();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgSecondary,
        paddingHorizontal: 15,
        paddingTop: 15,
      }}>
      <View style={{flex: 1, backgroundColor: colors.bgSecondary}}>
        <View style={{alignItems: 'center', marginTop: 30}}>
          <LogoType />
        </View>
        <BoldText
          fontSize={16}
          style={{fontWeight: '700', textAlign: 'center', marginTop: 30}}>
          ГБУ РС(Я) НВК «Саха»
        </BoldText>
        <RegularText
          fontSize={14}
          style={{
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: 5,
          }}>
          Версия {DeviceInfo.getVersion()}
        </RegularText>
        <View style={{flex: 1, marginTop: 70}}>
          <NavLink
            text="Политика конфиденциальности"
            textStyle={{height: 24}}
            onPress={() => {
              navigation.navigate('PrivacyPolicy', {
                id: data.find(item => item.name.includes('ПОЛИТИКА'))?.id ?? 1,
              });
            }}
          />
          <Divider style={{marginVertical: 15}} />
          <NavLink
            text="Условия использования"
            onPress={() => {
              navigation.navigate('UseOfTerms', {
                id:
                  data.find(item => item.name.includes('ПОЛЬЗОВАТЕЛЬСКОЕ'))
                    ?.id ?? 0,
              });
            }}
          />
          <Divider style={{marginVertical: 15}} />
          <NavLink
            text="Оценить приложение"
            onPress={() => {
              const options = {
                AppleAppID: '6447428114',
                GooglePackageName: 'com.nvksakha',
                AmazonPackageName: 'com.nvksakha',
                // OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
                preferredAndroidMarket: AndroidMarket.Google,
                preferInApp: false,
                openAppStoreIfInAppFails: true,
                // fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
              };
              Rate.rate(options, (success, errorMessage) => {
                if (success) {
                  console.log('success', success);
                }
                if (errorMessage) {
                  console.log('Example page Rate.rate() error: ', errorMessage);
                }
              });
            }}
          />
          <Divider style={{marginVertical: 15}} />
          <NavLink
            text="Перейти на сайт"
            onPress={() => {
              Linking.openURL('https://nvk-online.ru');
            }}
          />
        </View>
      </View>
      {userId ? (
        <RegularText
          style={{
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: insets.bottom + 15,
          }}>
          ID пользователя: {userId}
        </RegularText>
      ) : (
        <></>
      )}
    </View>
  );
};
