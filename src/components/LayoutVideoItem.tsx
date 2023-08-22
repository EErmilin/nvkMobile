import {ImageBackground, StyleSheet, View} from "react-native";
import {BoldText} from "./index";
import {colors} from "../Styles/Styles";
import {Rating} from "./Rating";
import RegularText from "./RegularText";

interface Props {
    item: any
    height: number
    heightImage: number
}

export const LayoutVideoItem = ({item, height, heightImage}: Props) => {

    return (
        <View style={[styles.container, {height: height}]}>
            <ImageBackground source={{uri: item.image}} resizeMode={"cover"} style={[styles.image, {height: heightImage}]}>
                <View style={styles.rating}>
                    <Rating rating={item.rating} isStar={false}/>
                </View>
            </ImageBackground>
            <BoldText fontSize={16}>{item.name}</BoldText>
            {item.price
                ? <RegularText style={{color: colors.orange}}>{item.price}</RegularText>
                : <RegularText style={{color: colors.secondaryGray}}>Бесплатно</RegularText>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 165,
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 1
    },
    image: {
        position: "relative",
        borderRadius: 14
    },
    rating: {
        position: "absolute",
        top: 10,
        left: 10
    },
    text: {
        color: colors.white
    }
});
