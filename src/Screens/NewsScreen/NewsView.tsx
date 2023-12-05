import * as React from 'react';
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Text,
  Pressable,
} from 'react-native';
import {Containter} from '../../components/Container';
import {colors, useTheme} from '../../Styles/Styles';
import {RootNavigationTabProps} from '../../navigation/types/RootStackTypes';
import BoldText from '../../components/BoldText';
import MediumText from '../../components/MediumText';
import {Divider} from '../../components/Divider';
import RenderHTML from 'react-native-render-html';
import {POST} from '../../gql/query/posts/Post';
import {EmptyImage} from '../../components/EmptyImage';
import {getDate} from '../../helpers/getDate';
import {VideoPost} from '../../components/VideoPost';
import {IPost} from '../../models/Post';
import {Avatar, InputText} from '../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowLeft} from '../../components/SVGcomponents';
import {getUpdateClient} from '../../requests/updateHeaders';
import {BookMark} from '../../components/SVGcomponents/Bookmark';
import {removeFavorite} from '../../redux/thunks/favorite/RemoveFavorite';
import {createFavorite} from '../../redux/thunks/favorite/CreateFavorite';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setLogged} from '../../redux/slices/authSlice';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import DeviceInfo from 'react-native-device-info';
import NewsCommentCard from '../../components/NewsCommentCard';
import SendMessage_icon from '../../assets/icons/SendMessage_icon';
import {CREATE_POST_COMMENT} from '../../gql/mutation/post/CreatePostComment';

const REGULAR_HASTAG = /#[0-9A-Za-zА-Яа-яё]+/g;

