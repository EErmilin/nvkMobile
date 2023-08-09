import * as React from 'react';
import {Image, View, useWindowDimensions} from 'react-native';
import {IPost} from '../models/Post';
import {Play} from './SVGcomponents';
import {themeColors} from '../Styles/Styles';
import {EmptyImage} from './EmptyImage';

type Props = {
  post: IPost | null;
};

export const PostCell = (props: Props) => {
  const screenWidth = useWindowDimensions().width;
  const {post} = props;

  if (post?.images && post?.images.length > 0) {
    return (
      <Image
        style={{width: (screenWidth - 2) / 3, height: (screenWidth - 2) / 3}}
        source={{uri: post?.images[0].url}}
      />
    );
  } else {
    if (post?.media?.covers && post.media.covers.length > 0) {
      return (
        <Image
          style={{width: (screenWidth - 2) / 3, height: (screenWidth - 2) / 3}}
          source={{uri: post?.media.covers[0].url_256}}
        />
      );
    }
    if (post?.media?.indexM3u8Url) {
      return (
        <View
          style={{
            width: (screenWidth - 2) / 3,
            height: (screenWidth - 2) / 3,
            backgroundColor: themeColors.dark.skeletonBg,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Play />
        </View>
      );
    }
    return (
      <EmptyImage
        widthGalereya={(screenWidth - 2) / 6}
        heightGalereya={(screenWidth - 2) / 6}
        styleContainer={{
          width: (screenWidth - 2) / 3,
          height: (screenWidth - 2) / 3,
        }}
      />
    );
  }
};
