import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BoldText, Button, InputText } from '../../components'

import { useForm } from 'react-hook-form';

import { InputForm } from '../../components/react-hook-form-fields/InputForm'
import { colors } from '../../Styles/Styles';
import VK_Icon from '../../assets/icons/VK_Icon';
import Plus_icon from '../../assets/icons/Plus_icon';
import Telegram_Icon from '../../assets/icons/Telegram_Icon';
import YouTube_Icon from '../../assets/icons/YouTube_Icon';
import Odnoklassniki_icon from '../../assets/icons/Odnoklassniki_icon';

const { width } = Dimensions.get('screen');



const CreateBloger = () => {


    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const [siteList, setSiteList] = useState([""]);

    const addSite = () => {
        setSiteList([
            ...siteList,
            ""
        ]);
        console.log("addSite")
    };

    const removeSite = (currentIndex: number) => {
        setSiteList(siteList.filter((_, index) => index !== currentIndex));
    };

    const handleSubmitForm = async (fields: any) => {



    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <BoldText fontSize={16} mt={21}>Профиль</BoldText>

                <BoldText fontSize={16} mt={30} mb={15}>Сайт(ы)</BoldText>

                {siteList.map((_, index) =>
                    <View style={styles.social_container} key={`sites[${index}]`}>

                        <InputForm
                            name={`sites[${index}]`}
                            placeholder='Сайт'
                            control={control}
                            width={width - 100}
                        />
                        <Plus_icon
                            containerStyle={styles.social_icon}
                            backgroundColor={colors.background}
                            onPress={
                                index !== 0 ?
                                    () => removeSite(index)
                                    :
                                    addSite
                            }
                        />

                    </View>
                )}

                <BoldText fontSize={16} mt={30}>Соц. сети</BoldText>

                <View style={styles.social_container}>
                    <InputForm
                        name='vk'
                        placeholder='Ссылка'
                        control={control}
                        width={width - 100}
                    />

                    <VK_Icon
                        containerStyle={styles.social_icon}
                        backgroundColor={colors.background}
                    />
                </View>

                <View style={styles.social_container}>
                    <InputForm
                        name='telegram'
                        placeholder='Ссылка'
                        control={control}
                        width={width - 100}
                    />

                    <Telegram_Icon
                        containerStyle={styles.social_icon}
                        backgroundColor={colors.background}
                    />
                </View>


                <View style={styles.social_container}>
                    <InputForm
                        name='youTube'
                        placeholder='Ссылка'
                        control={control}
                        width={width - 100}
                    />

                    <YouTube_Icon
                        containerStyle={styles.social_icon}
                        backgroundColor={colors.background}
                    />
                </View>


                <View style={styles.social_container}>
                    <InputForm
                        name='oddnoklassniki'
                        placeholder='Ссылка'
                        control={control}
                        width={width - 100}
                    />

                    <Odnoklassniki_icon
                        containerStyle={styles.social_icon}
                        backgroundColor={colors.background}
                    />
                </View>
            </ScrollView>

            <Button title='Опубликовать'  disabled={true} onPress={handleSubmit(handleSubmitForm)} />


        </SafeAreaView>
    )
}

export default CreateBloger

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,        
        paddingBottom: 15,
        backgroundColor: '#fff'
    },
    scrollContainer: {

    },

    social_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    social_input: {
        width: width - 100
    },
    social_icon: {
        width: 60,
        height: 60,
        borderRadius: 15,

    }
})