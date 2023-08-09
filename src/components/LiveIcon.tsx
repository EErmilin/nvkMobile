import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '../Styles/Styles';
import MediumText from './MediumText';

export const LiveIcon = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.viewLive}>
      <View style={[styles.livePoint, {backgroundColor: colors.red}]} />
      <MediumText style={{color: colors.white}}>LIVE</MediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  livePoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  viewLive: {
    position: 'absolute',
    left: 20,
    bottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 27,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
