import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as React from 'react';
import {FC} from 'react';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {colors, useTheme} from '../../Styles/Styles';
import {Containter, Divider, MediumText} from '../../components';
import {PlayIcon} from '../../components/SVGcomponents/PlayIcon';
import Animated from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getSeasons} from '../../redux/thunks/screens/getSeries/GetSeries';
import {useRoute} from '@react-navigation/native';

//mock data
// const data = [
//   {
//     id: 1,
//     image: '',
//     title: '1series',
//     date: '12.12.23',
//     time: '30 min',
//     rating: 5.6,
//   },
//   {
//     id: 2,
//     image: '',
//     title: '2series',
//     date: '11.01.22',
//     time: '50 min',
//     rating: 7.4,
//   },
// ];

export const AllSeriesScreen: FC<RootNavigationProps<'AllSeries'>> = ({
  navigation,
}) => {
  const routes = useRoute();
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const seasons = useAppSelector(state => state.screens.seasons);
  const {id, content} = routes.params;

  const update = React.useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(getSeasons({where: {seriesId: id}}));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [id, dispatch]);

  React.useEffect(() => {
    update();
  }, [update]);

  // if (seasons.length === 0) {
  //   return <ActivityIndicator />;
  // }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.bgSecondary}]}>
      <Containter>
        {seasons.length === 0 &&
          (isLoading ? (
            <ActivityIndicator size={'large'} color={colors.orange} />
          ) : (
            <MediumText style={{textAlign: 'center'}}>Не найдено</MediumText>
          ))}

        {seasons.map((s, index) => (
          <>
            <MediumText
              fontSize={16}
              style={{
                color: colors.orange,
                fontWeight: '600',
                marginTop: index > 0 ? 24 : 0,
              }}>
              {s.name}
            </MediumText>

            <Divider style={{marginVertical: 10}} />
            <Animated.View />
            <ScrollView>
              {s.seriesEpisodes.map(item => {
                console.log(item.media);
                return (
                  <Animated.View
                    style={{
                      flexDirection: 'row',
                      gap: 15,
                    }}
                    key={item.id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CurrentSeries', {
                          id: item.series?.id,
                          title: s.series.name,
                          serialData: s,
                          url: item.media?.indexM3u8Url,
                          content,
                        })
                      }>
                      <View
                        style={{
                          borderRadius: 16,
                          overflow: 'hidden',
                        }}>
                        <ImageBackground
                          source={{uri: item.media?.covers?.[0]?.url_512}}
                          resizeMode={'cover'}
                          style={styles.image}>
                          <PlayIcon />
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                    <Animated.View
                      style={{
                        flexDirection: 'column',
                      }}>
                      <MediumText>{item.name}</MediumText>
                      <Animated.View style={{flexDirection: 'row', gap: 5}}>
                        <MediumText fontSize={12}>{s.series.date}</MediumText>
                        <MediumText
                          fontSize={12}
                          style={{color: colors.orange}}>
                          /
                        </MediumText>
                        <MediumText fontSize={12}>{item.duration}</MediumText>
                      </Animated.View>
                    </Animated.View>
                  </Animated.View>
                );
              })}
            </ScrollView>
          </>
        ))}
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
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.white,
  },
});
