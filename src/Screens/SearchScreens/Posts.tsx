import * as React from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl,
  FlatList,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {ApolloError} from '@apollo/client';
import ContentLoader, {Rect} from 'react-content-loader/native';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import RegularText from '../../components/RegularText';
import {IPost} from '../../models/Post';
import {POSTS} from '../../gql/query/posts/Post';
import {getUpdateClient} from '../../requests/updateHeaders';
import {useTheme} from '../../Styles/Styles';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
import {MusicPlayerContext} from '../../contexts/musicContext';
import {useAppSelector} from '../../redux/hooks';
import DeviceInfo from 'react-native-device-info';
import {PostCell} from '../../components/PostCell';

const Skeleton = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const {colors} = useTheme();
  const length = Math.ceil(screenHeight / (screenWidth / 3 - 2));

  return (
    <ContentLoader
      width={screenWidth.toString()}
      height={screenHeight - 120}
      backgroundColor={colors.skeletonBg}
      foregroundColor={colors.skeletonFg}>
      {Array(length)
        .fill(0)
        .map((item, index) => (
          <>
            <Rect
              key={index.toString() + 'image_left'}
              width={screenWidth / 3 - 2}
              height={screenWidth / 3 - 2}
              x={0}
              y={index * (screenWidth / 3)}
            />
            <Rect
              key={index.toString() + 'image_center'}
              width={screenWidth / 3 - 2}
              height={screenWidth / 3 - 2}
              x={screenWidth / 3}
              y={index * (screenWidth / 3)}
            />
            <Rect
              key={index.toString() + 'image_right'}
              width={screenWidth / 3 - 2}
              height={screenWidth / 3 - 2}
              x={(2 * screenWidth) / 3}
              y={index * (screenWidth / 3)}
            />
          </>
        ))}
    </ContentLoader>
  );
};

interface IProps {
  search: string;
  activeScreen: number;
  navigation: any; //TabNavigationProps<'Search'>['navigation'];
}

export const Posts = (props: IProps) => {
  const {navigation, search, activeScreen} = props;
  const screenHeight = useWindowDimensions().height;
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const screenWidth = useWindowDimensions().width;
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();
  const user = useAppSelector(state => state.user.data);

  const refresh = React.useCallback(async () => {
    if (activeScreen === 0) {
      try {
        setLoading(true);
        const client = await getUpdateClient();
        let response = await client.query({
          query: POSTS,
          variables: {
            search: search,
          },
        });
        // if (search.length > 3) {
        //   AppMetrica.reportEvent('SEARCH_POSTS', {
        //     user: user,
        //     search_posts: search,
        //     date: new Date(),
        //     date_string: new Date().toString(),
        //     platform: Platform.OS,
        //     device_id: !user ? DeviceInfo.getDeviceId() : undefined,
        //     app_version: DeviceInfo.getVersion(),
        //   });
        // }

        setPosts(response.data.posts);
      } catch (e) {
        console.log(e);
        if (e instanceof ApolloError) {
          Toast.show({
            type: 'error',
            text1: 'Ошибка',
            text2: 'Ошибка при поиске постов',
          });
        }
      } finally {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScreen, search]);

  React.useEffect(() => {
    refresh();
  }, [refresh, search]);

  return (
    <View style={{flex: 1, backgroundColor: colors.bgSecondary}}>
      <FlatList
        data={posts}
        numColumns={3}
        contentContainerStyle={{
          flex: posts.length > 0 ? 0 : 1,
          flexGrow: 1,
        }}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <RenderItem
            key={'post_' + index.toString()}
            item={item}
            size={(screenWidth - 2) / 3}
            index={index}
            length={posts.length}
            navigation={navigation}
          />
        )}
        refreshControl={
          <RefreshControl
            colors={[colors.colorMain]}
            tintColor={colors.colorMain}
            refreshing={loading}
            onRefresh={() => refresh()}
          />
        }
        ListEmptyComponent={
          loading && posts.length === 0 ? (
            <Skeleton />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                height: screenHeight - 190,
              }}>
              <RegularText
                fontSize={16}
                style={{color: colors.textSecondary, textAlign: 'center'}}>
                По вашему запросу, ничего не найдено
              </RegularText>
            </View>
          )
        }
      />
    </View>
  );
};

const RenderItem = (props: {
  item: IPost;
  size: number;
  index: number;
  navigation: TabNavigationProps<'Search'>['navigation'];
  length: number;
}) => {
  const {item, navigation, index, length} = props;
  const musicContext = React.useContext(MusicPlayerContext);

  return (
    <TouchableOpacity
      style={{
        marginTop: 0.5,
        marginBottom:
          index === length - 1
            ? musicContext.musicPlayerOption.music !== null
              ? 120
              : 70
            : index % 3 === 0
            ? 0
            : 0.5,
        marginRight: index % 3 === 2 ? 0 : 0.5,
        marginLeft: index % 3 === 0 ? 0 : 0.5,
      }}
      activeOpacity={0.3}
      onPress={() => {
        navigation.navigate('NewsView', {post: item});
      }}>
      <PostCell post={item} />
    </TouchableOpacity>
  );
};
