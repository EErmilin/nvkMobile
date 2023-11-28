import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MediumText from './MediumText';
import {colors} from '../Styles/Styles';
import {IPostComment} from '../models/Post';
import dayjs from 'dayjs';
import {EmptyAvatar} from './SVGcomponents';

const CommentsNews = (prop: {commentItem: IPostComment}) => {
  const {commentItem} = prop;
  const avatar = commentItem.user?.avatar?.url_128;
  const name = [commentItem.user?.firstname, commentItem.user?.lastname]
    .filter(v => !!v)
    .join(' ');

  return (
    <View style={styles.commentCard}>
      <View style={styles.commentAuthor}>
        {avatar ? (
          <Image
            source={{uri: avatar}}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <EmptyAvatar size={45} fillColor={'#F2F2F2'} />
        )}
        <MediumText style={{marginLeft: 10}}>{name}</MediumText>
      </View>
      <MediumText style={{marginTop: 10}}>{commentItem.content}</MediumText>
      <MediumText style={{color: colors.gray}}>
        {dayjs(commentItem.createdAt).format('DD.MM.YYYY')}
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
  },
});
