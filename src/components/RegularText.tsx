import React from 'react';
import {StyleSheet, Text, TextStyle, StyleProp} from 'react-native';
import {useTheme} from '../Styles/Styles';

interface TextProps {
  fontSize?: number;
  m?: number | string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  children: any;
  onPress?: () => void;
}

const RegularText: React.FC<TextProps> = ({
  children,
  fontSize = 14,
  style,
  m,
  ...rest
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'NotoSans-Regular',
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

export default RegularText;
