import {ActivityIndicator, ImageBackground, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";
import {FC} from "react";
import {RootNavigationProps} from "../../navigation/types/RootStackTypes";
import {colors} from "../../Styles/Styles";
import {Containter, MediumText} from "../../components";
import {PlayIcon} from "../../components/SVGcomponents/PlayIcon";
import Animated from "react-native-reanimated";

//mock data
const data = [
    {id: 1, image: '', title: '1series', date: '12.12.23', time: '30 min', rating: 5.6},
    {id: 2, image: '', title: '2series', date: '11.01.22', time: '50 min', rating: 7.4},
]

export const AllSeriesScreen: FC<RootNavigationProps<'AllSeries'>> = ({navigation}) => {

    return <SafeAreaView style={styles.container}>
        <Containter>
            <Animated.View>

            </Animated.View>
            <ScrollView>
                <Animated.View style={{gap: 20}}>
                    {data.length
                        ? data.map((item, index) => <Animated.View style={{flexDirection: 'row', gap: 15}}
                                                                   key={item.id}>
                            <TouchableOpacity onPress={() => navigation.navigate('CurrentSeries', {
                                id: item.id,
                                title: item.title,
                                rating: item.rating
                            })}>
                                <ImageBackground source={{uri: item.image}} resizeMode={"cover"} style={styles.image}>
                                    <PlayIcon/>
                                </ImageBackground>
                            </TouchableOpacity>
                            <Animated.View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                                <MediumText>{`${index + 1}. ${item.title}`}</MediumText>
                                <Animated.View style={{flexDirection: 'row', gap: 5}}>
                                    <MediumText fontSize={12}>{item.date}</MediumText>
                                    <MediumText fontSize={12} style={{color: colors.orange}}>/</MediumText>
                                    <MediumText fontSize={12}>{item.title}</MediumText>
                                </Animated.View>
                            </Animated.View>
                        </Animated.View>)
                        : <ActivityIndicator size={'large'} color={colors.orange}/>
                    }
                </Animated.View>
            </ScrollView>
        </Containter>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    image: {
        width: 150,
        height: 90,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'red'
    }
})
