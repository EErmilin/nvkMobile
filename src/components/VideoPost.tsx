import React from 'react';
import {colors} from '../Styles/Styles';
import {Pressable, View, StyleSheet, Animated} from 'react-native';
import {StyleProp, ViewStyle} from 'react-native';
import Video from 'react-native-video';
import {ActivityIndicator, useWindowDimensions} from 'react-native';
import {IHlsBroadcast} from '../models/Broadcast';
import {
  PauseButtom,
  PlayButtom,
  ProgressBar,
} from './VideoPlayerExportComponents';
import CompositeAnimation = Animated.CompositeAnimation;
import TrackPlayer from 'react-native-track-player';

interface VideoPlayerProps {
  urls: {
    url: string;
    hls: IHlsBroadcast[] | [];
  };
  style?: StyleProp<ViewStyle>;
  videoName?: string;
  inSight?: boolean;
}

const PADDING = 15;

export const VideoPost = (props: VideoPlayerProps) => {
  const {urls, style, inSight} = props;
  const refVideo = React.useRef<Video>(null);
  const SCREEN_WIDTH = useWindowDimensions().width;
  const [loading, setLoading] = React.useState(true);
  const [paused, setPaused] = React.useState(true);
  const [pausedMemo, setPausedMemo] = React.useState(true);
  const [buffer, setBuffer] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [touch, setTouch] = React.useState(false);

  // ==============Tap Controll Funtion

  /////
  const opacityAnimation = React.useRef<CompositeAnimation | null>(null);
  const hideTimeout = React.useRef<number | null>(null);
  const controlsOpacity = React.useRef(new Animated.Value(0)).current;
  const [sliding, setSliding] = React.useState(false);
  const [tap, setTap] = React.useState(false);
  // const negate = (val: unknown) => !val;

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

  //стиль контейнера компонента
  const styleScreen = StyleSheet.create({
    fullscreen: {
      zIndex: 1,
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH,
    },
  });

  //стиль при портретном состоянии
  const styleButtonPortrait = StyleSheet.create({
    progressBar: {
      bottom: 10,
      left: PADDING + 5,
      width: SCREEN_WIDTH - 25 - 52 - PADDING - 10,
    },
  });
  return (
    <Pressable onPress={() => setTouch(!touch)}>
      <View
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_WIDTH,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}>
        {urls.url && (
          <Video
            ref={refVideo}
            style={[styleScreen.fullscreen, style]}
            source={{uri: urls.url}}
            automaticallyWaitsToMinimizeStalling
            preferredForwardBufferDuration={500}
            resizeMode="contain"
            fullscreen={false}
            paused={!inSight || paused}
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
            }}
            posterResizeMode="cover"
            playWhenInactive
            playInBackground={true}
            onPictureInPictureStatusChanged={({isActive}) => {
              console.log('isPipActive', isActive);
            }}
            pictureInPicture
          />
        )}
        <Animated.View
          pointerEvents={!touch ? 'none' : undefined}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 1,
            opacity: controlsOpacity,
          }}>
          {!paused && !loading ? (
            <PauseButtom
              size={40}
              onPress={() => {
                setPaused(true);
                setTap(!tap);
              }}
            />
          ) : (
            <></>
          )}

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
        </Animated.View>
        {paused && !loading ? (
          <PlayButtom
            size={40}
            onPress={() => {
              setTap(!tap);
              setPaused(false);
            }}
          />
        ) : (
          <></>
        )}
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 4,
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
    </Pressable>
  );
};
