import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import {
  BoldText,
  Button,
  MediumText,
  RegularText,
} from '../../../../components';
import {useTheme} from '../../../../Styles/Styles';

interface IProps {
  type: 'Услуга' | 'Заявка на рекламу' | 'Купоны';
  title: string;
  price?: number;
  description?: string;
  onPress: () => void;
  index: number;
}

// Карточка Услуг и реклам
export const ServiceView = (props: IProps) => {
  const {type, title, price, description, onPress, index} = props;
  const {colors} = useTheme();
  return (
    <View
      style={{
        ...styles.main,
        backgroundColor: colors.fillPrimary,
        marginTop: index === 0 ? 20 : 0,
        padding: 15,
        marginHorizontal: 15,
      }}>
      <View
        style={[styles.viewType, {backgroundColor: colors.colorMainInActive}]}>
        <MediumText
          fontSize={12}
          style={{
            color: colors.colorMain,
            marginBottom: Platform.OS === 'android' ? 2 : 0,
          }}>
          {type}
        </MediumText>
      </View>
      <BoldText fontSize={16} style={{fontWeight: '700', marginTop: 10}}>
        {title}
      </BoldText>
      <MediumText
        fontSize={12}
        style={{marginTop: 5, color: colors.colorMain, fontWeight: '600'}}>
        от {price ?? '0'} руб.
      </MediumText>
      {description ? (
        <RegularText fontSize={12} numberOfLines={3} style={{marginTop: 10}}>
          {description ?? ''}
        </RegularText>
      ) : (
        <></>
      )}
      <Button
        style={{height: 40, marginTop: 20, borderRadius: 12}}
        title="Узнать подробнее"
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 15,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 15,
  },
  viewType: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 26,

    alignSelf: 'flex-start',
  },
});
