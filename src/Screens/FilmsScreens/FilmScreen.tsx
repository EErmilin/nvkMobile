import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";
import {FC} from "react";
import {RootNavigationProps} from "../../navigation/types/RootStackTypes";
import {BoldText, Containter, RegularText, VideoPlayer} from "../../components";
import {colors, useTheme} from "../../Styles/Styles";
import {HeartIcon} from "../../components/SVGcomponents/HeartIcon";
import {ClockIcon} from "../../components/SVGcomponents/ClockIcon";
import {ViewedIcon} from "../../components/SVGcomponents/ViewedIcon";
import WebView from "react-native-webview";
import {ArrowRight} from "../../components/SVGcomponents";
import {Review} from "../../components/Review";
import Animated from "react-native-reanimated";
import MediumText from "../../components/MediumText";

//mock data
const data = [1]
const item = {
    name: 'name',
    age: '16+',
    time: '40 min',
    genre: 'comedy',
    year: 2022,
    country: 'russia',
    views: 231,
    price: 199,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus aspernatur consectetur distinctio, ducimus ipsa maxime molestiae nobis obcaecati quibusdam quod quos sint voluptatem. At harum id magni nemo quasi.',
    rating_kinopoisk: 6.6,
    rating_nbk: 8.6,
    reviews_kinopoisk: 112,
    reviews_nbk: 32,
    reviews: [
        {
            id: 1,
            author: 'author1',
            url: '',
            rating_nbk: 2.3,
            reviews_nbk: 'psum dolor sit amet, consectetur adipisicing elit. Ab accusamus aspernatur consectetur distinctio, ducimus ipsa maxime molestiae nobis obcaecati quibusdam quod quos sint voluptatem. At harum id magni nemo quasi.',
            date: '31.11.22'
        },
        {
            id: 2,
            author: 'author2',
            url: '',
            rating_nbk: 6.3,
            reviews_nbk: 'distinctio, ducimus ipsa maxime molestiae nobis obcaecati quibusdam quod quos sint voluptatem. At harum id magni nemo quasi.',
            date: '21.01.23'
        },
    ]
}

