import * as React from 'react';
import {TextStyle} from 'react-native';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {useTheme} from '../Styles/Styles';
import MediumText from './MediumText';
import {ArrowRight} from './SVGcomponents/ArrowRight';

interface IProps {
  label?: string;
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  textStyle?: TextStyle;
}

export const NavLink = (props: IProps) => {
  const {
    label,
    text,
    onPress,
    style = {},
    labelStyle = {},
    textStyle = {},
  } = props;
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        style,
      ]}
      onPress={onPress}>
      <View>
        {label ? (
          <MediumText fontSize={12} style={[{color: colors.gray}, labelStyle]}>
            {label}
          </MediumText>
        ) : (
          <></>
        )}

        <MediumText fontSize={14} style={[{marginTop: 5}, textStyle]}>
          {text}
        </MediumText>
      </View>
      <ArrowRight />
    </TouchableOpacity>
  );
};
