import * as React from 'react';
import {View} from 'react-native';

import {useTheme} from '../../Styles/Styles';
import {FavoriteTabNavigator} from '../FavoriteScreens/FavoriteTabNavigator';

export const FavoriteScreen = () => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: colors.bgSecondary}}>
      <FavoriteTabNavigator />
    </View>
  );
};
