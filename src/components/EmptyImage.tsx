import * as React from 'react';
import {
  StyleProp,
  ViewStyle,
  ColorValue,
  useWindowDimensions,
} from 'react-native';
import {View} from 'react-native';
import {useTheme} from '../Styles/Styles';
import {Galereya} from './SVGcomponents/Galereya';

interface IEmtyImage {
  styleContainer?: StyleProp<ViewStyle>;
  colorGalereya?: ColorValue;
  widthGalereya?: number;
  heightGalereya?: number;
}

export const EmptyImage = ({
  styleContainer,
  colorGalereya,
  widthGalereya,
  heightGalereya,
}: IEmtyImage) => {
  const {theme} = useTheme();
  const screenWidth = useWindowDimensions().width;
  return (
    <View
      style={[
        {
          backgroundColor: theme === 'light' ? '#EAEEF9' : '#454545',
          height: screenWidth,
          width: screenWidth,
          alignItems: 'center',
          justifyContent: 'center',
        },
        styleContainer,
      ]}>
      <Galereya
        width={widthGalereya}
        height={heightGalereya}
        color={colorGalereya}
      />
    </View>
  );
};
