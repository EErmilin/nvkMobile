import {useRoute} from '@react-navigation/native';
import * as React from 'react';
import {FC} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {colors, useTheme} from '../../Styles/Styles';
import {Containter, Divider, MediumText} from '../../components';
import {PlayIcon} from '../../components/SVGcomponents/PlayIcon';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {useAppDispatch} from '../../redux/hooks';

export const CartoonsSeasons: FC<RootNavigationProps<'AllSeries'>> = ({
  navigation,
}) => {
  const routes = useRoute();
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const {cartoon} = routes.params;

  // if (cartoons.length === 0) {
  //   return <ActivityIndicator />;
  // }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.bgSecondary}]}>
      <Containter>
        {cartoon.animationSeasons.map(s => {
          return (
            <MediumText
              fontSize={16}
              style={{color: colors.orange, fontWeight: '600'}}>
              {`${s.number} сезон`}
            </MediumText>
          );
        })}
        <Divider style={{marginVertical: 10}} />
        <Animated.View />
        <ScrollView>
          <Animated.View style={{gap: 20}}>
            {cartoon.animationSeasons[0].animationEpisode.map((item, index) => (
              <Animated.View
                style={{flexDirection: 'row', gap: 15}}
                key={item.id}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Cartoon', {
                      cartoon,
                      season: cartoon.animationSeasons[0],
                      episode: item,
                      title: cartoon.name,
                    })
                  }>
                  <ImageBackground
                    source={{uri: item.image}}
                    resizeMode={'cover'}
                    style={styles.image}>
                    <PlayIcon />
                  </ImageBackground>
                </TouchableOpacity>
                <Animated.View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <MediumText>{`${index + 1}. ${cartoon.name}`}</MediumText>
                  <Animated.View style={{flexDirection: 'row', gap: 5}}>
                    <MediumText fontSize={12}>{cartoon.date}</MediumText>
                    <MediumText fontSize={12} style={{color: colors.orange}}>
                      /
                    </MediumText>
                    <MediumText fontSize={12}>
                      {`${cartoon.duration} мин`}
                    </MediumText>
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            ))}
            {/* <ActivityIndicator size={'large'} color={colors.orange} /> */}
          </Animated.View>
        </ScrollView>
      </Containter>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    width: 150,
    height: 90,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.white,
  },
});
