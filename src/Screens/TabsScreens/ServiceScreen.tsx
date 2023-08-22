import * as React from 'react';
import {useWindowDimensions, ScrollView, Platform} from 'react-native';
import {SafeAreaView, View, Image, TouchableOpacity} from 'react-native';
import BoldText from '../../components/BoldText';
import RegularText from '../../components/RegularText';
import {Nativity} from '../../components/SVGcomponents/Nativity';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
// import Weather from '../../components/Weather';
import Currentcies from '../../components/Currentcies';
import {LogoType} from '../../components/SVGcomponents/Logotype';
import {useTheme} from '../../Styles/Styles';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {fetchFavorite} from '../../redux/thunks/favorite/GetFavorites';
import {LIVESTREAMS_IDS} from '../../gql/query/livestreams/LiveStreams';
import {getUpdateClient} from '../../requests/updateHeaders';
import remoteConfig from '@react-native-firebase/remote-config';

function Header({backgroundColor}: { backgroundColor: string }) {
    return (
        <SafeAreaView>
            <View
                style={{
                    height: 46,
                    backgroundColor: backgroundColor,
                    justifyContent: 'center',
                    paddingLeft: 15,
                }}>
                <LogoType/>
            </View>
        </SafeAreaView>
    );
}

export const ServiceScreen: React.FC<TabNavigationProps<'Services'>> = ({
                                                                            navigation,
                                                                        }) => {
    const {colors} = useTheme();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const [data, setData] = React.useState<{ id: number; name: string }[]>([]);

    const update = React.useCallback(async () => {
        try {
            let client = await getUpdateClient(token);
            let response = await client.query({
                query: LIVESTREAMS_IDS,
            });
            if (response.data) {
                setData(response.data.liveStreams);
            }
        } catch (e) {
            console.log('e livestreams', e);
        }
    }, [token]);

    React.useEffect(() => {
        (async () => {
            if (token) {
                await dispatch(fetchFavorite(token));
            }
        })();
        update();
    }, [token, update, dispatch]);

    return (
        <View style={{flex: 1, backgroundColor: colors.fillPrimary}}>
            <Header backgroundColor={colors.fillPrimary}/>
            <ScrollView
                style={{flex: 1, backgroundColor: colors.bgSecondary}}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}
                contentContainerStyle={{
                    paddingBottom: 145,
                }}>
                <ScrollView
                    horizontal
                    keyboardShouldPersistTaps={'always'}
                    contentContainerStyle={{padding: 15}}
                    showsHorizontalScrollIndicator={false}
                    style={{flexGrow: 0}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Horoscope')}
                        style={{
                            paddingHorizontal: 10,
                            paddingVertical: 12,
                            height: 68,
                            borderRadius: 15,
                            backgroundColor: colors.fillPrimary,
                            marginRight: 10,
                            flexDirection: 'row',
                        }}>
                        <Nativity/>
                        <View style={{marginLeft: 10, justifyContent: 'space-between'}}>
                            <BoldText fontSize={14} style={{fontWeight: '700'}}>
                                Гороскоп
                            </BoldText>
                            <RegularText fontSize={12}>
                                На{' '}
                                {new Date().toLocaleDateString('ru-RU', {
                                    day: '2-digit',
                                    month: 'short',
                                })}
                            </RegularText>
                        </View>
                    </TouchableOpacity>
                    {/* <Weather /> */}
                    <Currentcies/>
                </ScrollView>
                <ScrollView
                    horizontal
                    keyboardShouldPersistTaps={'always'}
                    contentContainerStyle={{paddingLeft: 15, marginBottom: 15}}
                    showsHorizontalScrollIndicator={false}
                    style={{flexGrow: 0}}>
                    {Platform.OS === 'ios' ? (
                        remoteConfig().getValue('broadcast_visible').asBoolean() ? (
                            <ServiceItem
                                size="small"
                                navName="Broadcasts"
                                source={require('../../assets/images/broadcast_logo.png')}
                                mr={2}
                                navigation={navigation}
                            />
                        ) : (
                            <></>
                        )
                    ) : remoteConfig()
                        .getValue('broadcast_android_visible')
                        .asBoolean() ? (
                        <ServiceItem
                            size="small"
                            navName="Broadcasts"
                            source={require('../../assets/images/broadcast_logo.png')}
                            mr={2}
                            navigation={navigation}
                        />
                    ) : (
                        <></>
                    )}
                    {Platform.OS === 'ios' ? (
                        remoteConfig().getValue('music_visible').asBoolean() ? (
                            <ServiceItem
                                size="small"
                                navName="Music"
                                source={require('../../assets/images/music_logo.png')}
                                mr={2}
                                navigation={navigation}
                            />
                        ) : (
                            <></>
                        )
                    ) : remoteConfig().getValue('music_android_visible').asBoolean() ? (
                        <ServiceItem
                            size="small"
                            navName="Music"
                            source={require('../../assets/images/music_logo.png')}
                            mr={2}
                            navigation={navigation}
                        />
                    ) : (
                        <></>
                    )}
                    <ServiceItem
                        size="small"
                        navName="Podcast"
                        source={require('../../assets/images/podcast_logo.png')}
                        mr={2}
                        navigation={navigation}
                    />
                    <ServiceItem
                        size="small"
                        navName="Series"
                        source={require('../../assets/images/series_logo.png')}
                        mr={2}
                        navigation={navigation}
                    />
                    <ServiceItem
                        size="small"
                        navName="Films"
                        source={require('../../assets/images/films_logo.png')}
                        mr={2}
                        navigation={navigation}
                    />
                    <ServiceItem
                        size="small"
                        navName="Cartoons"
                        source={require('../../assets/images/films_logo.png')}
                        mr={2}
                        navigation={navigation}
                    />
                    <ServiceItem
                        size="small"
                        navName="ServicesScreen"
                        source={require('../../assets/images/services_logo.png')}
                        mr={2}
                        navigation={navigation}
                    />

                </ScrollView>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        marginBottom: 15,
                    }}>
                    <ServiceItem
                        size="large"
                        navName="ViewLive"
                        source={require('../../assets/images/nvk_sakha_logo.png')}
                        navigation={navigation}
                        navParams={{
                            id: data.find(item => item.name === "НВК 'САХА'")?.id ?? 5,
                            live: 'saha',
                        }}
                    />
                    <ServiceItem
                        size="large"
                        navName="ViewLive"
                        source={require('../../assets/images/yakutia24_logo.png')}
                        navigation={navigation}
                        navParams={{
                            id: data.find(item => item.name === 'Якутия 24')?.id ?? 6,
                            live: 'Saha24',
                        }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        marginBottom: 15,
                    }}>
                    <ServiceItem
                        size="large"
                        navName="RadioScreen"
                        source={require('../../assets/images/tetim_logo.png')}
                        navigation={navigation}
                    />
                    <ServiceItem
                        size="large"
                        navName="ViewLive"
                        source={require('../../assets/images/mamont_logo.png')}
                        navigation={navigation}
                        navParams={{
                            id: data.find(item => item.name === 'Мамонт')?.id ?? 7,
                            live: 'Mamont',
                        }}
                    />
                </View>
                {/* <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
          }}>
          <ServiceItem
            size="large"
            navName="ViewLive"
            source={require('../../assets/images/nvkServices.png')}
            navigation={navigation}
            navParams={{
              id: data.find(item => item.name === "НВК 'САХА'")?.id ?? 5,
              live: 'saha',
            }}
          />
          <ServiceItem
            size="small"
            navName="ViewLive"
            source={require('../../assets/images/yakutia24.png')}
            navigation={navigation}
            navParams={{
              id: data.find(item => item.name === 'Якутия 24')?.id ?? 6,
              live: 'Saha24',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            marginTop: 15,
          }}>
          <ServiceItem
            size="small"
            navName="ViewLive"
            source={require('../../assets/images/mamontIcon.png')}
            navigation={navigation}
            navParams={{
              id: data.find(item => item.name === 'Мамонт')?.id ?? 7,
              live: 'Mamont',
            }}
          />
          <ServiceItem
            size="large"
            navName="RadioScreen"
            source={require('../../assets/images/tetim_rectangle.png')}
            navigation={navigation}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            marginTop: 15,
          }}>
          <ServiceItem
            size="small"
            navName="Broadcasts"
            source={require('../../assets/images/tvBroadcast.png')}
            mr={2}
            navigation={navigation}
          />
          <ServiceItem
            size="small"
            navName="Music"
            source={require('../../assets/images/musicIcon.png')}
            mr={2}
            navigation={navigation}
          />
          <ServiceItem
            size="small"
            navName="Podcast"
            source={require('../../assets/images/broadcastIcon.png')}
            mr={2}
            navigation={navigation}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            marginTop: 15,
          }}>
          <ServiceItem
            size="large"
            navName="ServicesScreen"
            source={require('../../assets/images/servicesIcon.png')}
            navigation={navigation}
          />
        </View> */}
            </ScrollView>
        </View>
    );
};

