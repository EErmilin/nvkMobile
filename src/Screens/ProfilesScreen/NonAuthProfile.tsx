import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';

import {
  Avatar,
  BoldText,
  Button,
  MediumText,
  RegularText,
  Separator,
} from '../../components';
import {ArrowRight, AuthLogo} from '../../components/SVGcomponents';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
import {useTheme} from '../../Styles/Styles';

export const NonAuthProfile: React.FC<{
  authPress?: any;
  navigation: TabNavigationProps<'Profile'>['navigation'];
}> = ({authPress, navigation}) => {
  const {colors, theme} = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 155,
        backgroundColor: colors.bgSecondary,
      }}
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: colors.fillPrimary}}>
      <View
        style={{
          backgroundColor: colors.fillPrimary,
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}>
        <Avatar size={80} url={null} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgSecondary,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 50,
          }}>
          <BoldText fontSize={18} style={{fontWeight: '800'}}>
            Войдите в аккаунт
          </BoldText>
          <RegularText
            fontSize={14}
            style={{
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: 15,
            }}>
            Для полного доступа к функциям приложения требуется авторизация
          </RegularText>
          <Button
            title={'Авторизоваться'}
            style={{
              marginTop: 30,
              height: 40,
              borderRadius: 12,
            }}
            icon={
              <AuthLogo
                color={theme === 'dark' ? colors.black : colors.white}
              />
            }
            onPress={authPress}
          />
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            backgroundColor: colors.fillPrimary,
            borderRadius: 20,
            height: 214,
            padding: 20,
          }}>
          <BoldText fontSize={16} style={{fontWeight: '700', marginBottom: 20}}>
            Еще
          </BoldText>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TechSupport')}
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                height: 24,
              }}>
              <MediumText fontSize={14}>Тех.поддержка</MediumText>
              <ArrowRight />
            </TouchableOpacity>
            <Separator mt={15} mb={15} />
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                height: 24,
              }}>
              <MediumText fontSize={14}>Настройки</MediumText>
              <ArrowRight />
            </TouchableOpacity>
            <Separator mt={15} mb={15} />
            <TouchableOpacity
              onPress={() => navigation.navigate('AboutScreen')}
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                height: 24,
              }}>
              <MediumText fontSize={14}>О приложении</MediumText>
              <ArrowRight />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
