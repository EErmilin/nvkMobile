import {Text, StyleSheet, View} from "react-native";
import {BoldText} from "./index";
import {colors} from "../Styles/Styles";

export const FilmItem = ({item}: any) => {

    return <View>
        <View style={styles.raiting}>
            <Text style={styles.text}>{item.raiting}</Text>
        </View>
        <BoldText>{item.name}</BoldText>
        <View>{item.price}</View>
    </View>
}

const styles = StyleSheet.create({
    raiting: {
        padding: 5,
        backgroundColor: colors.orange
    },
    text: {
        color: colors.white
    }
});