interface IServiceItem {
    size: 'large' | 'small';
    navName:
        | 'ServicesScreen'
        | 'Music'
        | 'Broadcasts'
        | 'RadioScreen'
        | 'ViewLive'
        | 'Films'
        | 'Series'
        | 'Cartoons'
        | 'Podcast';
    source: any;
    mr?: number;
    navigation: TabNavigationProps<'Services'>['navigation'];
    navParams?: {
        live?: string;
        title?: string;
        url?: string;
        imageUrl?: string;
        author?: string;
        trackTitle?: string;
        id?: number;
    };
}

const ServiceItem = (props: IServiceItem) => {
    const {source, size, mr = 1, navigation, navName, navParams} = props;
    const screenWidth = useWindowDimensions().width;

    return (
        <TouchableOpacity
            style={{
                marginRight: mr ? 15 : 0,
            }}
            onPress={() => {
                switch (navName) {
                    case 'Broadcasts':
                    case 'Music':
                    case 'Podcast':
                    case 'ServicesScreen':
                    case 'Series':
                    case 'Films':
                        navigation.navigate(navName);
                        break;
                    case 'Cartoons':
                        navigation.navigate(navName);
                        break;
                    case 'RadioScreen':
                        navigation.navigate('RadioScreen', {
                            title: navParams?.title ?? '',
                            url: navParams?.url ?? '',
                            imageUrl: navParams?.imageUrl ?? '',
                            author: navParams?.author ?? '',
                            trackTitle: navParams?.trackTitle ?? '',
                        });
                        break;
                    case 'ViewLive':
                        navigation.navigate('ViewLive', {
                            id: navParams?.id ?? 1,
                            live: navParams?.live ?? 'saha',
                        });
                        break;
                }
            }}>
            <Image
                source={source}
                resizeMode="cover"
                style={{
                    width: size === 'large' ? (screenWidth - 45) / 2 : 104,
                    height: size === 'large' ? 140 : 100,
                    borderRadius: 20,
                }}
            />
        </TouchableOpacity>
    );
};
