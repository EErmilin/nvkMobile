import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from '../Styles/Styles';

interface TextProps {
  fontSize: number;
  m?: number | string;
  style?: object;
  numberOfLines?: number;
  children: any;
}

const TitleText: React.FC<TextProps> = ({children, fontSize, style, m}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'NotoSans-Bold',
      color: colors.textPrimary,
      fontWeight: '800',
      fontSize: fontSize,
      margin: m,
    },
  });
  return (
    <Text allowFontScaling={false} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

export default TitleText;
