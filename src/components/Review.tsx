import {StyleSheet, View} from 'react-native';
import * as React from 'react';
import {colors, useTheme} from '../Styles/Styles';
import {Avatar} from './Avatar';
import {BoldText, MediumText, RegularText} from './index';
import {Rating} from './Rating';
  
export const Review = ({item, cardWidth, numberOfLines}: any) => {
const{colors} = useTheme()
  return (
    <View style={[styles.container, cardWidth && {width: null}, {backgroundColor: colors.bgPrimary}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <Avatar size={45} url={item.user?.avatar?.url_256} />
          <BoldText>{item.user?.firstname ?? 'Пользователь'}</BoldText>
        </View>
        <Rating rating={item.vote} isStar />
      </View>
      <View>
        <MediumText numberOfLines={numberOfLines}>{item.comment}</MediumText>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <MediumText style={{color: colors.gray}}>{item.date}</MediumText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: 320,
    borderRadius: 16,
    backgroundColor: colors.white,
  },
});
