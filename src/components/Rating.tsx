import {StyleSheet, Text, View} from "react-native";
import {colors} from "../Styles/Styles";
import {StarIcon} from "./SVGcomponents/StarIcon";
import {LockIcon} from "./SVGcomponents/LockIcon";
import {LockCloseIcon} from "./SVGcomponents/LockCloseIcon";

interface Props {
    rating: number | string
    isStar?: boolean
    lock?: boolean
    disabled?: boolean
}

export const Rating = ({rating, isStar, lock, disabled}: Props) => {
    const disabledStyle = disabled && styles.disabled

    return <View style={[styles.container, disabledStyle]}>
        {lock && disabled
            ? <LockCloseIcon color={colors.black}/>
            : lock
                ? <LockIcon color={colors.white}/>
                : null
        }
        {isStar && <StarIcon/>}
        <Text style={[styles.text, disabledStyle]}>{rating}</Text>
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
    },
    disabled: {
        color: colors.black,
        backgroundColor: colors.background
    }
});
