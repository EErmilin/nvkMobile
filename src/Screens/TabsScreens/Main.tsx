import * as React from 'react';
import {
  SafeAreaView,
  View,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
} from 'react-native';
import {PostItem} from '../../components/PostItem';
import {useTheme} from '../../Styles/Styles';

// import Toast from 'react-native-toast-message';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
// import {useAppDispatch, useAppSelector} from '../../redux/hooks';
// import {getPosts} from '../../redux/thunks/post/GetPosts';
// import {ApolloError} from '@apollo/client';
import {IPost} from '../../models/Post';
import {useIsFocused} from '@react-navigation/native';
import {MainSkeleton} from '../NewsScreen/MainSkeleton';
import {MusicPlayerContext} from '../../contexts/musicContext';
import {getUpdateClient} from '../../requests/updateHeaders';
import {IGetPostArg} from '../../redux/types/PostTypes';
import {POSTS} from '../../gql/query/posts/Post';

const TAKE = 10;
const ACTIVITY_SIZE = 30;

export const Main: React.FC<TabNavigationProps<'Main'>> = props => {
  const {navigation} = props;
  const ref = React.useRef<ScrollView>(null);
  // const postsRedux = useAppSelector(state => state.post.data);
  // const dispatch = useAppDispatch();
  const {colors, Style} = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [loadingEnd, setLoadingEnd] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const musicContext = React.useContext(MusicPlayerContext);
  const [posts, setPosts] = React.useState<IPost[]>([]);
  // const responsePost = React.useCallback(async () => {
  //   console.log({
  //     take: TAKE,
  //     skip: 0,
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     where: props.route.params?.authorId
  //       ? {
  //           authorId: {equals: props.route.params.authorId},
  //         }
  //       : undefined,
  //   });
  //   try {
  //     setLoading(true);
  //     await dispatch(
  //       getPosts({
  //         take: TAKE,
  //         skip: 0,
  //         orderBy: {
  //           createdAt: 'desc',
  //         },
  //         where: props.route.params?.authorId
  //           ? {
  //               authorId: {equals: props.route.params.authorId},
  //             }
  //           : undefined,
  //       }),
  //     );
  //     setLoading(false);
  //   } catch (e) {
  //     if (e instanceof ApolloError) {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Ошибка',
  //         text2: e.message,
  //       });
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [dispatch, props]);

  // React.useEffect(() => {
  //   responsePost();
  // }, [responsePost]);

  console.log(props.route.params);

  const getPosts = React.useCallback(async () => {
    setLoading(true);
    try {
      const client = await getUpdateClient();
      const {data} = await client.query<{posts: IPost[]}, IGetPostArg>({
        query: POSTS,
        variables: {
          take: TAKE,
          skip: 0,
          orderBy: {
            createdAt: 'desc',
          },
          where: props.route.params?.authorId
            ? {
                authorId: {equals: props.route.params.authorId},
              }
            : undefined,
        },
      });
      setPosts(data.posts);
    } finally {
      setLoading(false);
    }
  }, [props.route.params?.authorId]);

  const sortedPosts = React.useMemo(() => {
    let temp = [...posts];
    return temp.sort(function (a, b) {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    });
  }, [posts]);

  React.useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      if (flag && e.data.state.index === 1 && posts.length) {
        ref.current?.scrollTo({
          y: 0,
          animated: true,
        });
      }
      if (e.data.state.index !== 1) {
        setFlag(false);
      } else {
        setFlag(true);
      }
    });

    return unsubscribe;
  }, [flag, navigation, posts.length]);

  const [position, setPosition] = React.useState<number | null>(null);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPosition(event.nativeEvent.contentOffset.y);
  };
  const handleMomentumScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    let payloadPost: any = [];
    let scrollPosition = event.nativeEvent.contentOffset.y;
    let screenHeight = event.nativeEvent.layoutMeasurement.height;
    let contentSizyHeight = event.nativeEvent.contentSize.height;
    if (
      Math.floor(contentSizyHeight) <= Math.floor(screenHeight + scrollPosition)
    ) {
      !loading &&
        (async () => {
          try {
            setLoadingEnd(true);
            const client = await getUpdateClient();
            const {data} = await client.query<{posts: IPost[]}, IGetPostArg>({
              query: POSTS,
              variables: {
                take: TAKE,
                skip: sortedPosts.length,
                orderBy: {
                  createdAt: 'desc',
                },
                where: props.route.params?.authorId
                  ? {
                      authorId: {equals: props.route.params.authorId},
                    }
                  : undefined,
              },
            });

            setPosts(value => {
              const ids: Record<number, boolean> = {};
              for (const p of value) {
                ids[p.id] = true;
              }

              return [...value, ...data.posts.filter(p => !ids[p.id])];
            });
          } catch (e) {
            console.log(e);
          } finally {
            !payloadPost.length &&
              position &&
              position > contentSizyHeight - screenHeight - 30 &&
              ref.current?.scrollTo({
                animated: true,
                y: contentSizyHeight - screenHeight - 30,
              });
            setLoadingEnd(false);
          }
        })();
    }
  };
  if (!sortedPosts.length && loading) {
    return (
      <View style={{flex: 1, backgroundColor: colors.fillPrimary}}>
        <SafeAreaView />
        <SafeAreaView style={Style.container}>
          <ScrollView>
            <View
              style={{
                marginBottom: 10,
                backgroundColor: colors.fillPrimary,
                borderRadius: 20,
                paddingBottom: 20,
              }}>
              <MainSkeleton />
            </View>
            <View
              style={{
                marginBottom:
                  musicContext.musicPlayerOption.music !== null
                    ? 10 + 60 + 70
                    : 20 + 60,
                backgroundColor: colors.fillPrimary,
                borderRadius: 20,
                paddingBottom: 20,
              }}>
              <MainSkeleton />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.fillPrimary}}>
      <SafeAreaView />
      <SafeAreaView style={Style.container}>
        <ScrollView
          onScroll={handleScroll}
          keyboardShouldPersistTaps={'always'}
          onMomentumScrollEnd={handleMomentumScroll}
          ref={ref}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingBottom: 109,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.colorMain]}
              tintColor={colors.colorMain}
              refreshing={loading}
              onRefresh={() => {
                setLoading(true);
                getPosts();
              }}
            />
          }>
          {sortedPosts.map(item => {
            return (
              <RenderItem
                key={item.id.toString()}
                position={position}
                post={item}
                navigation={navigation}
              />
            );
          })}
          {loadingEnd && (
            <View style={{height: ACTIVITY_SIZE}}>
              <ActivityIndicator
                color={colors.colorMain}
                style={{alignSelf: 'center'}}
                size={ACTIVITY_SIZE}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const RenderItem = ({
  navigation,
  post,
  position,
}: {
  navigation: TabNavigationProps<'Main'>['navigation'];
  post: IPost;
  position: number | null;
}) => {
  const [itemPos, setItemPos] = React.useState<{
    start: number | null;
    end: number | null;
  }>({start: null, end: null});
  const focused = useIsFocused();
  const {width, height} = Dimensions.get('window');
  const getStart = () => {
    if (
      focused &&
      itemPos.start &&
      itemPos.end &&
      position &&
      position >= itemPos.start - height + width &&
      position <= itemPos.end - width / 2
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <PostItem
      inSight={getStart()}
      post={post}
      onLayout={event => {
        setItemPos({
          start: event.nativeEvent.layout.y + 80,
          end: event.nativeEvent.layout.y + 80 + width,
        });
      }}
      navigation={navigation}
    />
  );
};
