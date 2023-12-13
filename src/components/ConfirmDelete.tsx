import * as React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import BoldText from './BoldText';
import MediumText from './MediumText';
import {useTheme} from '../Styles/Styles';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {deleteProfile} from '../redux/thunks/user/DeleteProfile';
import {useNavigation} from '@react-navigation/native';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';
import DeviceInfo from 'react-native-device-info';
import {setLogged, setToken} from '../redux/slices/authSlice';

type IProps = {
  visible: boolean;
  shouldClose: () => void;
};

export const ConfirmDelete = (props: IProps) => {
  const {visible, shouldClose} = props;
  const {colors} = useTheme();
  const screenWidth = useWindowDimensions().width;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = useAppSelector(state => state.user.data);

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => {
        shouldClose();
      }}
      animationType="fade">
      <BlurView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        blurAmount={1}
        blurType="dark"
        blurRadius={1}>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => shouldClose()}>
          <View
            style={{
              backgroundColor: colors.bgSecondary,
              marginHorizontal: 15,
              alignSelf: 'center',
              padding: 15,
              borderRadius: 18,
              width: screenWidth - 30,
            }}>
            <BoldText fontSize={16}>Вы уверены,</BoldText>
            <BoldText fontSize={16}>что хотите удалить аккаунт?</BoldText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  height: 41,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  marginRight: 5,
                  backgroundColor: colors.colorMain,
                  borderRadius: 10,
                }}
                onPress={() => shouldClose()}>
                <MediumText>Нет</MediumText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 41,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 5,
                  backgroundColor: colors.bgDanger,
                  borderRadius: 10,
                }}
                onPress={async () => {
                  let response = await dispatch(deleteProfile());
                  if (response.meta.requestStatus === 'fulfilled') {
                    AppMetrica.reportEvent('DELETE_ACCOUNT', {
                      user: user,
                      date: new Date(),
                      date_string: new Date().toString(),
                      platform: Platform.OS,
                      app_version: DeviceInfo.getVersion(),
                    });
                    shouldClose();
                    navigation.goBack();
                    dispatch(setToken(null));
                    dispatch(setLogged(false));
                  }
                }}>
                <MediumText style={{color: colors.danger}}>Да</MediumText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
};
