import React from 'react';
import {TouchableOpacity, Image, StyleProp} from 'react-native';
import {ViewStyle, TextStyle} from 'react-native';
import BoldText from './BoldText';
import {IAlbum} from '../models/Music';
import MediumText from './MediumText';
import {useTheme} from '../Styles/Styles';

interface AlbumItemProps {
  item: IAlbum;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: StyleProp<TextStyle>;
  type?: 'album' | 'artist';
}

export const AlbumItem: React.FC<AlbumItemProps> = ({
  item,
  onPress,
  style,
  textStyle,
  type = 'album',
}) => {
  const width = type === 'album' ? 140 : 80;
  const borderRadius = type === 'album' ? 20 : 40;
  const {theme, colors} = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={[{width: width}, style]}>
      <Image
        style={{
          height: width,
          width: width,
          borderRadius: borderRadius,
          backgroundColor:
            theme === 'light' ? colors.borderPrimary : colors.bgPrimary,
        }}
        source={{
          uri: item.cover?.url_512 ?? undefined,
        }}
      />
      {type === 'album' ? (
        <BoldText numberOfLines={2} style={[{marginTop: 5}, textStyle]}>
          {item.name}
        </BoldText>
      ) : (
        <MediumText
          fontSize={12}
          numberOfLines={2}
          style={[{marginTop: 5, textAlign: 'center'}, textStyle]}>
          {item.name}
        </MediumText>
      )}
    </TouchableOpacity>
  );
};
