import * as React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {BoldText} from '../../components';
import {useAppSelector} from '../../redux/hooks';
import {useTheme} from '../../Styles/Styles';

export const FavoriteMult = () => {
  const favoriteMults = useAppSelector(state => state.favorite.mults);
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, paddingBottom: 64}}>
      <FlatList
        data={favoriteMults}
        contentContainerStyle={{
          flex: favoriteMults.length > 0 ? 0 : 1,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => <RenderItem item={item} index={index} />}
        numColumns={3}
        ListEmptyComponent={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <BoldText style={{color: colors.gray}}>
              У вас нет избранных мультиков
            </BoldText>
          </View>
        }
      />
    </View>
  );
};

const RenderItem = (props: {item: any; index: number}) => {
  const {index} = props;
  return (
    <TouchableOpacity>
      <BoldText>{index.toString()}</BoldText>
    </TouchableOpacity>
  );
};
