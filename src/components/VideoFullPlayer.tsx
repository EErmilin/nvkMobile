import React from 'react';
import {colors} from '../Styles/Styles';
import {
  Platform,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  BackHandler,
  NativeModules,
} from 'react-native';
import {StyleProp, ViewStyle} from 'react-native';
import Video from 'react-native-video';
import {VideoPlayerContext} from '../contexts/videoContext';
import MediumText from './MediumText';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, useWindowDimensions, ScrollView} from 'react-native';
import {IHlsBroadcast} from '../models/Broadcast';
import {SkipRightVideo} from './SVGcomponents/media/SkipRightVideo';
import {SkipLeftVideo} from './SVGcomponents/media/SkipLeftVideo';
import CompositeAnimation = Animated.CompositeAnimation;
import {
  PlayButtom,
  ProgressBar,
  PauseButtom,
  ChromecastButton,
  NotFullScreenButton,
  SettingButton,
  BackButton,
  ModalSetting,
} from './VideoPlayerExportComponents';
import TrackPlayer from 'react-native-track-player';

interface VideoPlayerProps {
  urls: {
    url: string;
    hls: IHlsBroadcast[] | [];
  };
  style?: StyleProp<ViewStyle>;
  videoName?: string;
  scrollRef?: React.RefObject<ScrollView>;
}

const PADDING = 15;
const BUTTON_SIZE = 24;
const BOTTOM = 54;

