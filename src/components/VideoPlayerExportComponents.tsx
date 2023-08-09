import React from 'react';
import {colors, useTheme} from '../Styles/Styles';
import {
  Platform,
  TouchableOpacity,
  View,
  NativeModules,
  StatusBar,
} from 'react-native';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import BoldText from './BoldText';
import {Settings} from './SVGcomponents/Settings';
import {NotFullscreen} from './SVGcomponents/media/NotFullscreen';
import {Play} from './SVGcomponents/media/Play';
import {Pause} from './SVGcomponents/media/Pause';
import {Fullscreen} from './SVGcomponents/media/Fullscreen';
import {ArrowLeft} from './SVGcomponents/ArrowLeft';
import {Slider} from '@miblanchard/react-native-slider';
import MediumText from './MediumText';
import dayjs from 'dayjs';
import {SliderOnChangeCallback} from '@miblanchard/react-native-slider/lib/types';
import {Close} from './SVGcomponents/Close';
import {FlatList, useWindowDimensions} from 'react-native';
import {
  Route,
  SceneRendererProps,
  TabBar,
  TabBarIndicator,
  TabView,
} from 'react-native-tab-view';
import {Divider} from './Divider';
import {IHlsBroadcast} from '../models/Broadcast';
import GoogleCast, {
  useRemoteMediaClient,
  useDevices,
  useCastDevice,
} from 'react-native-google-cast';
import {SkipRightVideo} from './SVGcomponents/media/SkipRightVideo';
import {SkipLeftVideo} from './SVGcomponents/media/SkipLeftVideo';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Chromecast} from './SVGcomponents';
import {ModalComponent} from './ModalComponent';
import RegularText from './RegularText';

// -----------------Function Component-------------

// -----------------ModalSetting-------------------

interface IRenderSceneProps extends SceneRendererProps {
  route: Route;
}
const DividerComponent = () => (
  <Divider
    style={{marginHorizontal: 15, backgroundColor: colors.greyProgram}}
  />
);

