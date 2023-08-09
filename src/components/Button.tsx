import React from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextStyle,
  ViewStyle,
  Platform,
} from 'react-native';
import {useTheme} from '../Styles/Styles';
import BoldText from './BoldText';

interface ButtonProps {
  title?: string;
  style?: ViewStyle | ViewStyle[];
  value?: any;
  onPress?: any;
  disabled?: boolean;
  icon?: any;
  textStyle?: TextStyle;
  loading?: boolean;
  loadingColor?: string;
  loadingSize?: 'small' | 'large';
  ref?: React.RefObject<TouchableOpacity>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  style,
  onPress,
  disabled = false,
  icon,
  textStyle = {},
  loading,
  loadingColor,
  loadingSize,
  ref,
}) => {
  const {colors, theme, Style} = useTheme();
  return (
    <TouchableOpacity
      ref={ref}
      style={[disabled === true ? Style.disabledButton : Style.button, style]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color={loadingColor} size={loadingSize} />
      ) : icon ? (
        <>
          <BoldText
            fontSize={14}
            style={[
              {
                paddingBottom: Platform.OS === 'android' ? 3 : 0,
                marginRight: 10,
                color: disabled
                  ? colors.textSecondary
                  : theme === 'dark'
                  ? colors.black
                  : colors.white,
              },
              textStyle,
            ]}>
            {title}
          </BoldText>
          <View>{icon}</View>
        </>
      ) : (
        <BoldText
          fontSize={14}
          style={[
            {
              color: disabled
                ? colors.textSecondary
                : theme === 'dark'
                ? colors.black
                : colors.white,
            },
            textStyle,
          ]}>
          {title}
        </BoldText>
      )}
    </TouchableOpacity>
  );
};
