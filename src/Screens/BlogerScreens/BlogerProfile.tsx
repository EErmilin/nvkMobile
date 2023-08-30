import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppSelector } from '../../redux/hooks';
import FastImage from 'react-native-fast-image';
import BlogerProfileHead from './components/BlogerProfileHead';

const { width } = Dimensions.get('screen');



const BlogerProfile = () => {
    const postsRedux = useAppSelector(state => state.post.data);


    const getSortedData = () => {
        let temp = [...postsRedux];
        return temp.sort(function (a, b) {
            return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <BlogerProfileHead />
            <ScrollView>
                <View style={styles.grid}>
                    {getSortedData().map((element) =>
                        <FastImage
                            source={{ uri: "https://avatars.githubusercontent.com/u/20685587?v=4" }}
                            style={styles.post_image}
                        />
                    )}

                </View>
            </ScrollView>
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
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: width,
        backgroundColor: 'red'
    },
    post_image: {
        width: width / 3 -1,
        height: width / 3,
        marginBottom: 1.5
    }

})