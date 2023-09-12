import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  GestureResponderEvent,
  Animated,
} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {HScrollView} from 'react-native-head-tab-view';
import {CollapsibleHeaderTabView} from 'react-native-tab-view-collapsible-header';
import BlogerContentTabBar from './components/BlogerContentTabBar';
import {tmpData1, tmpData2} from './components/tmpData';
import FastImage from 'react-native-fast-image';
import {
  BlogerContent_Audio,
  BlogerContent_Photo,
  BlogerContent_Video,
} from './components/BlogerContent';
import ShowSocialModal, {
  ShowSocialModalizeHandle,
} from './components/ShowSocialModal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AnimatedRef} from 'react-native-reanimated';
import BlogerProfileHead from './components/BlogerProfileHead';

const {width} = Dimensions.get('screen');

const PhotoRoute = () => (
  <HScrollView index={0}>
    <View style={styles.grid}>
      {tmpData1.map((element, index) => (
        <BlogerContent_Photo
          key={`s_${index}`}
          post={element}
          onPress={() => {}}
        />
      ))}
    </View>
  </HScrollView>
);

const VideoRoute = () => (
  <HScrollView index={1} onMomentumScrollEnd={() => {}}>
    <View style={styles.grid}>
      {tmpData2.map((element, index) => (
        <BlogerContent_Video
          key={`s_${index}`}
          post={element}
          onPress={() => {}}
        />
      ))}
    </View>
  </HScrollView>
);

const AudioRoute = () => (
  <HScrollView index={1} onMomentumScrollEnd={() => {}}>
    <View style={styles.grid}>
      {tmpData1.map((element, index) => (
        <BlogerContent_Audio
          key={`s_${index}`}
          post={element}
          onPress={() => {}}
        />
      ))}
    </View>
  </HScrollView>
);

const initialLayout = {width: Dimensions.get('window').width};

const BlogerProfile1 = () => {
  const showSocialRef = useRef<ShowSocialModalizeHandle>();
  const profileHeader = useRef<LegacyRef>();

  const openSocial = () => {
    showSocialRef.current?.open();
  };

  const [index, setIndex] = useState(0);
  const tabs = ['photo', 'audio', 'video'];
  const [routes] = React.useState([
    {key: 'photo', title: 'First'},
    {key: 'video', title: 'Second'},
    {key: 'audio', title: 'Third'},
  ]);

  const renderScene = SceneMap({
    photo: PhotoRoute,
    video: VideoRoute,
    audio: AudioRoute,
  });

  const renderTabBar = () => (
    <BlogerContentTabBar tabs={tabs} activeTab={index} goToPage={setIndex} />
  );

  const onResponderMove = (event: PointerEvent) => {

    const value = event.
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView
      onPointerMove={onResponderMove}
      >
        <View ref={profileHeader}></View>
      </GestureHandlerRootView>

      <CollapsibleHeaderTabView
        renderScrollHeader={() => <BlogerProfileHead openSocial={openSocial} />}
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
      <ShowSocialModal ref={showSocialRef} />
    </SafeAreaView>
  );
};

export default BlogerProfile1;

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
