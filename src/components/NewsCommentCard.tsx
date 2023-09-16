import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MediumText from './MediumText';
import {colors} from '../Styles/Styles';

const CommentsNews = prop => {
  const {commentItem} = prop;

  return (
    <View style={styles.commentCard}>
      <View style={styles.commentAuthor}>
        <Image source={{uri: commentItem?.image}} style={styles.image} />
        <MediumText>{commentItem?.name}</MediumText>
      </View>
      <MediumText>{commentItem?.comment}</MediumText>
      <MediumText style={{color: colors.gray}}>
        {commentItem?.createdAt}
      </MediumText>
    </View>
  );
};

export default CommentsNews;

const styles = StyleSheet.create({
  commentCard: {},
  commentAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 30,
    marginRight: 10,
  },
});
