import * as React from 'react';
import {
  useWindowDimensions,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';

import {
  BoldText,
  MediumText,
  RegularText,
  Avatar,
  Separator,
  Block,
  Button,
} from '../../components';
import {ArrowRight} from '../../components/SVGcomponents';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
import {useAppSelector} from '../../redux/hooks';
import {useTheme} from '../../Styles/Styles';
import Plus_icon from '../../assets/icons/Plus_icon';

export const AuthProfile: React.FC<{
  subscriptionsPress?: any;
  hashtagPress?: any;
  profilePress?: any;
  createBloderPress?: any;
  passwordPress?: any;
  techPress?: any;
  settingPress?: any;
  showBloderPress?: any;
  editBloderPress?: any;
  navigation: TabNavigationProps<'Profile'>['navigation'];
  loading: boolean;
}> = ({
  subscriptionsPress,
  hashtagPress,
  profilePress,
  createBloderPress,
  showBloderPress,
  editBloderPress,
  navigation,
  loading,
}) => {
  const layout = useWindowDimensions();
  const screenWidth = Dimensions.get('screen').width;
  const user = useAppSelector(state => state.user.data);
  const subscribers =
    useAppSelector(state => state.user.author)?.authorAggregate?.subsCount ?? 0;
  const subscribes =
    useAppSelector(state => state.user.author)?.authorAggregate?.followsCount ??
    0;
  const {colors, Style} = useTheme();

  const CreateBlogerItem = (
    <View>
      <Text>Стать автором</Text>
      <Plus_icon />
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: colors.fillPrimary}}>
      <SafeAreaView />
      <SafeAreaView style={[Style.container]}>
        <View
          style={{
            flex: 1,
            paddingBottom: 79,
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
                  style={{fontWeight: '700', width: screenWidth - 130}}>
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
                <View style={{marginRight: 15}}>
                  {!loading || user ? (
                    <BoldText
                      fontSize={16}
                      style={{fontWeight: '700', marginBottom: 3}}>
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
                    style={{color: colors.textSecondary}}>
                    Подписчиков
                  </RegularText>
                </View>
                <View>
                  {!loading || user ? (
                    <BoldText
                      fontSize={16}
                      style={{fontWeight: '700', marginBottom: 3}}>
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
                    style={{color: colors.textSecondary}}>
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
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}>
            <Block>
              <BoldText
                fontSize={16}
                style={{fontWeight: '700', marginBottom: 20}}>
                Профиль
              </BoldText>
              <View style={{flex: 1}}>
                <NavLink text="Мои подписки" onPress={subscriptionsPress} />
                <Separator mt={15} mb={15} />
                <NavLink text="Мои хештеги" onPress={hashtagPress} />
                <Separator mt={15} mb={15} />
                <NavLink text="Редактировать профиль" onPress={profilePress} />
                <Separator mt={15} mb={15} />
                <NavLink
                  text="Редактировать данные блогера"
                  onPress={editBloderPress}
                />
                <Separator mt={15} mb={15} />
                <NavLink text="Посмотреть блогера" onPress={showBloderPress} />
              </View>
            </Block>
            <Block>
              <BoldText
                fontSize={16}
                style={{fontWeight: '700', marginBottom: 20}}>
                Еще
              </BoldText>
              <View style={{flex: 1}}>
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
          <Button
            title="Стать блогером"
            icon={<Plus_icon />}
            mt={15}
            style={{
              marginBottom: 14,
              marginHorizontal: 15,
              height: 40,
            }}
            onPress={createBloderPress}
          />
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
  const {onPress, text} = props;
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 24,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <MediumText fontSize={14}>{text}</MediumText>
      <ArrowRight fill={colors.bgPrimary} />
    </TouchableOpacity>
  );
};
