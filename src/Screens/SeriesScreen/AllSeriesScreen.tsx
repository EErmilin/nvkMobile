import {ActivityIndicator, ImageBackground, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";
import {FC} from "react";
import {RootNavigationProps} from "../../navigation/types/RootStackTypes";
import {colors} from "../../Styles/Styles";
import {View} from "react-native-reanimated/lib/typescript/Animated";
import {Containter, RegularText} from "../../components";
import {PlayIcon} from "../../components/SVGcomponents/PlayIcon";

//mock data
const data = [
    {id: 1, image: '', title: '1series', date: '12.12.23', time: '30 min', rating: 5.6},
    {id: 2, image: '', title: '2series', date: '11.01.22', time: '50 min', rating: 7.4},
]

export const AllSeriesScreen: FC<RootNavigationProps<'AllSeries'>> = ({navigation}) => {

    return <SafeAreaView style={styles.container}>
        <Containter>
            <View>

            </View>
            <ScrollView>
                {data.length
                    ? data.map((item, index) => <View key={item.id}>
                        <TouchableOpacity onPress={() => navigation.navigate('CurrentSeries', {
                            id: item.id,
                            title: item.title,
                            rating: item.rating
                        })}>
                            <ImageBackground source={{uri: item.image}} resizeMode={"cover"} style={styles.image}>
                                <PlayIcon/>
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'column'}}>
                            <View>
                                <RegularText>{`${index + 1}. ${item.title}`}</RegularText>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <RegularText fontSize={12}>{item.date}</RegularText>
                                <RegularText fontSize={12} style={{color: colors.orange}}>/</RegularText>
                                <RegularText fontSize={12}>{item.title}</RegularText>
                            </View>
                        </View>
                    </View>)
                    : <ActivityIndicator size={'large'} color={colors.orange}/>
                }
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
        alignItems: 'center'
    }
})
