import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {useTheme} from '../Styles/Styles';

interface TextProps {
  fontSize?: number;
  m?: number | string;
  mt?: number | string;
  mb?: number | string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  children?: string | string[];
}

const BoldText: React.FC<TextProps> = ({
  children,
  fontSize = 14,
  style,
  mt,
  mb,
  m,
  ...rest
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'NotoSans-Bold',
      color: colors.textPrimary,
      fontSize: fontSize,
      margin: m,
      marginTop: mt,
      marginBottom: mb,
    },
  });
  return (
    <Text {...rest} allowFontScaling={false} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

export default BoldText;
