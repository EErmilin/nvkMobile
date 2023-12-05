import {ImageBackground, StyleSheet, View} from 'react-native';
import {BoldText} from './index';
import {colors} from '../Styles/Styles';
import {Rating} from './Rating';
import RegularText from './RegularText';
import React from 'react';
import {Text} from 'react-native';

interface Props {
  item: any;
  height: number;
  heightImage: number;
}

export const LayoutVideoItem = ({item, height, heightImage}: Props) => {
  return (
    <>
      <View style={[styles.container, {height: height}]}>
        <ImageBackground
          source={{
            uri: (item?.cover?.url ?? item?.image?.url) || '',
          }}
          resizeMode={'cover'}
          style={[styles.image, {height: '100%'}]}>
          <View style={styles.rating}>
            <Rating rating={item.ratingNvk?.toFixed(1) ?? '-'} isStar={false} />
          </View>
        </ImageBackground>
      </View>
      <BoldText fontSize={16}>{item.name}</BoldText>
      {item.price ? (
        <RegularText style={{color: colors.orange}}>{item?.price}</RegularText>
      ) : (
        <RegularText style={{color: colors.secondaryGray}}>
          Бесплатно
        </RegularText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 162,
    backgroundColor: colors.borderGray,
    borderRadius: 12,
  },
  image: {
    position: 'relative',
    borderRadius: 14,
  },
  rating: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  text: {
    color: colors.white,
  },
});
