import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import OpenWeb_Icon from '../../../assets/icons/OpenWeb_Icon';
import VK_Icon from '../../../assets/icons/VK_Icon';
import { useTheme } from '../../../Styles/Styles';
import { Separator } from '../../../components';
import Telegram_Icon from '../../../assets/icons/Telegram_Icon';
import Odnoklassniki_icon from '../../../assets/icons/Odnoklassniki_icon';
import YouTube_Icon from '../../../assets/icons/YouTube_Icon';
import { TouchableOpacity } from 'react-native';

export type ShowSocialModalizeHandle = {
    open: () => void;
};

const { width, height } = Dimensions.get('screen');

const ShowSocialModal = forwardRef((_, ref) => {
    const { colors } = useTheme();

    const [isVisible, setIsVisible] = useState(false);

    const tongleVisible = () => setIsVisible(oldValue => !oldValue);


    useImperativeHandle<unknown, ShowSocialModalizeHandle>(ref, () => ({
        open: tongleVisible
    }));

    const onLinkPress = (link: string) => { }

    if (!isVisible)
        return <></>;

    return (
        <TouchableOpacity style={styles.container} onPress={tongleVisible}>
            <TouchableOpacity style={[styles.content, { backgroundColor: colors.textPrimary }]} activeOpacity={2}>
                <SocialElement link='vk://nvk-online' icon={<VK_Icon />} onPress={onLinkPress} />
                <Separator mt={15} mb={15} color={colors.borderPrimary} />
                <SocialElement link='vk://nvk-online' icon={<Telegram_Icon />} onPress={onLinkPress} />
                <Separator mt={15} mb={15} color={colors.borderPrimary} />
                <SocialElement link='vk://nvk-online' icon={<Odnoklassniki_icon />} onPress={onLinkPress} />
                <Separator mt={15} mb={15} color={colors.borderPrimary} />
                <SocialElement link='vk://nvk-online' icon={<YouTube_Icon />} onPress={onLinkPress} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
})

export default ShowSocialModal;

type TSocialElementProps = {
    link: string;
    icon: any;
    onPress: (link: string) => void
};

const SocialElement = ({
    link,
    icon,
    onPress: onPressInner
}: TSocialElementProps) => {
    const onPress = () => onPressInner(link)
    return (
        <TouchableOpacity style={styles.social_wrapper} onPress={onPress}>
            <View style={styles.row}>
                {icon}
                <Text style={styles.social_text}>{link}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.social_text}>Перейти</Text>
                <OpenWeb_Icon />
            </View>
        </TouchableOpacity>)
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 22
    },
    content: {
        borderRadius: 20,
        width: '100%',
        padding: 20,
        backgroundColor: 'black',
        marginBottom: 150
    },
    social_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    social_text: {
        fontFamily: 'NotoSans-Regular',
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
        marginHorizontal: 8
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})