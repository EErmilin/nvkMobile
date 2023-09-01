import { StyleSheet, Dimensions, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SceneMap, TabView } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };



const BlogerContent = () => {
    const scenes = {
        first: TabScreen1,
        second: TabScreen2,
        third: TabScreen3,
    };
    const [index, setIndex] = useState(0);

    const renderScene = SceneMap(scenes);


    const handleChangeTab = (newIndex: number) => {
      setIndex(newIndex);
    };
  
    return (
      <TabView
        navigationState={{ index, routes: [{ key: 'first', title: 'Tab 1' }, { key: 'second', title: 'Tab 2' }, { key: 'third', title: 'Tab 3' }] }}
        renderScene={renderScene}
        onIndexChange={handleChangeTab}
        initialLayout={initialLayout}
      />
    );
}

const TabScreen1 = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Ваш контент для первой вкладки */}
    </View>
);

const TabScreen2 = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Ваш контент для второй вкладки */}
    </View>
);

const TabScreen3 = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Ваш контент для третьей вкладки */}
    </View>
);


export default BlogerContent;

const styles = StyleSheet.create({})