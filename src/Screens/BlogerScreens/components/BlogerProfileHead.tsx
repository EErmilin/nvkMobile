import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import FastImage from 'react-native-fast-image';
import { Button } from '../../../components';
import TextWithMore from '../../../components/TextWithMore';
import DropDown_Icon from '../../../assets/icons/DropDown_Icon';
import { ShowSocialModalizeHandle } from './ShowSocialModal';


const { width } = Dimensions.get('screen');

type TProps = {
    profile?: any,
    openSocial?: () => void;
}

const BlogerProfileHead = ({ profile, openSocial }: TProps) => {



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
            <SocialInfo openSocial={openSocial} />
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


const AboutBloger = ({ text }: TAboutBlogerProps) => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    return (<View style={styles.about_wraper}>
        <TextWithMore
            text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur ligula eget urna ultricies, eu bibendum nulla tincidunt. Vivamus pellentesque libero eget tortor ullamcorper placerat.'}
        />


    </View>)
}


type TSocialInfo = {
    openSocial?: () => void;
}


const SocialInfo = ({ openSocial }: TSocialInfo) => {
    const socialButtonInput = (
        <View style={styles.social_showButton_inputWrapper}>
            <Text style={styles.social_showButton_inputText}
            >Соц. сети</Text>
            <DropDown_Icon />
        </View>
    );

    return (
        <View style={styles.social_wraper}>
            <Button
                title='Подписаться'
                style={styles.social_subscribeButton}
            />

            <Button
                item={socialButtonInput}
                style={styles.social_showButton}
                onPress={openSocial}
            />
        </View>);
}



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
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    social_subscribeButton: {
        width: 155,
        height: 40
    },
    social_showButton: {
        width: 155,
        height: 40,
        backgroundColor: 'transparent'
    },
    social_showButton_inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    social_showButton_inputText: {
        fontFamily: 'NotoSans-Regular',
        fontSize: 14,
        marginRight: 8
    }
})