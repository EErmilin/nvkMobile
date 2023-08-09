import * as React from 'react';
import {View, ViewStyle} from 'react-native';
import {useTheme} from '../Styles/Styles';

interface IProps {
  color?: string;
  mt?: number;
  mb?: number;
  mv?: number;
  style?: ViewStyle;
  mh?: number;
}

export const Separator = (props: IProps) => {
  const {colors} = useTheme();
  const {
    color = colors.borderPrimary,
    mt = 0,
    mb = 0,
    mv = 0,
    mh = 0,
    style,
  } = props;
  return (
    <View
      style={[
        {
          height: 1,
          width: '100%',
          backgroundColor: color,
          marginVertical: mv,
          marginTop: mt,
          marginBottom: mb,
          marginHorizontal: mh,
        },
        style,
      ]}
    />
  );
};
