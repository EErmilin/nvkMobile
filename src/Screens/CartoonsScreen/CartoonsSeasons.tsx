import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import {FC} from 'react';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {colors} from '../../Styles/Styles';
import {Containter, Divider, MediumText} from '../../components';
import {PlayIcon} from '../../components/SVGcomponents/PlayIcon';
import Animated from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getSeasons} from '../../redux/thunks/screens/getSeries/GetSeries';
import {useRoute} from '@react-navigation/native';

export const CartoonsSeasons: FC<RootNavigationProps<'AllSeries'>> = ({
  navigation,
}) => {
  const routes = useRoute();

  const dispatch = useAppDispatch();

  const cartoons = useAppSelector(state => state.screens.cartoons);
  const {id, content} = routes.params;

  console.log(cartoons[0].animationSeasons[0].animationEpisode);

  if (cartoons.length === 0) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Containter>
        {cartoons.length > 0 &&
          cartoons[0].animationSeasons.map(s => {
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
            {cartoons.length > 0 ? (
              cartoons[0].animationSeasons[0].animationEpisode.map(
                (item, index) => (
                  <Animated.View
                    style={{flexDirection: 'row', gap: 15}}
                    key={item.id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Cartoon', {
                          content,
                          url: item.media,
                          title: item.name,
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
                      <MediumText>{`${index + 1}. ${
                        cartoons[0].name
                      }`}</MediumText>
                      <Animated.View style={{flexDirection: 'row', gap: 5}}>
                        <MediumText fontSize={12}>
                          {cartoons[0].date}
                        </MediumText>
                        <MediumText
                          fontSize={12}
                          style={{color: colors.orange}}>
                          /
                        </MediumText>
                        <MediumText fontSize={12}>
                          {`${cartoons[0].duration} мин`}
                        </MediumText>
                      </Animated.View>
                    </Animated.View>
                  </Animated.View>
                ),
              )
            ) : (
              <ActivityIndicator size={'large'} color={colors.orange} />
            )}
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
