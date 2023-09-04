import React, { useState, useEffect, useRef, createRef, useCallback } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('screen');

const tmpData1 = [1, 1, 1]
const tmpData2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
const tmpData3 = [1, 1, 1]

type TPageProps = {
    onTop: () => void;
}

type RootStackParamList = {
    Screen1: TPageProps;
    Screen2: TPageProps;
    Screen3: TPageProps;
};

type MyScreenRouteProps = {
    route: RouteProp<RootStackParamList, 'Screen2'>;
};


const Screen1: React.FC<TPageProps> = ({ onTop }) => {

    const handleScroll = (event: any) => {
        if (event.nativeEvent.contentOffset.y == 0) {
            onTop();
        }
    };


    return (
        <ScrollView style={{ flex: 1 }} onScroll={handleScroll}>
            <View style={styles.grid}>
                {tmpData1.map((element, index) =>
                    <FastImage
                        key={`s_${index}`}
                        source={{ uri: "https://avatars.githubusercontent.com/u/20685587?v=4" }}
                        style={styles.post_image}
                    />)}
            </View>
        </ScrollView>
    )
};
const Screen2: React.FC<MyScreenRouteProps> = ({ route }) => {
    const { onTop } = route.params;
    const handleScroll = (event: any) => {
        if (event.nativeEvent.contentOffset.y == 0) {
            onTop();
        }
    };

    return (
        <ScrollView style={{ flex: 1 }} onScroll={handleScroll}>
            <View style={styles.grid}>
                {tmpData1.map((element, index) =>
                    <FastImage
                        key={`s_${index}`}
                        source={{ uri: "https://avatars.githubusercontent.com/u/20685587?v=4" }}
                        style={styles.post_image}
                    />)}
            </View>
        </ScrollView>
    )
};
const Screen3: React.FC<MyScreenRouteProps> = ({ route }) => {
    const { onTop } = route.params;

    const handleScroll = (event: any) => {
        if (event.nativeEvent.contentOffset.y == 0) {
            onTop();
        }
    };

    return (
        <ScrollView style={{ flex: 1 }} onScroll={handleScroll}>
            <View style={styles.grid}>
                {tmpData1.map((element, index) =>
                    <FastImage
                        key={`s_${index}`}
                        source={{ uri: "https://avatars.githubusercontent.com/u/20685587?v=4" }}
                        style={styles.post_image}
                    />)}
            </View>
        </ScrollView>
    )
};

const BlogerProfileContentTabs = ({ onTop, componentHeight = 500 }: { onTop: () => void, componentHeight?: number }) => {

    const carouselRef: React.RefObject<ICarouselInstance> = createRef();
    const [selectedTab, setSelectedTab] = useState(0);


    const renderItem = useCallback(({ item, index }: { item: number[], index: number }) => {

        return <Screen1 onTop={onTop} />
    }, []);

    return (
        <View>
            <Carousel
                ref={carouselRef}
                loop={false}
                width={width}
                height={componentHeight}
                data={[tmpData1, tmpData2, tmpData3]}
                renderItem={renderItem}
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
                style={{
                    width: width,
                    height: componentHeight,
                    backgroundColor: '#fff',
                }}
                scrollAnimationDuration={500}
                onSnapToItem={setSelectedTab}
            >

            </Carousel>
        </View>
    );
}

export default BlogerProfileContentTabs;


const styles = StyleSheet.create({
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
        backgroundColor: "#f2f2f2"
    }
})