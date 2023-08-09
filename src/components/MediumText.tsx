import React from 'react';
import {StyleSheet, Text, StyleProp, TextStyle} from 'react-native';
import {useTheme} from '../Styles/Styles';

interface TextProps {
  fontSize?: number;
  m?: number | string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  children: any;
}

const MediumText: React.FC<TextProps> = ({
  children,
  fontSize = 14,
  style,
  m,
  ...rest
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'NotoSans-Medium',
      color: colors.textPrimary,
      fontSize: fontSize,
      margin: m,
    },
  });
  return (
    <Text {...rest} allowFontScaling={false} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

export default MediumText;
