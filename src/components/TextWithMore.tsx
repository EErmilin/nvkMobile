import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface TextWithMoreProps {
    text: string;
    maxLines?: number;
}

const TextWithMore: React.FC<TextWithMoreProps> = ({ text, maxLines = 3 }) => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    const slicedText = text.slice(0, 110);


    return (
        <View style={styles.container}>
            <Text
                numberOfLines={showFullText ? undefined : maxLines}
                style={styles.text}
            >
                {slicedText.length === text.length || showFullText ? text : slicedText}
                {!showFullText && slicedText.length !== text.length && (
                    <Text style={styles.moreText} onPress={toggleShowFullText}>
                        {" ещё..."}
                    </Text>
                )}
            </Text>

        </View>
    );
};

export default TextWithMore;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    text: {
        fontSize: 16,
        lineHeight: 20,
    },
    moreText: {
        color: 'orange',
        marginLeft: 5
    },
});
