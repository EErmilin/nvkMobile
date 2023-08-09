import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useTheme} from '../../../Styles/Styles';
import {MusicTrackView} from './MusicTrackView';
import {RenderCustomBar} from './RenderCustomBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MusicPlayerContext} from '../../../contexts/musicContext';

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const musicContext = React.useContext(MusicPlayerContext);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
      }}>
      <MusicTrackView />
      <View
        style={[
          styles.tabView,
          {
            height: 70 + insets.bottom,
            marginBottom: Platform.OS === 'android' ? insets.bottom : 0,
            backgroundColor: colors.fillPrimary,
            borderTopLeftRadius:
              musicContext.musicPlayerOption.music !== null ? 0 : 24,
            borderTopRightRadius:
              musicContext.musicPlayerOption.music !== null ? 0 : 24,
          },
        ]}>
        {state.routes.map((route, index) => (
          <RenderCustomBar
            key={index.toString()}
            index={index}
            route={route}
            descriptors={descriptors}
            navigation={navigation}
            state={state}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
});