export const NewsView: React.FC<RootNavigationTabProps<'NewsView'>> = props => {
  const {route, navigation} = props;
  const {post} = route.params;
  const scrollRef = React.useRef<ScrollView>(null);
  const {colors} = useTheme();
  const screenWidth = useWindowDimensions().width;
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorite.favorites);
  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.user.data);
  const [loading, setLoading] = React.useState(false);
  const [postView, setPostView] = React.useState<IPost | null>(null);
  const [content, setContent] = React.useState('');
  const [likeIsDisabled, setLikeIsDisabled] = React.useState(false);

  const header = React.useCallback(() => {
    return (
      <View
        style={{
          height: 60 + insets.top,
          width: screenWidth,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.fillPrimary,
          paddingLeft: 12,
        }}>
        <TouchableOpacity
          style={{
            width: 44,
            height: 44,
            marginRight: 5,
            marginTop: insets.top,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeft color={colors.colorMain} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            height: 60 + insets.top,
            paddingTop: insets.top,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar
            url={route.params.post.author?.avatar?.url_512 ?? ''}
            size={35}
          />
          <BoldText
            numberOfLines={1}
            style={{marginLeft: 15, width: screenWidth / 2}}>
            {route.params.post.author?.user?.firstname ?? ''}{' '}
            {route.params.post.author?.user?.lastname ?? ''}
          </BoldText>
        </TouchableOpacity>
      </View>
    );
  }, [
    colors.colorMain,
    colors.fillPrimary,
    insets.top,
    navigation,
    route.params.post.author?.avatar?.url_512,
    route.params.post.author?.user?.firstname,
    route.params.post.author?.user?.lastname,
    screenWidth,
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header,
    });
  }, [header, navigation]);

  React.useEffect(() => {
    (async () => {
      (async () => {
        setLoading(true);
        const client = await getUpdateClient();
        await client
          .query({
            query: POST,
            variables: {postId: post.id},
          })
          .then(res => {
            let post_contant: string = res.data.post.content;
            setPostView(res.data.post);
            setContent(
              post_contant.replace(REGULAR_HASTAG, function replacer(str) {
                return '<a id=hashtag href="' + str + '">' + str + '</a>';
              }),
            );
            AppMetrica.reportEvent('NEWS_VIEW', {
              user: user,
              news_name: post.title,
              date: new Date(),
              date_string: new Date(),
              platform: Platform.OS,
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
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  const [commentText, setCommentText] = React.useState('');
  const [commentSending, setCommentSending] = React.useState(false);

  const sendComment = React.useCallback(async () => {
    if (!commentText.trim() || !user) {
      return;
    }
    setCommentSending(true);
    try {
      const client = await getUpdateClient();
      await client.mutate({
        mutation: CREATE_POST_COMMENT,
        variables: {
          createPostCommentInput: {
            content: commentText,
            userId: user.id,
            authorId: user.author?.id,
            postId: post.id,
          },
        },
      });

      const {data} = await client.query({
        query: POST,
        variables: {postId: post.id},
      });

      let post_contant: string = data.post.content;
      setPostView(data.post);
      setContent(
        post_contant.replace(REGULAR_HASTAG, function replacer(str) {
          return '<a id=hashtag href="' + str + '">' + str + '</a>';
        }),
      );

      setCommentText('');
    } finally {
      setCommentSending(false);
    }
  }, [commentText, user, post.id]);

  return (
    <ScrollView
      ref={scrollRef}
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
      style={[styles.main, {backgroundColor: colors.fillPrimary}]}>
      <RenderContent post={postView ?? post} />
      <Containter>
        <BoldText fontSize={18} style={{marginBottom: 15}}>
          {post.title}
        </BoldText>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <MediumText fontSize={12}>
              {postView?.createdAt ? getDate(new Date(postView.createdAt)) : ''}
            </MediumText>
            <MediumText style={{color: colors.colorMain}} fontSize={12}>
              {'  /  '}
            </MediumText>
            {/* <MediumText fontSize={12}>Экономика</MediumText>
          <MediumText style={{color: colors.colorMain}} fontSize={12}>
            {'  /  '}
          </MediumText> */}
            <MediumText fontSize={12}>{postView?.views} просмотров</MediumText>
          </View>

          <TouchableOpacity
            disabled={likeIsDisabled}
            onPress={async () => {
              if (token) {
                setLikeIsDisabled(true);
                if (
                  favorites.map(favorite => favorite.post?.id).includes(post.id)
                ) {
                  let idFavorite = favorites.find(
                    favorite => favorite.post?.id === post.id,
                  )?.id;
                  if (idFavorite) {
                    let response = await dispatch(removeFavorite(idFavorite));
                    if (response.meta.requestStatus === 'fulfilled') {
                      AppMetrica.reportEvent('POST_FAVORITE_REMOVE', {
                        user: user,
                        post_name: post.title,
                        date: new Date(),
                        date_string: new Date().toString(),
                        platform: Platform.OS,
                        app_version: DeviceInfo.getVersion(),
                      });
                    }
                  }
                  setLikeIsDisabled(false);
                } else {
                  let response = await dispatch(
                    createFavorite({
                      postId: post.id,
                    }),
                  );
                  if (response.meta.requestStatus === 'fulfilled') {
                    AppMetrica.reportEvent('POST_FAVORITE_ADD', {
                      user: user,
                      post_name: post.title,
                      date: new Date(),
                      date_string: new Date().toString(),
                      platform: Platform.OS,
                      app_version: DeviceInfo.getVersion(),
                    });
                  }
                  setLikeIsDisabled(false);
                }
              } else {
                dispatch(setLogged(false));
              }
            }}>
            <View
              style={{
                backgroundColor: favorites
                  .map(favorite => favorite.post?.id)
                  .includes(post.id)
                  ? colors.colorMainInActive
                  : colors.bgSecondary,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
              }}>
              <BookMark
                color={
                  favorites.map(favorite => favorite.post?.id).includes(post.id)
                    ? colors.colorMain
                    : colors.textPrimary
                }
                fill={
                  favorites.map(favorite => favorite.post?.id).includes(post.id)
                    ? colors.colorMain
                    : 'none'
                }
              />
            </View>
          </TouchableOpacity>
        </View>
        <Divider />
        {loading ? (
          <ActivityIndicator
            style={{marginTop: 20}}
            color={colors.colorMain}
            size={'large'}
          />
        ) : (
          <RenderHTML
            contentWidth={screenWidth}
            source={{html: content ?? ''}}
            systemFonts={['NotoSans-Regular', 'NotoSans-Bold']}
            baseStyle={{
              fontFamily: 'NotoSans-Regular',
              color: colors.textPrimary,
              fontSize: 16,
            }}
            tagsStyles={{
              a: {
                color: colors.textPrimary,
                textDecorationLine: 'none',
              },
              img: {
                width: screenWidth - 30,
              },
            }}
            idsStyles={{
              hashtag: {
                color: colors.colorMain,
                textDecorationColor: colors.colorMain,
                textDecorationLine: 'none',
              },
            }}
            renderersProps={{
              a: {
                onPress: (evt, href, htmlAttribs) => {
                  let hashtagPost = null;
                  if (htmlAttribs.id === 'hashtag') {
                    hashtagPost =
                      post.hashtags?.find(
                        item => item.hashtag?.name === htmlAttribs.href,
                      )?.hashtag ?? null;
                    if (hashtagPost) {
                      navigation.push('ViewTag', hashtagPost);
                    }
                  } else {
                    null;
                  }
                },
              },
            }}
          />
        )}
        <Divider style={{marginTop: 5}} />
        <View style={{marginTop: 20, gap: 10, marginBottom: 40}}>
          <BoldText style={{color: colors.textPrimary}}>
            Автор: {postView?.author?.nickname}
          </BoldText>
        </View>

        {/* COMMENTS */}
        <View style={[styles.commentContainer, {backgroundColor: colors.background}]}>
          <View style={styles.commentsHeader}>
            <BoldText style={{color: colors.textPrimary}}>
              Комметарии ({(postView?.totalComments ?? 0).toString()})
            </BoldText>
            <Pressable
              hitSlop={10}
              onPress={() =>
                navigation.navigate('Comments', {
                  postId: post.id,
                })
              }>
              <MediumText style={{color: colors.orange}}>
                <Text>Показать все</Text>
              </MediumText>
            </Pressable>
          </View>
          {/* INPUT */}
          {user && (
            <View style={styles.leaveComment}>
              <InputText
                placeholder="Написать комментарий"
                style={{alignItems: 'center', marginBottom: 20, flex: 1}}
                comment
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity
                style={styles.send}
                disabled={commentSending}
                onPress={sendComment}>
                <SendMessage_icon />
              </TouchableOpacity>
            </View>
          )}

          {/* CommentCard */}

          <View>
            <FlatList
              data={postView?.postComments ?? []}
              renderItem={({item}) => <NewsCommentCard commentItem={item} />}
              ItemSeparatorComponent={DevideCommentsCard}
            />
          </View>
        </View>
      </Containter>
    </ScrollView>
  );
};

const RenderContent = ({post}: {post: IPost}) => {
  const [activePage, setActivePage] = React.useState(0);
  const screenWidth = useWindowDimensions().width;
  const {colors} = useTheme();
  switch (true) {
    case post.media?.indexM3u8Url !== undefined:
      return (
        <View>
          <VideoPost
            inSight={true}
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
                <View
                  style={{
                    height: screenWidth,
                  }}>
                  <Image
                    source={{uri: item.url_1536 ?? undefined}}
                    resizeMode="cover"
                    style={{
                      flex: 1,
                      backgroundColor: colors.gray,
                      width: screenWidth,
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      );
    default:
      return <EmptyImage />;
  }
};

const DevideCommentsCard = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: colors.borderGray,
        marginVertical: 20,
      }}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  containerImagePage: {
    width: 46,
    height: 30,
    position: 'absolute',
    top: 15,
    left: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  commentContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: '100%',
  },
  commentsHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leaveComment: {
    flexDirection: 'row',
  },
  send: {
    width: 55,
    aspectRatio: 1,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 10,
  },
});
