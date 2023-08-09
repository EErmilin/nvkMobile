import * as React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import {useTheme} from '../Styles/Styles';
import {EmptyAvatar} from './SVGcomponents/EmptyAvatar';
import {EditPhoto} from './SVGcomponents/EditPhoto';

interface IProps {
  size: number;
  url: string | null;
  editable?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Avatar = (props: IProps) => {
  const {size, url, style, editable, onPress} = props;
  const {colors, theme} = useTheme();
  return (
    <TouchableOpacity
      disabled={editable === undefined ? true : false}
      style={[
        styles.main,
        {
          backgroundColor: colors.fillPrimary,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      activeOpacity={0.2}
      onPress={onPress}>
      {url ? (
        <Image
          style={[
            styles.image,
            {width: size, height: size, borderRadius: size / 2},
          ]}
          blurRadius={editable ? 1 : 0}
          source={{uri: url}}
        />
      ) : (
        <EmptyAvatar
          size={size}
          fillColor={theme === 'dark' ? 'rgb(39, 39, 39)' : '#F2F2F2'}
        />
      )}
      {editable && (
        <View
          style={{
            width: 80,
            height: 80,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 100,
          }}>
          <EditPhoto />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {},
  viewEmpty: {},
});
