import * as React from 'react';
import {
  useWindowDimensions,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';

import {
  BoldText,
  MediumText,
  RegularText,
  Avatar,
  Separator,
  Block,
} from '../../components';
import { ArrowRight } from '../../components/SVGcomponents';
import { TabNavigationProps } from '../../navigation/types/TabTypes';
import { useAppSelector } from '../../redux/hooks';
import { useTheme } from '../../Styles/Styles';

export const AuthProfile: React.FC<{
  hashtagPress?: any;
  profilePress?: any;
  createBloderPress?: any;
  passwordPress?: any;
  techPress?: any;
  settingPress?: any;
  showBloderPress?: any;
  navigation: TabNavigationProps<'Profile'>['navigation'];
  loading: boolean;
}> = ({ hashtagPress, profilePress, createBloderPress, showBloderPress, navigation, loading }) => {
  const layout = useWindowDimensions();
  const screenWidth = Dimensions.get('screen').width;
  const user = useAppSelector(state => state.user.data);
  const subscribers = useAppSelector(state => state.user.subscribers);
  const subscribes = useAppSelector(state => state.user.subscribes);
  const { colors, Style } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.fillPrimary }}>
      <SafeAreaView />
      <SafeAreaView style={[Style.container]}>
        <View
          style={{
            flex: 1,
            paddingBottom: 129,
            backgroundColor: colors.bgSecondary,
          }}>
          <View
            style={{
              width: layout.width,
              height: 120,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: colors.fillPrimary,
              paddingHorizontal: 15,
            }}>
            <View>
              {!loading || user ? (
                <BoldText
                  numberOfLines={1}
                  fontSize={16}
                  style={{ fontWeight: '700', width: screenWidth - 130 }}>
                  {user?.firstname ?? ''}
                </BoldText>
              ) : (
                <ContentLoader
                  width={(screenWidth - 125).toString()}
                  height={'24'}
                  backgroundColor={colors.skeletonBg}
                  foregroundColor={colors.skeletonFg}>
                  <Rect
                    width={(screenWidth - 125).toString()}
                    height={'24'}
                    rx={'4'}
                    ry="4"
                  />
                </ContentLoader>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 16,
                }}>
                <View style={{ marginRight: 15 }}>
                  {!loading || user ? (
                    <BoldText
                      fontSize={16}
                      style={{ fontWeight: '700', marginBottom: 3 }}>
                      {subscribers.toString()}
                    </BoldText>
                  ) : (
                    <ContentLoader
                      width={'80'}
                      height={'24'}
                      backgroundColor={colors.skeletonBg}
                      foregroundColor={colors.skeletonFg}>
                      <Rect width={'80'} height={'24'} rx={'8'} ry="8" />
                    </ContentLoader>
                  )}

                  <RegularText
                    fontSize={12}
                    style={{ color: colors.textSecondary }}>
                    Подписчиков
                  </RegularText>
                </View>
                <View>
                  {!loading || user ? (
                    <BoldText
                      fontSize={16}
                      style={{ fontWeight: '700', marginBottom: 3 }}>
                      {subscribes.toString()}
                    </BoldText>
                  ) : (
                    <ContentLoader
                      width={'80'}
                      height={'24'}
                      backgroundColor={colors.skeletonBg}
                      foregroundColor={colors.skeletonFg}>
                      <Rect width={'80'} height={'24'} rx={'8'} ry="8" />
                    </ContentLoader>
                  )}

                  <RegularText
                    fontSize={12}
                    style={{ color: colors.textSecondary }}>
                    Подписки
                  </RegularText>
                </View>
              </View>
            </View>
            {!loading || user ? (
              <Avatar size={80} url={user?.avatar?.url_128 ?? null} />
            ) : (
              <ContentLoader
                width={'80'}
                height={'80'}
                backgroundColor={colors.skeletonBg}
                foregroundColor={colors.skeletonFg}>
                <Circle r={'40'} x="40" y="40" />
              </ContentLoader>
            )}
          </View>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: colors.bgSecondary,
              marginTop: 20,
            }}>
            <Block style={{ height: 310 }}>
              <BoldText
                fontSize={16}
                style={{ fontWeight: '700', marginBottom: 20 }}>
                Профиль
              </BoldText>
              <View style={{ flex: 1 }}>
                <NavLink text="Мои хештеги" onPress={hashtagPress} />
                <Separator mt={15} mb={15} />
                <NavLink text="Редактировать профиль" onPress={profilePress} />
                <Separator mt={15} mb={15} />
                <NavLink text="Стать блогером" onPress={createBloderPress} />
                <Separator mt={15} mb={15} />
                <NavLink text="Посмотреть блогера" onPress={showBloderPress} />
              </View>
            </Block>
            <Block style={{ height: 214 }}>
              <BoldText
                fontSize={16}
                style={{ fontWeight: '700', marginBottom: 20 }}>
                Еще
              </BoldText>
              <View style={{ flex: 1 }}>
                <NavLink
                  text="Техподдержка"
                  onPress={() => {
                    navigation.navigate('TechSupport');
                  }}
                />
                <Separator mt={15} mb={15} />
                <NavLink
                  text="Настройки"
                  onPress={() => {
                    navigation.navigate('Settings');
                  }}
                />
                <Separator mt={15} mb={15} />
                <NavLink
                  text="О приложении"
                  onPress={() => {
                    navigation.navigate('AboutScreen');
                  }}
                />
              </View>
            </Block>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

interface INavLinkProps {
  onPress: () => void;
  text: string;
}

const NavLink = (props: INavLinkProps) => {
  const { onPress, text } = props;
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <MediumText fontSize={14}>{text}</MediumText>
      <ArrowRight fill={colors.bgPrimary} />
    </TouchableOpacity>
  );
};
