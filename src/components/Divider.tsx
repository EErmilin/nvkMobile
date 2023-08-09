import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useTheme} from '../Styles/Styles';

interface DividerProps {
  height?: number;
  style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({height = 1, style}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: colors.borderPrimary,
          height: height,
        },
        style,
      ]}
    />
  );
};
