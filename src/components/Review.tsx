import {StyleSheet, View} from "react-native";
import * as React from "react";
import {colors} from "../Styles/Styles";
import {Avatar} from "./Avatar";
import {BoldText, MediumText, RegularText} from "./index";
import {Rating} from "./Rating";

export const Review = ({item}: any) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                    <Avatar size={45} url={item.url}/>
                    <BoldText>{item.author}</BoldText>
                </View>
                <Rating rating={item.rating_nbk} isStar/>
            </View>
            <View>
                <MediumText>{item.reviews_nbk}</MediumText>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
                <MediumText style={{color: colors.gray}}>{item.date}</MediumText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: 320,
        borderRadius: 16,
        backgroundColor: colors.white
    }
})
