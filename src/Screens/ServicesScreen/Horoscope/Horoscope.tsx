import * as React from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  useWindowDimensions,
  ScrollView,
  StatusBar,
  FlatList,
  ActivityIndicator,
  NativeModules,
} from 'react-native';
import BoldText from '../../../components/BoldText';
import RegularText from '../../../components/RegularText';
import {ArrowLeft} from '../../../components/SVGcomponents/ArrowLeft';
import {Burger} from '../../../components/SVGcomponents/Burger';
import {LeftCircle} from '../../../components/SVGcomponents/LeftCircle';
import {NativitySubstract} from '../../../components/SVGcomponents/NativitySubstract';
import {RightCircle} from '../../../components/SVGcomponents/RightCircle';
import {useTheme} from '../../../Styles/Styles';

import {RootNavigationProps} from '../../../navigation/types/RootStackTypes';
import {
  horoscopeAvatar,
  horoscopeName,
} from '../../../helpers/horoscopeHelpers';
import {IZodiacPeriod, IHoroscope} from '../../../models/Horoscope';
import {ModalSide} from '../../../components/ModalSide';
import {zodiacPeriods, zodiacNameFind} from '../../../helpers/horoscopeHelpers';
import MediumText from '../../../components/MediumText';
import {StyleSheet, Platform} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {HoroscopeSlide} from '../../../components/HoroscopeSlide';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import {getUpdateClient} from '../../../requests/updateHeaders';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import DeviceInfo from 'react-native-device-info';
import {HOROSCOPE} from '../../../gql/query/horoscopes/Horoscopes';

