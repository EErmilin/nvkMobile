import * as React from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {EmptyImage} from '../../components/EmptyImage';
import {BoldText} from '../../components';
import {useAppSelector} from '../../redux/hooks';
import {IBroadcast} from '../../models/Broadcast';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
import {useTheme, themeColors} from '../../Styles/Styles';
import {MusicPlayerContext} from '../../contexts/musicContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  navigation: TabNavigationProps<'Favorite'>['navigation'];
}

export const FavoriteBroadcast = (props: IProps) => {
  const {navigation} = props;
  const screenHeight = useWindowDimensions().height;
  const favoriteBroadcasts = useAppSelector(state => state.favorite.favorites)
    .map(favorite => favorite.show)
    .filter(item => item !== null);
  const {colors} = useTheme();

  console.log('favoriteBroadcasts', favoriteBroadcasts);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgSecondary,
      }}>
      <FlatList
        data={favoriteBroadcasts}
        style={{flex: 1}}
        contentContainerStyle={{
          flex: favoriteBroadcasts.length > 0 ? 0 : 1,
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <RenderItem
            key={item?.id.toString()}
            item={item}
            index={index}
            navigation={navigation}
            length={favoriteBroadcasts.length}
          />
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              height: screenHeight - 150,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <BoldText style={{color: colors.textSecondary}}>
              У вас нет избранных передач
            </BoldText>
          </View>
        }
      />
    </View>
  );
};

const RenderItem = (props: {
  item: IBroadcast | null;
  index: number;
  navigation: TabNavigationProps<'Favorite'>['navigation'];
  length: number;
}) => {
  const {item, index, navigation, length} = props;
  const screenWidth = useWindowDimensions().width;
  const musicContext = React.useContext(MusicPlayerContext);
  const insets = useSafeAreaInsets();

  const getPaddingBottom = () => {
    return musicContext.musicPlayerOption.music !== null
      ? 70 + 55 + insets.bottom
      : 70 + insets.bottom;
  };

  return (
    <TouchableOpacity
      key={item?.id.toString()}
      onPress={() => {
        item && navigation.navigate('BroadcastView', {broadcast: item});
      }}
      style={{
        width: (screenWidth - 45) / 2,
        marginLeft: index % 2 === 0 ? 15 : 0,
        marginRight: index % 2 === 0 ? 15 : 0,
        marginBottom: index === length - 1 ? getPaddingBottom() : 15,
        marginTop: index === 0 || index === 1 ? 20 : 0,
      }}>
      {item?.image?.url_1536 ? (
        <Image
          style={{
            width: (screenWidth - 45) / 2,
            height: 110,
            backgroundColor: themeColors.dark.skeletonBg,
            borderRadius: 15,
          }}
          source={
            item?.image?.url_1536
              ? {uri: item?.image?.url_1536}
              : require('../../assets/images/emptyPost.png')
          }
        />
      ) : (
        <EmptyImage
          styleContainer={{
            width: (screenWidth - 45) / 2,
            height: 110,
            borderRadius: 15,
          }}
          widthGalereya={(screenWidth - 45) / 4}
          heightGalereya={(screenWidth - 45) / 4}
        />
      )}

      <BoldText style={{fontWeight: '600', marginTop: 10}} numberOfLines={2}>
        {item?.name}
      </BoldText>
    </TouchableOpacity>
  );
};
