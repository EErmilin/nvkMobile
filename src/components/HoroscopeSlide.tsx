import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../Styles/Styles';
import BoldText from './BoldText';
import RegularText from './RegularText';
import {StyleProp, ViewStyle} from 'react-native';

interface HoroscopeSlideProps {
  logo?: React.ReactNode;
  title: string;
  datePeriodText: string;
  style?: StyleProp<ViewStyle>;
  text?: string;
  loadong: boolean;
  emptyText: string;
}

export const HoroscopeSlide: React.FC<HoroscopeSlideProps> = props => {
  const {logo, title, datePeriodText, style, text, loadong, emptyText} = props;
  const {colors} = useTheme();
  const [seeMore, setSeeMore] = React.useState(false);

  return (
    <View
      style={[
        styles.horoscopeBottom,
        {backgroundColor: colors.fillPrimary},
        style,
      ]}>
      <BoldText fontSize={16} style={{fontWeight: '700'}}>
        {title}
      </BoldText>
      <RegularText
        fontSize={14}
        style={[styles.periodGray, {color: colors.textSecondary}]}>
        {datePeriodText}
      </RegularText>
      {loadong ? (
        <ActivityIndicator size="small" color={colors.colorMain} />
      ) : text ? (
        <RegularText numberOfLines={seeMore ? 0 : 3} style={styles.text}>
          {text}
        </RegularText>
      ) : (
        <RegularText
          style={[
            styles.text,
            {
              color: colors.textSecondary,
            },
          ]}>
          {emptyText}
        </RegularText>
      )}
      {text && !loadong && (
        <TouchableOpacity
          onPress={() => {
            setSeeMore(!seeMore);
          }}>
          <RegularText
            fontSize={12}
            style={[styles.seeMoreText, {color: colors.orange}]}>
            {seeMore ? 'Скрыть' : 'Показать больше'}
          </RegularText>
        </TouchableOpacity>
      )}
      <View style={styles.iconBottom}>{logo}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  horoscopeBottom: {
    marginHorizontal: 15,
    alignSelf: 'stretch',
    minHeight: 112,
    borderRadius: 25,
    marginTop: 40,
    padding: 20,
  },
  iconBottom: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
  periodGray: {
    marginTop: 5,
  },
  showTextOrange: {
    marginTop: 10,
  },
  text: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 22,
    marginTop: 18,
  },
  seeMoreText: {
    fontFamily: 'NotoSans-Bold',
    fontWeight: '600',
    marginTop: 10,
  },
});
