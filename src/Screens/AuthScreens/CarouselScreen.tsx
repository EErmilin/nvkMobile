import * as React from 'react';
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import remoteConfig from '@react-native-firebase/remote-config';

import {BoldText, TitleText, RegularText} from '../../components';
import {CarouselPagination} from '../../components/CarouselPagination';
import {LoginNavigationProps} from '../../navigation/types/LoginTypes';
import {useAppDispatch} from '../../redux/hooks';
import {setCarousel} from '../../redux/slices/authSlice';
import {useTheme} from '../../Styles/Styles';

const styles = StyleSheet.create({
  image: {
    height: 375,
    width: '100%',
  },
  content: {
    flex: 1,
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: 12,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    marginTop: 10,
  },
});
export const CarouselScreen: React.FC<
  LoginNavigationProps<'CarouselScreen'>
> = ({navigation}) => {
  const {colors, theme, Style} = useTheme();
  const screenWidth = useWindowDimensions().width;
  const [currentX, setCurrentX] = React.useState(0);
  const data = [
    {
      titleText: remoteConfig().getValue('onBoarding_title_1').asString(),
      regularText: remoteConfig().getValue('onBoarding_text_1').asString(),
      image:
        theme === 'dark'
          ? require('../../assets/images/Welcome1_dark.png')
          : require('../../assets/images/Welcome1.png'),
    },
    {
      titleText: remoteConfig().getValue('onBoarding_title_2').asString(),
      regularText: remoteConfig().getValue('onBoarding_text_2').asString(),
      image:
        theme === 'dark'
          ? require('../../assets/images/Welcome2_dark.png')
          : require('../../assets/images/Welcome2.png'),
    },
    {
      titleText: remoteConfig().getValue('onBoarding_title_3').asString(),
      regularText: remoteConfig().getValue('onBoarding_text_3').asString(),
      image:
        theme === 'dark'
          ? require('../../assets/images/Welcome3_dark.png')
          : require('../../assets/images/Welcome3.png'),
    },
  ];
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView
      style={[Style.container, {backgroundColor: colors.fillPrimary}]}>
      <View style={styles.content}>
        <Carousel
          loop
          width={screenWidth}
          style={{flex: 1}}
          autoPlay
          data={data}
          autoPlayInterval={remoteConfig()
            .getValue('onBoard_carousel_interval')
            .asNumber()}
          scrollAnimationDuration={remoteConfig()
            .getValue('onBoard_duration')
            .asNumber()}
          onSnapToItem={index => setCurrentX(index)}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
              }}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={item.image}
              />
              <View style={{marginHorizontal: 15}}>
                <TitleText fontSize={24} style={{color: colors.textPrimary}}>
                  {item.titleText}
                </TitleText>
                <RegularText
                  fontSize={14}
                  style={{color: colors.textSecondary, marginTop: 15}}>
                  {item.regularText}
                </RegularText>
              </View>
            </View>
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 18,
          }}>
          <CarouselPagination
            style={{marginLeft: 15}}
            length={3}
            currentX={currentX}
          />
          <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.colorMain}]}
            onPress={() => {
              dispatch(setCarousel(false));
              navigation.navigate('PhoneInputScr');
            }}>
            <BoldText
              style={{
                fontWeight: '600',
                color: theme === 'dark' ? colors.black : colors.white,
              }}
              fontSize={14}>
              Войти
            </BoldText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
