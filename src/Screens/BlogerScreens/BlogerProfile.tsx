import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppSelector } from '../../redux/hooks';
import FastImage from 'react-native-fast-image';
import BlogerProfileHead from './components/BlogerProfileHead';
import ShowSocialModal, { ShowSocialModalizeHandle } from './components/ShowSocialModal';

const { width } = Dimensions.get('screen');



const BlogerProfile = () => {
    const postsRedux = useAppSelector(state => state.post.data);

    const showSocialRef = useRef<ShowSocialModalizeHandle>();


    const openSocial = () => { showSocialRef.current?.open() }
    const getSortedData = () => {
        // return new Array(10);

        let temp = [...postsRedux];
        return temp.sort(function (a, b) {
            return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={false}>

                <BlogerProfileHead openSocial={openSocial} />

                <View style={styles.grid}>
                    {getSortedData().map((element,) =>

                        <FastImage
                            key={element.id}
                            source={{ uri: "https://avatars.githubusercontent.com/u/20685587?v=4" }}
                            style={styles.post_image}
                        />
                    )}

                </View>
            </ScrollView>
            <ShowSocialModal ref={showSocialRef} />
        </SafeAreaView>
    )
}

export default BlogerProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollContainer: {

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