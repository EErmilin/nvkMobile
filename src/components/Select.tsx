import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  KeyboardType,
  ColorValue,
  TextInput,
} from 'react-native';
import {useTheme} from '../Styles/Styles';
import Text from './MediumText';

export const PHONE_MASK = '+7 ([000]) [000]-[00]-[00]';

interface BlueButtonProps {
  style?: ViewStyle | ViewStyle[];
  text?: string;
  ref?: React.Ref<TextInput>;
  onFocus?: () => void;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  keyboardType?: KeyboardType;
  styleText?: TextStyle;
  onBlur?: () => void;
  onPress: () => void;
  logo?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  logoLeft?: React.ReactNode;
}

export const Select: React.FC<BlueButtonProps> = props => {
  const {style, text, styleText = {}, onPress, logo, logoLeft} = props;
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        stylesSelectButton.main,
        {
          backgroundColor: colors.bgSecondary,
        },
        style,
      ]}>
      <View style={{flexDirection: 'row'}}>
        {logoLeft ? (
          <View style={{width: 20, height: 20, marginRight: 10}}>
            {logoLeft}
          </View>
        ) : (
          <></>
        )}
        <Text fontSize={14} style={{...styleText, color: colors.textSecondary}}>
          {text}
        </Text>
      </View>

      {logo}
    </TouchableOpacity>
  );
};

const stylesSelectButton = StyleSheet.create({
  main: {
    borderRadius: 15,
    height: 60,
    padding: 18,
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: 20,
  },
});
