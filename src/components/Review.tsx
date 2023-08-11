import {StyleSheet, View} from "react-native";
import * as React from "react";
import {colors} from "../Styles/Styles";
import {Avatar} from "./Avatar";
import {BoldText, RegularText} from "./index";
import {Rating} from "./Rating";

export const Review = ({item}: any) => {
    return <View style={styles.container}>
        <View style={{justifyContent: 'space-between'}}>
            <View style={{gap: 15}}>
                <Avatar size={45} url={item.url}/>
                <BoldText>{item.author}</BoldText>
            </View>
            <Rating rating={item.rating_nbk} isStar/>
        </View>
        <View>
            <RegularText>{item.reviews_nbk}</RegularText>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
            <RegularText style={{color: colors.gray}}>{item.date}</RegularText>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        borderRadius: 16,
        backgroundColor: colors.white
    }
})
