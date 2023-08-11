import {Text, StyleSheet, View, ImageBackground} from "react-native";
import {BoldText} from "./index";
import {colors} from "../Styles/Styles";
import {Rating} from "./Rating";

export const FilmItem = ({item}: any) => {

    return <View style={styles.container}>
        <ImageBackground source={{uri: item.image}} resizeMode={"cover"} style={styles.image}>
            <View style={styles.rating}>
                <Rating rating={item.rating} isStar={false}/>
            </View>
        </ImageBackground>
        <BoldText>{item.name}</BoldText>
        <View>{item.price}</View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: '40%',
        width: 280
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
