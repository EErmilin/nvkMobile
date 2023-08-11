import {StyleSheet, Text, View} from "react-native";
import {colors} from "../Styles/Styles";
import {StarIcon} from "./SVGcomponents/StarIcon";

interface Props {
    rating: number
    isStar: boolean
}

export const Rating = ({rating, isStar}: Props) => {
    return <View style={styles.container}>
        {isStar && <StarIcon/>}
        <Text style={styles.text}>{rating}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 26,
        gap: 5,
        backgroundColor: colors.orange
    },
    text: {
        color: colors.white
    }
});