export const ModalSetting = ({
  modalSetting,
  setModalSetting,
  urls,
  live,
}: {
  modalSetting: {
    visible: boolean;
    speed: number;
    quality: string;
  };
  setModalSetting: React.Dispatch<React.SetStateAction<typeof modalSetting>>;
  urls: {
    url: string;
    hls: IHlsBroadcast[] | [];
  };
  live?: boolean;
}) => {
  const layout = useWindowDimensions().width;
  const [index, setIndex] = React.useState(0);
  const {StatusBarManager} = NativeModules;

  const renderScene = ({route: renderRoute}: IRenderSceneProps) => {
    switch (renderRoute.key) {
      case 'Quality':
        return (
          <View style={{flex: 1}}>
            <FlatList
              data={[
                {name: 'Auto', url: urls.url},
                ...urls.hls
                  .sort(function (a, b) {
                    return (
                      parseInt(b.name ?? '0', 10) - parseInt(a.name ?? '0', 10)
                    );
                  })
                  .map(item => {
                    return {
                      name: item.name,
                      url: item.m3u8Url,
                    };
                  }),
              ]}
              ItemSeparatorComponent={DividerComponent}
              contentContainerStyle={{paddingBottom: 60}}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setModalSetting({
                      ...modalSetting,
                      quality: item.url,
                      visible: item.url === modalSetting.quality ? true : false,
                    });
                  }}
                  style={{
                    height: 70,
                    justifyContent: 'center',
                    paddingLeft: 25,
                  }}>
                  {item.url === modalSetting.quality ? (
                    <View
                      style={{
                        height: 40,
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        backgroundColor: '#454545',
                        alignSelf: 'flex-start',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Play size={10} />
                      <MediumText style={{color: colors.white, marginLeft: 10}}>
                        {item.name}
                      </MediumText>
                    </View>
                  ) : (
                    <MediumText style={{color: colors.white}}>
                      {item.name}
                    </MediumText>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        );
      case 'Speed':
        return (
          <View style={{flex: 1}}>
            <FlatList
              data={[
                {name: '0.5x', value: 0.5},
                {name: 'Обычная', value: 1},
                {name: '1.25x', value: 1.25},
                {name: '1.5x', value: 1.5},
                {name: '2x', value: 2},
              ]}
              ItemSeparatorComponent={DividerComponent}
              contentContainerStyle={{paddingBottom: 60}}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setModalSetting({
                      ...modalSetting,
                      speed: item.value,
                      visible: item.value === modalSetting.speed ? true : false,
                    });
                  }}
                  style={{
                    height: 70,
                    justifyContent: 'center',
                    paddingLeft: 25,
                  }}>
                  {item.value === modalSetting.speed ? (
                    <View
                      style={{
                        height: 40,
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        backgroundColor: '#454545',
                        alignSelf: 'flex-start',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Play size={10} />
                      <MediumText style={{color: colors.white, marginLeft: 10}}>
                        {item.name}
                      </MediumText>
                    </View>
                  ) : (
                    <MediumText style={{color: colors.white}}>
                      {item.name}
                    </MediumText>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        );
    }
  };
  const [routes] = React.useState(
    live
      ? [{key: 'Quality', title: 'Качество'}]
      : [
          {key: 'Quality', title: 'Качество'},
          {key: 'Speed', title: 'Скорость'},
        ],
  );

  return (
    <Modal
      visible={modalSetting.visible}
      onRequestClose={() => {
        setModalSetting({...modalSetting, visible: false});
      }}
      statusBarTranslucent
      style={{backgroundColor: 'black', flex: 1}}
      supportedOrientations={['portrait', 'landscape']}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
          <TouchableOpacity
            onPress={() => {
              setModalSetting({...modalSetting, visible: false});
            }}
            style={[
              {
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                height: 24,
                width: 24,
                marginTop:
                  Platform.OS === 'android' ? 15 + StatusBarManager.HEIGHT : 15,
                marginRight: 15,
              },
            ]}>
            <Close color={colors.white} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              marginTop: 10,
            }}>
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: layout}}
              animationEnabled={false}
              renderTabBar={propsTabBar => (
                <TabBar
                  {...propsTabBar}
                  activeColor={colors.orange}
                  inactiveColor={colors.gray}
                  scrollEnabled
                  gap={15}
                  pressColor={'transparent'}
                  // tabStyle={{width: 'auto'}}
                  renderLabel={({route: renderRoute, focused}) => (
                    <BoldText
                      style={{
                        color: focused ? colors.orange : colors.gray,
                      }}>
                      {renderRoute.title}
                    </BoldText>
                  )}
                  style={{
                    backgroundColor: 'black',
                    borderColor: colors.greyProgram,
                    marginHorizontal: 15,
                    borderBottomWidth: 1,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  renderIndicator={indicatorProps => {
                    const width = indicatorProps.getTabWidth(index!);
                    return (
                      <TabBarIndicator
                        {...indicatorProps}
                        width={width}
                        style={{
                          bottom: -2,
                          backgroundColor: indicatorProps
                            ? colors.orange
                            : 'transparent',
                          height: 3,
                          borderRadius: 3,
                        }}
                      />
                    );
                  }}
                />
              )}
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

// -----------------TopButton----------------------

export const BackButton = ({
  onPress,
  style,
  text,
  disabled,
}: {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  text?: string;
  disabled?: boolean;
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[
      {
        position: 'absolute',
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      styles.buttonStyle,
      style,
    ]}
    onPress={onPress}>
    <ArrowLeft color={colors.white} />
    {text && (
      <BoldText
        style={{
          color: colors.white,
          marginLeft: 15,
          textAlignVertical: 'center',
          marginTop: Platform.OS === 'android' ? -5 : -1,
        }}>
        {text}
      </BoldText>
    )}
  </TouchableOpacity>
);

export const ChromecastButton = ({
  style,
  onPress,
  modalCast,
  shouldClose,
  contentUrl,
  progress,
  live = false,
}: {
  style?: StyleProp<any>;
  onPress: () => void;
  modalCast: boolean;
  shouldClose: () => void;
  contentUrl: string;
  progress?: number;
  live?: boolean;
}) => {
  const SCREEN_WIDTH = useWindowDimensions().width;
  const castDevice = useCastDevice();
  const devices = useDevices();
  const sessionManager = GoogleCast.getSessionManager();
  const client = useRemoteMediaClient();
  const colorsTheme = useTheme().colors;
  const [paused, setPaused] = React.useState(true);
  const [loadMedia, setLoadMedia] = React.useState(false);
  const [volume, setVolume] = React.useState(0);

  React.useEffect(() => {
    if (client && loadMedia) {
      client
        .loadMedia({
          autoplay: true,
          mediaInfo: {
            contentUrl: contentUrl,
          },
        })
        .then(() => {
          setPaused(false);
          client.setStreamVolume(0.3).then(() => setVolume(0.3));
          !live && client.seek({position: progress});
        })
        .catch(e => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, contentUrl, loadMedia, devices]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonStyle,
        {
          zIndex: 1,
          position: 'absolute',
          paddingBottom: 2,
        },
        style,
      ]}>
      <Chromecast color={castDevice ? '#fff' : '#fff8'} />
      <ModalComponent
        visible={modalCast}
        shouldClose={shouldClose}
        snapStartIndex={0}
        snapPointsArr={['45%', '75%']}
        child={
          <BottomSheetScrollView
            contentContainerStyle={{paddingVertical: 20}}
            style={styles.contentContainer}>
            {devices.length ? (
              devices.map(device => {
                const active = device.deviceId === castDevice?.deviceId;

                return (
                  <View
                    style={{
                      backgroundColor: active
                        ? colorsTheme.bgSecondary
                        : 'transparent',
                      paddingHorizontal: 20,
                      paddingVertical: 15,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        key={device.deviceId}
                        style={{flex: 1}}
                        onPress={async () => {
                          if (active) {
                            sessionManager.endCurrentSession();
                            setLoadMedia(false);
                          } else {
                            sessionManager.startSession(device.deviceId);
                            setLoadMedia(true);
                          }
                        }}>
                        <MediumText fontSize={16} style={{}}>
                          {device.friendlyName}
                        </MediumText>
                      </TouchableOpacity>
                      {active && (
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity
                            style={{
                              marginRight: 15,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onPress={() => {
                              client?.seek({position: -15, relative: true});
                            }}>
                            <RegularText
                              fontSize={8}
                              style={{
                                marginBottom: Platform.OS === 'android' ? 2 : 0,
                                marginRight: 3,
                                color: colorsTheme.textSecondary,
                              }}>
                              -15
                            </RegularText>
                            <SkipLeftVideo
                              color={colorsTheme.orange}
                              size={24}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              paused ? client?.play() : client?.pause();
                              setPaused(!paused);
                            }}>
                            {paused ? (
                              <Play color={colors.orange} size={24} />
                            ) : (
                              <Pause color={colors.orange} size={24} />
                            )}
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              marginLeft: 15,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onPress={() => {
                              client?.seek({position: +15, relative: true});
                            }}>
                            <SkipRightVideo color={colors.orange} size={24} />
                            <RegularText
                              fontSize={8}
                              style={{
                                marginBottom: Platform.OS === 'android' ? 2 : 0,
                                marginLeft: 3,
                                color: colorsTheme.textSecondary,
                              }}>
                              +15
                            </RegularText>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                    {active && (
                      <Slider
                        value={volume}
                        onSlidingComplete={value => {
                          client?.setStreamVolume(value[0]);
                          setVolume(value[0]);
                        }}
                        maximumValue={1}
                        minimumValue={0}
                        thumbTintColor={colors.orange}
                        containerStyle={{
                          height: 20,
                          width: SCREEN_WIDTH - 40,
                          marginTop: 10,
                        }}
                      />
                    )}
                  </View>
                );
              })
            ) : (
              <MediumText
                style={{textAlign: 'center', color: colorsTheme.textSecondary}}>
                Нет доступных устройств
              </MediumText>
            )}
          </BottomSheetScrollView>
        }
      />
    </TouchableOpacity>
  );
};

export const SettingButton = ({
  onPress,
  style,
  disabled,
}: {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[{position: 'absolute', zIndex: 4}, styles.buttonStyle, style]}>
    <Settings />
  </TouchableOpacity>
);

// ----------------CentralButton--------------------
export const PlayButtom = ({
  onPress,
  size,
}: {
  onPress: () => void;
  size: number;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
      transform: [{translateX: -60 / 2}, {translateY: -60 / 2}],
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
      width: 60,
      backgroundColor: '#0003',
      borderRadius: 30,
      paddingLeft: 2,
    }}>
    <Play size={size} />
  </TouchableOpacity>
);

export const PauseButtom = ({
  onPress,
  size,
  disabled,
}: {
  onPress: () => void;
  size: number;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1,
        transform: [{translateX: -60 / 2}, {translateY: -60 / 2}],
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 60,
        backgroundColor: '#0003',
        borderRadius: 30,
      }}>
      <Pause size={size} />
    </TouchableOpacity>
  );
};

//-----------------BottomButton------------------

export const FullScreenButton = ({
  onPress,
  style,
  disabled,
}: {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[{position: 'absolute', zIndex: 1}, styles.buttonStyle, style]}>
    <Fullscreen />
  </TouchableOpacity>
);

export const NotFullScreenButton = ({
  onPress,
  style,
  disabled,
}: {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[{position: 'absolute', zIndex: 1}, styles.buttonStyle, style]}>
    <NotFullscreen />
  </TouchableOpacity>
);

export const ProgressBar = ({
  progress,
  onSlidingComplete,
  onSlidingStart,
  load,
  duration,
  style,
  onValueChange,
}: {
  progress: number;
  onValueChange?: SliderOnChangeCallback;
  onSlidingComplete?: SliderOnChangeCallback;
  onSlidingStart?: SliderOnChangeCallback;
  load: number;
  duration: number;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          zIndex: 1,
        },
        style,
      ]}>
      <Slider
        thumbTouchSize={{height: 30, width: 30}}
        thumbTintColor={colors.orange}
        thumbStyle={{
          height: 12,
          width: 12,
          position: 'absolute',
          zIndex: 2,
        }}
        maximumValue={duration}
        containerStyle={{
          zIndex: 2,
          width: '100%',
        }}
        minimumTrackTintColor={colors.orange}
        maximumTrackTintColor={'#0003'}
        trackStyle={{height: 4}}
        value={progress}
        onValueChange={onValueChange}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        renderAboveThumbComponent={() => (
          <View
            style={{
              position: 'absolute',
              left: -7,
              top: -10,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <MediumText fontSize={12} style={{color: colors.white}}>
              {dayjs(0).hour(0).minute(0).second(progress).format('HH:mm:ss')}
            </MediumText>
          </View>
        )}
      />
      <Slider
        thumbStyle={{
          height: 0,
          width: 0,
        }}
        disabled
        containerStyle={{
          position: 'absolute',
          zIndex: 1,
          bottom: 0,
          width: '100%',
        }}
        maximumValue={duration}
        minimumTrackTintColor={colors.white}
        minimumTrackStyle={{opacity: 0.3}}
        trackStyle={{backgroundColor: 'transparent', height: 4}}
        value={load}
      />
      <MediumText
        style={{
          position: 'absolute',
          color: 'white',
          right: -60,
          bottom: Platform.OS === 'android' ? 12 : 13,
          fontSize: 12,
        }}>
        {`-${dayjs(0)
          .hour(0)
          .minute(0)
          .second(duration - progress)
          .format('HH:mm:ss')}`}
      </MediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#0003',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  progressBar: {
    paddingHorizontal: 15,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#0003',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