export const VideoFullPlayer = (props: VideoPlayerProps) => {
  const {videoName, urls, style, scrollRef} = props;
  const refVideo = React.useRef<Video>(null);
  const animValueLeft = React.useRef(new Animated.Value(0)).current;
  const animValueRight = React.useRef(new Animated.Value(0)).current;
  const contextNavBar = React.useContext(VideoPlayerContext);
  const {StatusBarManager} = NativeModules;
  const navigationOption = useNavigation();
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  const SCREEN_WIDTH = useWindowDimensions().width;
  const [loading, setLoading] = React.useState(true);
  const [paused, setPaused] = React.useState(true);
  const [pausedMemo, setPausedMemo] = React.useState(true);
  const [fullscreen, setFullscreen] = React.useState(true);
  const [buffer, setBuffer] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [touch, setTouch] = React.useState(false);
  const [modalSetting, setModalSetting] = React.useState({
    visible: false,
    speed: 1,
    quality: urls.url,
  });
  const [modalCast, setModalCast] = React.useState(false);

  React.useEffect(() => {
    setModalSetting({
      visible: false,
      speed: 1,
      quality: urls.url,
    });
  }, [urls.url]);

  /////
  const opacityAnimation = React.useRef<CompositeAnimation | null>(null);
  const hideTimeout = React.useRef<number | null>(null);
  const controlsOpacity = React.useRef(new Animated.Value(0)).current;
  const [sliding, setSliding] = React.useState(false);
  const [tap, setTap] = React.useState(false);

  const onStartSliding = () => {
    setSliding(true);
    setPausedMemo(paused);
    setPaused(true);
  };

  const onStopSliding = (evt: number | Array<number>): void => {
    setSliding(false);
    refVideo.current?.seek(Math.round(evt as number));
    setProgress(Math.round(evt as number));
    setPaused(pausedMemo);
  };

  React.useEffect(() => {
    if (opacityAnimation.current) {
      opacityAnimation.current.stop();
    }
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    opacityAnimation.current = Animated.timing(controlsOpacity, {
      toValue: !touch ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    });
    opacityAnimation.current.start(() => {
      if (touch && !sliding) {
        hideTimeout.current = setTimeout(() => {
          setTouch(!touch);
          hideTimeout.current = null;
        }, 3000);
      }
      opacityAnimation.current = null;
    });
  }, [touch, sliding, controlsOpacity, tap]);

  React.useEffect(() => {
    if ((sliding && hideTimeout.current) || hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
  }, [sliding, tap]);

  // ======== Fullscreen Button Function
  const handleFullScreen = React.useCallback(() => {
    if (refVideo.current) {
      navigationOption.setOptions({headerShown: false});
      Platform.OS === 'android' && refVideo.current.presentFullscreenPlayer();
      contextNavBar.setVideoPlayerOption({
        ...contextNavBar.videoPlayerOption,
        fullscreen: true,
      });
      setFullscreen(true);
      scrollRef?.current?.scrollTo({y: 0});
    }
  }, [contextNavBar, navigationOption, scrollRef]);

  const handleDisFullScreen = React.useCallback(() => {
    if (refVideo.current) {
      refVideo.current.dismissFullscreenPlayer();
      contextNavBar.setVideoPlayerOption({
        fullscreen: false,
        pressPlay: undefined,
        video: undefined,
      });
      setFullscreen(false);
    }
  }, [contextNavBar]);

  React.useEffect(() => {
    if (contextNavBar.videoPlayerOption?.pressPlay) {
      handleFullScreen();
      setPaused(false);
      return;
    }
    return;
  }, [contextNavBar.videoPlayerOption?.pressPlay, handleFullScreen]);

  // ====== Back Button in Android useEffect

  React.useEffect(() => {
    const backAction = () => {
      if (fullscreen) {
        handleDisFullScreen();
      } else {
        navigationOption.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [contextNavBar, fullscreen, handleDisFullScreen, navigationOption]);

  // ==============Tap Controll Funtion

  //функция перемотки вперед на 15 сек
  const handleRightDoubleTap = React.useCallback(() => {
    refVideo.current?.seek(Math.round(progress + 15));
    Animated.timing(animValueRight, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animValueRight, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    });
  }, [animValueRight, progress]);

  //обработчик жеста двойного касания правой части
  const doubleTapRight = Gesture.Tap() // функция для перемотки вперед
    .maxDuration(250)
    .numberOfTaps(2)
    .hitSlop({left: -SCREEN_WIDTH / 2 - 50})
    .onStart(() => {
      runOnJS(handleRightDoubleTap)();
    });

  //функция перемотки назад на 15 сек
  const hanleLeftDoubleTap = React.useCallback(() => {
    refVideo.current?.seek(Math.round(progress - 15));
    Animated.timing(animValueLeft, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animValueLeft, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    });
  }, [animValueLeft, progress]);

  //обработчик жеста двойного касания левой части
  const doubleTapLeft = Gesture.Tap() // функция для перемотки назад
    .maxDuration(250)
    .numberOfTaps(2)
    .hitSlop({right: -SCREEN_WIDTH / 2 - 50})
    .onStart(() => {
      runOnJS(hanleLeftDoubleTap)();
    });

  // обработчик жеста для показа кнопок по нажатию
  // const negate = (val: unknown) => !val;
  const oneTap = Gesture.Tap()
    .maxDuration(300)
    .numberOfTaps(1)
    .onStart(() => {
      runOnJS(setTouch)(!touch);
    });

  const oneTapButton = Gesture.Tap().maxDuration(300).numberOfTaps(1);

  // ============= Style in Portrait and Landscape

  //стиль контейнера компонента
  const styleScreen = StyleSheet.create({
    fullscreen: {
      position: 'absolute',
      height: SCREEN_HEIGHT,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
  });

  //стиль при портретном состоянии
  const styleButtonPortrait =
    SCREEN_HEIGHT >= SCREEN_WIDTH
      ? StyleSheet.create({
          chromecast: {
            top:
              Platform.OS === 'ios'
                ? StatusBarManager.HEIGHT + PADDING
                : PADDING,
            right: PADDING,
          },
          settingButton: {
            bottom: BOTTOM,
            left: PADDING,
          },
          backButton: {
            top:
              Platform.OS === 'ios'
                ? StatusBarManager.HEIGHT + PADDING
                : PADDING,
            left: PADDING,
          },
          progressBar: {
            bottom: BOTTOM + BUTTON_SIZE + 25,
            left: PADDING + 4,
            width: SCREEN_WIDTH - 25 - 5 - 52 - PADDING - 4,
          },
          notFullScreenButton: {bottom: BOTTOM, right: PADDING},
        })
      : StyleSheet.create({
          chromecast: {
            top: PADDING,
            right: StatusBarManager.HEIGHT + PADDING,
          },
          notFullScreenButton: {
            bottom: 24,
            right: PADDING + StatusBarManager.HEIGHT,
          },
          settingButton: {
            bottom: 24,
            left: StatusBarManager.HEIGHT + PADDING,
          },
          backButton: {
            top: Platform.OS === 'ios' ? PADDING : PADDING,
            left: StatusBarManager.HEIGHT + PADDING,
          },
          progressBar: {
            bottom: 20 + BUTTON_SIZE + 20,
            left: StatusBarManager.HEIGHT + PADDING,
            right: StatusBarManager.HEIGHT + 2 * PADDING + 52,
          },
        });

  return (
    <GestureDetector
      gesture={Gesture.Exclusive(doubleTapRight, doubleTapLeft, oneTap)}>
      <View style={[styleScreen.fullscreen, {backgroundColor: 'black'}]}>
        <ModalSetting
          modalSetting={modalSetting}
          setModalSetting={setModalSetting}
          urls={urls}
        />
        <Video
          ref={refVideo}
          style={[styleScreen.fullscreen, style]}
          source={{uri: modalSetting.quality}}
          rate={modalSetting.speed}
          automaticallyWaitsToMinimizeStalling
          preferredForwardBufferDuration={500}
          resizeMode="contain"
          fullscreen={Platform.OS === 'android' ? fullscreen : false}
          paused={paused}
          repeat={true}
          onPlaybackRateChange={async res => {
            const playbackRate = res.playbackRate;
            if (playbackRate === 1) {
              await TrackPlayer.pause();
            }
          }}
          onReadyForDisplay={() => {
            setLoading(false);
          }}
          onLoadStart={() => {
            setLoading(true);
            refVideo.current?.seek(progress, -50);
          }}
          onProgress={({currentTime, playableDuration}) => {
            setProgress(currentTime);
            setBuffer(playableDuration);
          }}
          onLoad={data => {
            setDuration(data.duration);
          }}
          onEnd={() => {
            setPaused(true);
            handleDisFullScreen();
          }}
          posterResizeMode="cover"
          playWhenInactive
          playInBackground
          onPictureInPictureStatusChanged={({isActive}) => {
            console.log('isPipActive', isActive);
          }}
          pictureInPicture
        />

        <Animated.View
          pointerEvents={!touch ? 'none' : undefined}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 1,
            opacity: controlsOpacity,
          }}>
          <BackButton
            text={videoName}
            style={styleButtonPortrait.backButton}
            onPress={() => {
              setTap(!tap);
              setPaused(true);
              handleDisFullScreen();
            }}
          />
          <SettingButton
            style={styleButtonPortrait.settingButton}
            onPress={() => {
              setModalSetting({...modalSetting, visible: true});
            }}
          />

          <GestureDetector gesture={Gesture.Exclusive(oneTapButton)}>
            <NotFullScreenButton
              style={styleButtonPortrait.notFullScreenButton}
              onPress={() => {
                setTap(!tap);
                setPaused(true);
                handleDisFullScreen();
              }}
            />
          </GestureDetector>
          <ChromecastButton
            progress={progress}
            contentUrl={urls.url}
            modalCast={modalCast}
            shouldClose={() => setModalCast(false)}
            onPress={() => {
              setPaused(true);
              setModalCast(true);
            }}
            style={styleButtonPortrait.chromecast}
          />
          {!paused && !loading ? (
            <GestureDetector gesture={Gesture.Exclusive(oneTapButton)}>
              <PauseButtom
                size={40}
                onPress={() => {
                  setTap(!tap);
                  setPaused(true);
                }}
              />
            </GestureDetector>
          ) : (
            <></>
          )}
          <GestureDetector gesture={Gesture.Exclusive(oneTapButton)}>
            <ProgressBar
              progress={progress}
              load={buffer}
              duration={duration}
              style={styleButtonPortrait.progressBar}
              onSlidingComplete={(value: number[]) => {
                onStopSliding(value[0]);
              }}
              onSlidingStart={() => {
                onStartSliding();
              }}
              onValueChange={value => {
                setProgress(Math.round(value[0]));
              }}
            />
          </GestureDetector>
        </Animated.View>
        <Animated.View
          style={{
            left: '10%',
            opacity: animValueLeft,
            position: 'absolute',
            top: '50%',
            zIndex: 1,
            transform: [{translateX: -24 / 2}, {translateY: -24 / 2}],
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SkipLeftVideo />
          <MediumText fontSize={12} style={{color: colors.white}}>
            - 15 сек
          </MediumText>
        </Animated.View>
        <Animated.View
          style={{
            right: '10%',
            opacity: animValueRight,
            position: 'absolute',
            top: '50%',
            zIndex: 1,
            transform: [{translateX: -24 / 2}, {translateY: -24 / 2}],
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SkipRightVideo />
          <MediumText fontSize={12} style={{color: colors.white}}>
            + 15 сек
          </MediumText>
        </Animated.View>
        {paused && !loading ? (
          <GestureDetector gesture={Gesture.Exclusive(oneTapButton)}>
            <PlayButtom
              size={40}
              onPress={() => {
                setTap(!tap);
                setPaused(false);
              }}
            />
          </GestureDetector>
        ) : (
          <></>
        )}
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 1,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{translateX: -50 / 2}, {translateY: -50 / 2}],
            }}>
            <ActivityIndicator size={'large'} color={colors.orange} />
          </View>
        )}
      </View>
    </GestureDetector>
  );
};
