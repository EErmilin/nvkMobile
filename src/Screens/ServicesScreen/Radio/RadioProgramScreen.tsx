import * as React from 'react';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {BoldText} from '../../../components';
import {ArrowLeft} from '../../../components/SVGcomponents';
import {themeColors} from '../../../Styles/Styles';
import {RadioProgram} from './components/RadioProgram';

const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <ArrowLeft color={themeColors.dark.colorMain} />
      </TouchableOpacity>
      <BoldText
        fontSize={16}
        style={{
          color: themeColors.dark.white,
          marginLeft: 10,
          marginBottom: 3,
          flex: 1,
        }}>
        Программа
      </BoldText>
    </View>
  );
};

export const RadioProgramScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: themeColors.dark.bgRadio}}>
      <Header />
      <RadioProgram />
    </SafeAreaView>
  );
};
