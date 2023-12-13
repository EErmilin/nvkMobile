import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  FlatList,
  LayoutChangeEvent,
} from 'react-native';
import {useTheme} from '../Styles/Styles';
import BoldText from './BoldText';
import RegularText from './RegularText';
import {BookMark} from './SVGcomponents/Bookmark';
import {IPost} from '../models/Post';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {Avatar} from './Avatar';
import {TabNavigationProps} from '../navigation/types/TabTypes';
import {EmptyImage} from './EmptyImage';
import {getDate} from '../helpers/getDate';
import {VideoPost} from './VideoPost';
import {DotsVertical} from './SVGcomponents';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {useMutation} from '@apollo/client';
import {DELETE_POST} from '../gql/mutation/post/DeletePost';
import {removePost} from '../redux/slices/postSlice';
import {useFavorite} from '../helpers/useFavorite';

interface PostItemProps {
  post: IPost;
  navigation: TabNavigationProps<'Main'>['navigation'];
  onLayout?: (event: LayoutChangeEvent) => void;
  inSight: boolean;
}

export const PostItem = ({
  post,
  navigation,
  onLayout,
  inSight,
}: PostItemProps) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {isFavorite, toggle} = useFavorite({postId: post.id});

  const authorId = useAppSelector(state => state.user.author?.author?.id);

  const [deletePost] = useMutation(DELETE_POST);

  return (
    <View
      onLayout={onLayout}
      style={{
        marginBottom: 10,
        backgroundColor: colors.fillPrimary,
        borderRadius: 20,
        paddingBottom: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 15,
          marginHorizontal: 15,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (!post.authorId) return;
            navigation.navigate('BlogerProfile', {
              id: post.authorId,
            });
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar
              size={45}
              url={post.author?.user?.avatar?.url_256}
              style={{marginRight: 15}}
            />
            <BoldText fontSize={12}>{post.author?.nickname}</BoldText>
          </View>
        </TouchableOpacity>

        {authorId && post.authorId === authorId && (
          <Menu>
            <MenuTrigger>
              <DotsVertical />
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                backgroundColor: colors.bgSecondary,
                marginTop: 32,
              }}>
              <MenuOption
                onSelect={async () => {
                  await deletePost({
                    variables: {id: post.id},
                  });
                  dispatch(removePost(post.id));
                }}>
                <BoldText style={{color: colors.textPrimary, paddingLeft: 8}}>
                  Удалить
                </BoldText>
              </MenuOption>
            </MenuOptions>
          </Menu>
        )}
      </View>
      <RenderContent inSight={inSight} post={post} navigation={navigation} />
      <TouchableOpacity
        style={{paddingHorizontal: 15, marginTop: 10}}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('NewsView', {post: post});
        }}>
        <BoldText fontSize={18} numberOfLines={3}>
          {post.title}
        </BoldText>
        <RegularText numberOfLines={3} style={{marginTop: 10}}>
          {post.preview}
        </RegularText>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={toggle}>
            <View
              style={{
                backgroundColor: isFavorite
                  ? colors.colorMainInActive
                  : colors.bgSecondary,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
              }}>
              <BookMark
                color={isFavorite ? colors.colorMain : colors.textPrimary}
                fill={isFavorite ? colors.colorMain : 'none'}
              />
            </View>
          </TouchableOpacity>
          <RegularText fontSize={12} style={{color: colors.textSecondary}}>
            {getDate(new Date(post.createdAt))}
          </RegularText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const RenderContent = ({post, navigation, inSight}: PostItemProps) => {
  const [activePage, setActivePage] = useState(0);
  const screenWidth = Dimensions.get('screen').width;
  const {colors} = useTheme();
  switch (true) {
    case post.media?.indexM3u8Url !== undefined:
      return (
        <View>
          <VideoPost
            inSight={inSight}
            urls={{
              url: post.media?.indexM3u8Url ?? '',
              hls: [],
            }}
          />
        </View>
      );
    case post.images.length > 0:
      return (
        <View>
          <View
            style={{
              width: 46,
              height: 30,
              position: 'absolute',
              top: 25,
              left: 15,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}>
            <BoldText fontSize={14} style={{color: colors.white}}>
              {`${activePage + 1}/${post.images.length}`}
            </BoldText>
          </View>
          <FlatList
            data={post.images}
            keyExtractor={item => post.id.toString() + '_' + item.id.toString()}
            pagingEnabled={true}
            horizontal
            onScroll={event => {
              setActivePage(
                Math.round(event.nativeEvent.contentOffset.x / screenWidth),
              );
            }}
            style={{zIndex: -1}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    height: screenWidth,
                  }}
                  activeOpacity={0.9}
                  delayPressIn={0.3}
                  onPress={() => {
                    navigation.navigate('NewsView', {post: post});
                  }}>
                  <Image
                    source={{uri: item.url_1536 ?? undefined}}
                    resizeMode="cover"
                    style={{
                      flex: 1,
                      backgroundColor: colors.skeletonBg,
                      width: screenWidth,
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      );
    default:
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          delayPressIn={0.3}
          onPress={() => {
            navigation.navigate('NewsView', {post: post});
          }}>
          <EmptyImage />
        </TouchableOpacity>
      );
  }
};
