import {StyleSheet, Text, View} from "react-native";
import {colors} from "../Styles/Styles";
import {StarIcon} from "./SVGcomponents/StarIcon";
import {LockIcon} from "./SVGcomponents/LockIcon";

interface Props {
    rating: number |string
    isStar?: boolean
    lock?: boolean
}

export const Rating = ({rating, isStar, lock}: Props) => {
    return <View style={styles.container}>
        {lock && <LockIcon color={colors.white}/>}
        {isStar && <StarIcon/>}
        <Text style={styles.text}>{rating}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 26,
        gap: 5,
        backgroundColor: colors.orange,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: colors.white
    }
});
