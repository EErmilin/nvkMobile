import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppSelector } from '../../redux/hooks';
import FastImage from 'react-native-fast-image';
import BlogerProfileHead from './components/BlogerProfileHead';
import ShowSocialModal, { ShowSocialModalizeHandle } from './components/ShowSocialModal';
import BlogerProfileContentTabs from './components/BlogerProfileContentTabs';

const { width, height } = Dimensions.get('screen');



const BlogerProfile1 = () => {
    const postsRedux = useAppSelector(state => state.post.data);

    const showSocialRef = useRef<ShowSocialModalizeHandle>();


    const openSocial = () => { showSocialRef.current?.open() }

    const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

    const handleScroll = (event: any) => {
        const offsetY: number = event.nativeEvent?.contentOffset?.y;
        console.log(offsetY)
        // Если offsetY достигает 300, отключаем прокрутку
        if (offsetY && offsetY >= 150) {
            // setScrollEnabled(false);
        }
    };


    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                style={styles.scrollContainer}
                scrollEnabled={scrollEnabled}
                onScroll={handleScroll}
                onTouchMove={handleScroll}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <BlogerProfileHead openSocial={openSocial} />
                <View
                    style={styles.scrollContainer}
                >
                    <BlogerProfileContentTabs onTop={() => setScrollEnabled(true)} componentHeight={545} />
                </View>
            </ScrollView>
            <ShowSocialModal ref={showSocialRef} />
        </SafeAreaView>
    )
}

export default BlogerProfile1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20, // Подстройте отступ в соответствии с вашим дизайном
        minHeight: height,
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
        backgroundColor: "#f2f2f2"
    }

})