export const FilmScreen: FC<RootNavigationProps<'Film'>> = () => {
    const {colors} = useTheme();

    return <SafeAreaView style={styles.container}>
        <ScrollView>
            {data.length
                ? <VideoPlayer urls={{url: '', hls: []}}/>
                : <ActivityIndicator color={colors.colorMain} size={'large'}/>
            }
            <Containter style={{gap: 25}}>
                <Animated.View style={{gap: 10}}>
                    <Animated.View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Animated.View style={{gap: 5, flexDirection: 'row', alignItems: 'center'}}>
                            <BoldText fontSize={18}>{item.name}</BoldText>
                            <RegularText style={{color: colors.textSecondary}}>{item.age}</RegularText>
                        </Animated.View>
                        <TouchableOpacity>
                            <Animated.View style={styles.circle}>
                                <HeartIcon color={colors.white}/>
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={{gap: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <ClockIcon color={colors.colorMain}/>
                        <RegularText>{item.time}</RegularText>
                        <RegularText style={{color: colors.colorMain}}>/</RegularText>
                        <RegularText>{item.genre}</RegularText>
                    </Animated.View>
                    <Animated.View>
                        <RegularText style={{color: colors.textSecondary}}>
                            {item.year} / {item.country} / {item.views}
                        </RegularText>
                    </Animated.View>
                </Animated.View>
                <Animated.View style={{flexDirection: 'row', gap: 15}}>
                    <TouchableOpacity style={styles.btn}>
                        <MediumText style={styles.textColor}>Смотреть</MediumText>
                        <MediumText style={styles.textColor} fontSize={12}>
                            За {item.price} p
                        </MediumText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.btnOutlined, {flexDirection: 'row', gap: 8}]}>
                        <MediumText style={styles.textColorOutlined}>Просмотрен</MediumText>
                        <ViewedIcon color={colors.colorMain}/>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    style={{
                        borderBottomColor: colors.borderPrimary,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <Animated.View style={{gap: 20}}>
                    <BoldText fontSize={16}>О фильме</BoldText>
                    <MediumText>{item.description}</MediumText>
                </Animated.View>
                <Animated.View>
                    <BoldText fontSize={16}>Трейлер</BoldText>
                    {/*<WebView*/}
                    {/*    style={{flex: 1}}*/}
                    {/*    javaScriptEnabled={true}*/}
                    {/*    source={{uri: 'https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0&autoplay=0&showinfo=0&controls=0'}}*/}
                    {/*    // style={{ marginTop: 20, width: 320, height: 230 }}*/}
                    {/*    // javaScriptEnabled={true}*/}
                    {/*    // domStorageEnabled={true}*/}
                    {/*    // source={{ uri: "https://www.youtube.com/embed/-ZZPOXn6_9w" }}*/}
                    {/*/>*/}
                </Animated.View>
                <Animated.View>
                    <BoldText fontSize={16}>{item.name}</BoldText>
                    <MediumText>1 february 2021</MediumText>
                </Animated.View>
                <Animated.View style={styles.flexBetween}>
                    <MediumText>Языки</MediumText>
                    <TouchableOpacity style={styles.smallBtn}>
                        <MediumText style={styles.textColor}>Якуцкий</MediumText>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    style={{
                        borderBottomColor: colors.borderGray,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <Animated.View style={styles.flexBetween}>
                    <MediumText>Субтитры</MediumText>
                    <TouchableOpacity style={styles.smallBtn}>
                        <MediumText style={styles.textColor}>Русские</MediumText>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{gap: 10}}>
                    <Animated.View style={styles.box}>
                        <Animated.View style={styles.flexBetween}>
                            <Animated.View style={{flexDirection: 'row', gap: 15}}>
                                <Animated.View style={styles.rating}>
                                    <BoldText style={{color: colors.white}} fontSize={16}>
                                        {item.rating_kinopoisk.toString()}
                                    </BoldText>
                                </Animated.View>
                                <Animated.View>
                                    <BoldText>Рейтинг Кинопоиск</BoldText>
                                    <RegularText fontSize={12}>{item.reviews_kinopoisk} отзывов</RegularText>
                                </Animated.View>
                            </Animated.View>
                            <ArrowRight color={colors.colorMain}/>
                        </Animated.View>
                    </Animated.View>
                    <Animated.View style={styles.box}>
                        <Animated.View style={styles.flexBetween}>
                            <Animated.View style={{flexDirection: 'row', gap: 15}}>
                                <Animated.View style={styles.rating}>
                                    <BoldText style={{color: colors.white}} fontSize={16}>
                                        {item.rating_nbk.toString()}
                                    </BoldText>
                                </Animated.View>
                                <Animated.View>
                                    <BoldText>Рейтинг НБК</BoldText>
                                    <RegularText fontSize={12}>{item.reviews_kinopoisk} отзывов</RegularText>
                                </Animated.View>
                            </Animated.View>
                            <TouchableOpacity style={[styles.smallBtn, styles.btnOutlined]}>
                                <RegularText>Оценить</RegularText>
                            </TouchableOpacity>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
                <Animated.View style={styles.flexBetween}>
                    <BoldText fontSize={16}>Отзывы</BoldText>
                    <Animated.View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        <BoldText fontSize={16}>
                            {item.reviews_nbk.toString()}
                        </BoldText>
                        <ArrowRight/>
                    </Animated.View>
                </Animated.View>
                <ScrollView horizontal>
                    <Animated.View style={{flexDirection: 'row', gap: 16}}>
                        {item.reviews.length
                            ? item.reviews.map(item => <Review key={item.id} item={item}/>)
                            : <ActivityIndicator color={colors.colorMain} size={'large'}/>
                        }
                    </Animated.View>
                </ScrollView>
                <TouchableOpacity style={[styles.smallBtn, {borderRadius: 42}]}>
                    <MediumText style={styles.textColor}>
                        Прочитать все отзывы
                    </MediumText>
                </TouchableOpacity>
            </Containter>
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    flexBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.orange,
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        flexGrow: 1,
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 16,
        backgroundColor: colors.orange,
        justifyContent: "center",
        alignItems: "center"
    },
    btnOutlined: {
        backgroundColor: colors.white,
        borderStyle: "solid",
        borderColor: colors.orange,
        borderWidth: 1
    },
    smallBtn: {
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: colors.orange
    },
    textColor: {
        color: colors.white
    },
    textColorOutlined: {
        color: colors.orange
    },
    box: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 15,
    },
    rating: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: colors.orange,
        justifyContent: "center",
        alignItems: "center"
    }
})
