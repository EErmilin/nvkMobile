import React from 'react';
import {useTheme} from '../Styles/Styles';
import {TouchableOpacity, View, Image} from 'react-native';
import {StyleProp, ViewStyle} from 'react-native';
import {PlayCircle} from './SVGcomponents/media/PlayCircle';
import {IEpisodeBroadcast} from '../models/Broadcast';
import {VideoPlayerContext} from '../contexts/videoContext';

interface VideoItemProps {
  urlImage?: string;
  style?: StyleProp<ViewStyle>;
  video: IEpisodeBroadcast;
  child?: React.ReactNode;
}

export const VideoItem = (props: VideoItemProps) => {
  const {urlImage, style, child, video} = props;
  const {colors} = useTheme();
  const videoContext = React.useContext(VideoPlayerContext);

  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        videoContext.setVideoPlayerOption({
          ...videoContext.videoPlayerOption,
          video: {
            url: video.media?.indexM3u8Url ?? '',
            hls: video.media?.hls ?? [],
          },
        });
      }}>
      <View>
        <Image
          source={{uri: urlImage}}
          resizeMode={'cover'}
          style={[
            {
              backgroundColor: colors.gray,
              height: 90,
              width: 150,
              borderRadius: 15,
            },
          ]}
        />
        <PlayButtom size={30} />
      </View>
      {child}
    </TouchableOpacity>
  );
};

const PlayButtom = ({size}: {size: number}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{translateX: -size / 2}, {translateY: -size / 2}],
      }}>
      <PlayCircle size={size} />
    </View>
  );
};

// const PauseButtom = ({onPress, size}: {onPress: () => void; size: number}) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: [{translateX: -size / 2}, {translateY: -size / 2}],
//       }}>
//       <Pause size={size} />
//     </TouchableOpacity>
//   );
// };
