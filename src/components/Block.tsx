import * as React from 'react';
import {View, ViewStyle} from 'react-native';
import {useTheme} from '../Styles/Styles';

interface IProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

export const Block = (props: IProps) => {
  const {children, style} = props;
  const {colors} = useTheme();
  return (
    <View
      style={[
        {
          marginHorizontal: 15,
          backgroundColor: colors.fillPrimary,
          borderRadius: 20,
          padding: 20,
          marginBottom: 15,
        },
        style,
      ]}>
      {children}
    </View>
  );
};
