import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';

import FastImage from 'react-native-fast-image';

import {IPost} from '../../../models/Post';
import BlogerProfile_VideoPlay_icon from '../../../assets/icons/BlogerProfile_VideoPlay_icon';
import {BoldText} from '../../../components';
import BlogerProfile_AudioPlay_icon from '../../../assets/icons/BlogerProfile_AudioPlay_icon';

const {width} = Dimensions.get('screen');

interface TProps {
  post: IPost;
  // post: any;
  onPress: (post: IPost) => void;
}

export const BlogerContent_Photo: FC<TProps> = ({
  post,
  onPress: onPressInner,
}) => {
  const onPress = () => onPressInner(post);
  return (
    <TouchableOpacity onPress={onPress}>
      <FastImage
        source={{uri: post.images?.[0]?.url}}
        style={styles.photo_image}
      />
    </TouchableOpacity>
  );
};

export const BlogerContent_Video: FC<TProps> = ({
  post,
  onPress: onPressInner,
}) => {
  const onPress = () => onPressInner(post);
  return (
    <TouchableOpacity onPress={onPress}>
      <FastImage
        source={{uri: 'https://avatars.githubusercontent.com/u/20685587?v=4'}}
        style={styles.vidoe_image}
      />
      <View
        style={[
          styles.vidoe_image,
          {position: 'absolute', backgroundColor: '#000', opacity: 0.3},
        ]}
      />
      <ContentViewed count={Math.floor(Math.random() * 10) + 1} />
    </TouchableOpacity>
  );
};

export const BlogerContent_Audio: FC<TProps> = ({
  post,
  onPress: onPressInner,
}) => {
  const onPress = () => onPressInner(post);
  return (
    <TouchableOpacity onPress={onPress}>
      <FastImage
        source={{uri: 'https://avatars.githubusercontent.com/u/20685587?v=4'}}
        style={styles.audio_image}
      />
      <View
        style={[
          styles.audio_image,
          {position: 'absolute', backgroundColor: '#000', opacity: 0.3},
        ]}
      />
      <ContentListened count={Math.floor(Math.random() * 10) + 1} />
    </TouchableOpacity>
  );
};

const ContentViewed = ({count}: {count: number}) => (
  <View style={styles.viewers_wrapper}>
    <BlogerProfile_VideoPlay_icon />
    <Text style={styles.viewers_text}>{`${count}`}</Text>
  </View>
);

const ContentListened = ({count}: {count: number}) => (
  <View style={styles.viewers_wrapper}>
    <BlogerProfile_AudioPlay_icon />
    <Text style={styles.viewers_text}>{`${count}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  photo_image: {
    width: (width - 2) / 3,
    height: width / 3,
    marginTop: 1,
    backgroundColor: '#f2f2f2',
  },
  vidoe_image: {
    width: (width - 2) / 3,
    height: width / 1.875,
    marginTop: 1,
    backgroundColor: '#f2f2f2',
  },
  audio_image: {
    width: (width - 2) / 3,
    height: width / 1.875,
    marginTop: 1,
    backgroundColor: '#f2f2f2',
  },
  viewers_wrapper: {
    position: 'absolute',
    bottom: 12,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewers_text: {
    fontFamily: 'NotoSans',
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
  },
});