export const Horoscope: React.FC<RootNavigationProps<'Horoscope'>> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  const layout = useWindowDimensions();
  const {StatusBarManager} = NativeModules;
  const birthday = useAppSelector(state => state.user.data?.birthdate);
  const user = useAppSelector(state => state.user.data);
  const [zodiac, setZodiac] = React.useState<IZodiacPeriod>(zodiacPeriods[0]);
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [today, setToday] = React.useState<IHoroscope>({} as IHoroscope);
  const [week, setWeek] = React.useState<IHoroscope>({} as IHoroscope);
  const [month, setMonth] = React.useState<IHoroscope>({} as IHoroscope);
  dayjs.extend(isoWeek);
  dayjs().isoWeekday(1);

  React.useEffect(() => {
    setZodiac(
      zodiacPeriods?.find(
        item =>
          item.value ===
          (birthday &&
            zodiacNameFind(
              new Date(birthday).getDate(),
              new Date(birthday).getMonth(),
            )),
      ) ?? zodiacPeriods[0],
    );
  }, [birthday]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const client = await getUpdateClient();
      await client
        .query({
          query: HOROSCOPE,
          variables: {
            name: zodiac.name,
            date: dayjs().format('YYYY-MM-DD'),
          },
        })
        .then(res => {
          setToday(res.data.horoscopeSign.daily[0]);
          setWeek(res.data.horoscopeSign.weekly[0]);
          setMonth(res.data.horoscopeSign.monthly[0]);
          AppMetrica.reportEvent('HOROSCOPE', {
            user: user,
            horoscope_name: zodiac.name,
            platform: Platform.OS,
            date: new Date(),
            date_string: new Date().toString(),
            device_id: !user ? DeviceInfo.getDeviceId() : undefined,
            app_version: DeviceInfo.getVersion(),
          });
        })
        .catch(e => {
          console.log(JSON.stringify(e, null, 2));
        })
        .finally(() => {
          setLoading(false);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zodiac]);

  return (
    <View style={{flex: 1, backgroundColor: colors.darkblue}}>
      <StatusBar backgroundColor={'#1F3596'} barStyle={'light-content'} />
      <ModalSide visible={modal} setVisible={setModal}>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            data={zodiacPeriods}
            contentContainerStyle={{
              paddingTop: 30,
            }}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.modalZodiacPeriod,
                  {
                    backgroundColor:
                      zodiac.id === item.id
                        ? colors.bgSecondary
                        : colors.fillPrimary,
                  },
                ]}
                onPress={() => {
                  setZodiac(item);
                  setModal(false);
                }}>
                <MediumText fontSize={14}>{item.name}</MediumText>
                <RegularText fontSize={12} style={{color: colors.gray}}>
                  {item.period}
                </RegularText>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </ModalSide>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.darkblue,
            marginTop: Platform.OS === 'android' ? 5 : StatusBarManager.HEIGHT,
          },
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ArrowLeft color={colors.white} />
          <BoldText
            fontSize={16}
            style={{
              fontWeight: '700',
              marginLeft: 15,
              color: colors.white,
              marginBottom: 2,
            }}>
            Гороскоп
          </BoldText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={[
            styles.headerRightButton,
            {
              borderColor: colors.white,
            },
          ]}>
          <Burger color={colors.white} />
          <BoldText fontSize={12} style={{color: colors.white, marginLeft: 10}}>
            Список
          </BoldText>
        </TouchableOpacity>
      </View>
      <Image
        resizeMode="cover"
        source={require('../../../assets/images/nativityBackground.png')}
        style={{
          width: layout.width,
          height: layout.height,
          position: 'absolute',
          zIndex: -1,
          top: 0,
        }}
      />
      <View style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 30}}
          style={{flex: 1}}>
          <View
            style={[styles.horoscope, {backgroundColor: colors.fillPrimary}]}>
            <View
              style={{position: 'absolute', alignSelf: 'center', top: -54.9}}>
              <NativitySubstract color={colors.fillPrimary} />
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  zIndex: 100,
                  top: 10,
                }}>
                {horoscopeAvatar(zodiac.value)}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() =>
                  setZodiac(
                    zodiacPeriods.find(
                      item => item.value === zodiac.beforeValue,
                    ) ?? zodiac,
                  )
                }
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <LeftCircle />
                <BoldText fontSize={12} style={{marginLeft: 10}}>
                  {horoscopeName(zodiac.beforeValue).toUpperCase()}
                </BoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setZodiac(
                    zodiacPeriods.find(
                      item => item.value === zodiac.afterValue,
                    ) ?? zodiac,
                  )
                }
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <BoldText fontSize={12} style={{marginRight: 10}}>
                  {horoscopeName(zodiac.afterValue).toUpperCase()}
                </BoldText>
                <RightCircle />
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <BoldText fontSize={18}>
                {horoscopeName(zodiac.value).toUpperCase()}
              </BoldText>
              <RegularText fontSize={12} style={{marginTop: 5}}>
                Сегодня ,{' '}
                {new Date().toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                })}
                .
              </RegularText>
            </View>
            <View
              style={{
                marginTop: 35,
                marginBottom: today?.content ? 0 : 45,
              }}>
              {loading ? (
                <ActivityIndicator size="large" color={colors.orange} />
              ) : (
                <RegularText
                  fontSize={14}
                  style={{
                    textAlign: 'center',
                    lineHeight: 22,
                  }}>
                  {today?.content ?? (
                    <RegularText
                      style={{
                        color: colors.textSecondary,
                      }}>
                      Гороскоп на данный день отсутствует
                    </RegularText>
                  )}
                </RegularText>
              )}
            </View>
          </View>
          <HoroscopeSlide
            emptyText="Гороскоп на неделю отсутствует"
            loadong={loading}
            logo={
              <Image
                style={{height: 86, width: 86, borderTopRightRadius: 24}}
                source={require('../../../assets/images/Moonlit.png')}
              />
            }
            title={'Гороскоп на эту неделю'}
            datePeriodText={`${dayjs()?.isoWeekday(1)?.format('DD')} - ${dayjs()
              ?.isoWeekday(7)
              ?.format('DD')} ${new Date(
              dayjs()?.isoWeekday(7)?.toString(),
            )?.toLocaleDateString('ru-RU', {month: 'short'})}`}
            text={week?.content ?? ''}
          />
          <HoroscopeSlide
            emptyText="Гороскоп на месяц отсутствует"
            loadong={loading}
            logo={
              <Image
                style={{height: 86, width: 86, borderTopRightRadius: 24}}
                source={require('../../../assets/images/Constellation.png')}
              />
            }
            title={'Гороскоп на этот месяц'}
            datePeriodText={`01 - ${dayjs()?.daysInMonth()} ${new Date()?.toLocaleDateString(
              'ru-RU',
              {month: 'short'},
            )}`}
            text={month?.content ?? ''}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 46,
    justifyContent: 'space-between',
    paddingLeft: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRightButton: {
    flexDirection: 'row',
    width: 97,
    height: 38,
    borderRadius: 66,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginRight: 15,
  },
  separator: {
    marginVertical: 10,
    marginHorizontal: 75,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#EFEFF0',
  },
  horoscope: {
    marginHorizontal: 15,
    alignSelf: 'stretch',
    borderRadius: 25,
    marginTop: 55,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  iconBottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  modalZodiacPeriod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    paddingLeft: 20,
    paddingRight: 15,
    alignItems: 'center',
  },
});
