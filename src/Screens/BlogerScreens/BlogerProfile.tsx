import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  GestureResponderEvent,
  Animated,
} from 'react-native';
import { FC } from 'react';
import { RootNavigationProps } from '../../navigation/types/RootStackTypes';
import { SceneMap } from 'react-native-tab-view';
import { HScrollView } from 'react-native-head-tab-view';
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header';
import BlogerContentTabBar from './components/BlogerContentTabBar';
import { tmpData1, tmpData2 } from './components/tmpData';
import FastImage from 'react-native-fast-image';
import {
  BlogerContent_Audio,
  BlogerContent_Photo,
  BlogerContent_Video,
} from './components/BlogerContent';
import ShowSocialModal, {
  ShowSocialModalizeHandle,
} from './components/ShowSocialModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BlogerProfileHead from './components/BlogerProfileHead';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAuthor } from '../../redux/thunks/author/GetAuthor';
import { IAuthor } from '../../models/Author';
import { IPost } from '../../models/Post';
import { getPosts } from '../../redux/thunks/post/GetPosts';
import { clearAuthorScreen } from '../../redux/slices/screensSlice';
import { useTheme } from '../../Styles/Styles';

const { width } = Dimensions.get('screen');

const PhotoRoute = ({ onTap }: { onTap: (post: IPost) => void }) => {
  const posts =
    useAppSelector(state => state.screens.authorData)?.author?.posts ?? [];
  return (
    <HScrollView index={0}>
      <View style={styles.grid}>
        {posts.map((element, index) => (
          <BlogerContent_Photo
            key={`s_${index}`}
            post={element}
            onPress={() => {
              onTap(element);
            }}
          />
        ))}
      </View>
    </HScrollView>
  );
};

const VideoRoute = () => (
  <HScrollView index={1} onMomentumScrollEnd={() => { }}>
    <View style={styles.grid}>
      {tmpData2.map((element, index) => (
        <BlogerContent_Video
          key={`s_${index}`}
          post={element}
          onPress={() => { }}
        />
      ))}
    </View>
  </HScrollView>
);

const AudioRoute = () => (
  <HScrollView index={1} onMomentumScrollEnd={() => { }}>
    <View style={styles.grid}>
      {tmpData1.map((element, index) => (
        <BlogerContent_Audio
          key={`s_${index}`}
          post={element}
          onPress={() => { }}
        />
      ))}
    </View>
  </HScrollView>
);

const initialLayout = { width: Dimensions.get('window').width };

const BlogerProfile: FC<RootNavigationProps<'BlogerProfile'>> = ({
  route,
  navigation,
}) => {
  const authorId = route?.params?.id;
  const dispatch = useAppDispatch();
  const showSocialRef = useRef<ShowSocialModalizeHandle>();
  const authorData = useAppSelector(state => state.screens.authorData);
  const userId = useAppSelector(state => state.user.data?.id);
  const { colors } = useTheme()
  const openSocial = () => {
    showSocialRef.current?.open();
  };

  const [index, setIndex] = useState(0);

  const tabs = ['photo' /*, 'audio', 'video' */];

  const [routes] = React.useState([
    { key: 'photo', title: 'First' },
    // {key: 'video', title: 'Second'},
    // {key: 'audio', title: 'Third'},
  ]);

  const renderScene = SceneMap({
    photo: () =>
      PhotoRoute({
        onTap: post => navigation.navigate('NewsView', { post: post }),
      }),
    // video: VideoRoute,
    // audio: AudioRoute,
  });

  useEffect(() => {
    dispatch(getAuthor({ id: authorId, userId: userId })).then(e => {
      // setData(e.payload as IAuthor);
      console.log(e);
    });
  }, []);

  const renderTabBar = () => (
    <BlogerContentTabBar tabs={tabs} activeTab={index} goToPage={setIndex} />
  );

  useEffect(() => {
    () => {
      dispatch(clearAuthorScreen());
    };
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.bgSecondary}]}>
      <CollapsibleHeaderTabView
        renderScrollHeader={() => <BlogerProfileHead openSocial={openSocial} />}
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
      <ShowSocialModal ref={showSocialRef} />
    </View>
  );
};

export default BlogerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scene: {
    flex: 1,
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    gap: 1,
    flexWrap: 'wrap',
    width: width,
  },
  post_image: {
    width: (width - 2) / 3,
    height: width / 3,
    marginTop: 1,
    backgroundColor: '#f2f2f2',
  },
  post_video: {
    width: (width - 2) / 3,
    height: width / 3,
    marginTop: 1,
    backgroundColor: '#f2f2f2',
  },
  post_audio: {
    width: (width - 2) / 3,
    height: width / 3,
    marginTop: 1,
    backgroundColor: '#f2f2f2',
  },
});
