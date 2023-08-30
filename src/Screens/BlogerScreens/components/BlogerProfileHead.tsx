import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { Button } from '../../../components';


const { width } = Dimensions.get('screen');

type TProps = {
    profile?: any
}

const BlogerProfileHead = ({ profile }: TProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.head_wraper}>
                <FastImage
                    source={{ uri: "https://avatars.githubusercontent.com/u/20685587?v=4" }}
                    style={styles.profile_image}
                />
                <CountElement title='Публикации' count={30} />
                <CountElement title='Подписчиков' count={30} />
                <CountElement title='Подписки' count={30} />

            </View>

            <AboutBloger text='Не следует, однако забывать, что начало повседневной работы по формированию позиции влечет за собой процесс внедр' />
            <SocialInfo />
        </View>
    )
}

export default BlogerProfileHead;

type TCountElementProps = {
    title: string,
    count: number
}


const CountElement = ({ title, count }: TCountElementProps) =>
    <View style={styles.countElement_wraper}>
        <Text style={styles.countElement_count}>{count}</Text>

        <Text style={styles.countElement_title}>{title}</Text>
    </View>;


type TAboutBlogerProps = {
    text: string
}


const AboutBloger = ({ text }: TAboutBlogerProps) =>
    <View style={styles.about_wraper}>
        <Text style={styles.about_text}>{text}
            <Text style={styles.about_text_else}> ещё ...</Text>
        </Text>


    </View>


type TSocialInfo = {
}


const SocialInfo = ({ }: TSocialInfo) =>
    <View style={styles.social_wraper}>
        <Button
            title='Подписаться'
            style={styles.social_subscribeButton}
        />

    </View>



const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 20
    },
    head_wraper: {
        height: 90,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profile_image: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    countElement_wraper: {
        height: 42,
        justifyContent: 'space-between'
    },
    countElement_title: {
        fontFamily: 'NotoSans-Regular',
        fontSize: 12,
    },
    countElement_count: {
        fontFamily: 'NotoSans-Bold',
        fontSize: 14,
    },
    about_wraper: {
        marginTop: 20,
        width: '100%',
    },
    about_text: {
        fontFamily: 'NotoSans-Regular',
        fontSize: 14,
        lineHeight: 24
    },
    about_text_else: {
        fontFamily: 'NotoSans-Regular',
        fontSize: 14,
        lineHeight: 24,
        color: "#F6A80B",
    },
    social_wraper: {
        width: '100%',
        marginTop: 15
    },
    social_subscribeButton: {
        width: 155,
        height: 40
    }
})