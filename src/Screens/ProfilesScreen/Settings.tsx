import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {requestNotifications, openSettings} from 'react-native-permissions';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import {
  BoldText,
  Button,
  CustomSwitch,
  FormContainer,
  RegularText,
  NavLink,
  Containter,
  MediumText,
  Separator,
} from '../../components';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {logout} from '../../redux/thunks/auth/Logout';
import {setTheme} from '../../redux/slices/themeSlice';
import {useTheme} from '../../Styles/Styles';
import {ConfirmDelete} from '../../components/ConfirmDelete';
import DeviceInfo from 'react-native-device-info';

export const Settings: React.FC<RootNavigationProps<'Settings'>> = ({}) => {
  const dispatch = useAppDispatch();
  const [loadingLogout, setLoadingLogout] = React.useState(false);
  const user = useAppSelector(state => state.user.data);
  const theme = useAppSelector(state => state.theme.text);
  const [modal, setModal] = React.useState(false);
  const {colors} = useTheme();
  const [modalDelete, setModalDelete] = React.useState(false);
  const [permissionStatus, setPermissionStatus] = React.useState(false);

  const requestPermission2 = React.useCallback(async () => {
    requestNotifications(['alert', 'sound'])
      .then(result => {
        if (result.status === 'granted' || result.status === 'limited') {
          setPermissionStatus(true);
        } else {
          setPermissionStatus(false);
          openSettings();
        }
      })
      .catch(e => {
        console.log('e notification', e);
      });
  }, []);

  React.useEffect(() => {
    requestPermission2();
  }, [requestPermission2]);

  return (
    <FormContainer style={{}}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgSecondary,
        }}>
        {Platform.OS === 'ios' ? (
          <BoldText
            fontSize={16}
            style={{fontWeight: '700', alignSelf: 'center'}}>
            Настройки
          </BoldText>
        ) : (
          <></>
        )}
        <View
          style={[
            styles.view,
            {
              backgroundColor: colors.fillPrimary,
              height: 91,
              marginTop: 30,
            },
          ]}>
          <BoldText fontSize={16} style={{fontWeight: '700'}}>
            Включите Push-уведомления
          </BoldText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <RegularText fontSize={12}>PUSH-уведомления</RegularText>
            <CustomSwitch
              value={permissionStatus}
              onChangeValue={(value: boolean) => {
                setPermissionStatus(value);
                if (permissionStatus) {
                  openSettings();
                } else {
                  requestPermission2();
                }
              }}
            />
          </View>
        </View>
        <View
          style={[
            styles.view,
            {
              backgroundColor: colors.fillPrimary,
              marginTop: 15,
            },
          ]}>
          <NavLink
            label="Тема оформления"
            text={theme}
            onPress={() => {
              setModal(true);
            }}
          />
        </View>
        {user ? (
          <View
            style={[
              styles.view,
              {
                backgroundColor: colors.fillPrimary,
                height: 116,
                marginTop: 15,
              },
            ]}>
            <BoldText fontSize={14} style={{fontWeight: '700'}}>
              Выйти
            </BoldText>
            <Button
              title={'Выйти'}
              loading={loadingLogout}
              style={{
                height: 40,
                backgroundColor: colors.bgDanger,
              }}
              textStyle={{color: colors.danger}}
              onPress={async () => {
                setLoadingLogout(true);
                await dispatch(logout());
                AppMetrica.reportEvent('LOGOUT', {
                  user: user,
                  date: new Date(),
                  date_string: new Date().toString(),
                  platform: Platform.OS,
                  app_version: DeviceInfo.getVersion(),
                });
                setLoadingLogout(false);
              }}
              loadingColor={colors.danger}
              loadingSize={'small'}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
      {user ? (
        <View
          style={[
            styles.view,
            {
              backgroundColor: colors.fillPrimary,
              height: 116,
              marginBottom: 0,
            },
          ]}>
          <BoldText fontSize={14} style={{fontWeight: '700'}}>
            Удалить аккаунт
          </BoldText>
          <Button
            title={'Удалить'}
            style={{
              height: 40,
              backgroundColor: colors.bgDanger,
            }}
            textStyle={{color: colors.danger}}
            onPress={async () => {
              setModalDelete(true);
            }}
          />
        </View>
      ) : (
        <></>
      )}
      <ModalTheme visible={modal} setModal={setModal} />
      <ConfirmDelete
        visible={modalDelete}
        shouldClose={() => {
          setModalDelete(false);
        }}
      />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  view: {
    alignSelf: 'stretch',
    borderRadius: 22,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.05,
    shadowRadius: 22,
    padding: 20,
    justifyContent: 'space-between',
  },
});

const ModalTheme = (props: {
  visible: boolean;
  setModal: (value: boolean) => void;
}) => {
  const {visible, setModal} = props;
  const dispatch = useAppDispatch();
  const {colors, theme} = useTheme();

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setModal(false)}
      animationType="fade"
      transparent>
      <BlurView style={{flex: 1}} blurType={theme} blurAmount={1}>
        <Containter onTouchEnd={() => setModal(false)} style={stylesModal.main}>
          <View
            style={[
              stylesModal.view,
              {
                backgroundColor: colors.fillPrimary,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              },
            ]}>
            <TouchableOpacity
              style={[
                stylesModal.touchItem,
                {
                  backgroundColor: colors.fillPrimary,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                },
              ]}
              onPress={() => dispatch(setTheme('Системная'))}>
              <RegularText fontSize={14} style={{}}>
                Системная
              </RegularText>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity
              style={[
                stylesModal.touchItem,
                {backgroundColor: colors.fillPrimary},
              ]}
              onPress={() => dispatch(setTheme('Темная'))}>
              <RegularText fontSize={14} style={{}}>
                Темная
              </RegularText>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity
              style={[
                stylesModal.touchItem,
                {
                  backgroundColor: colors.fillPrimary,
                  borderBottomLeftRadius: 16,
                  borderBottomEndRadius: 16,
                },
              ]}
              onPress={() => dispatch(setTheme('Светлая'))}>
              <RegularText fontSize={14} style={{}}>
                Светлая
              </RegularText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              stylesModal.touchCancel,
              {backgroundColor: colors.fillPrimary},
            ]}
            onPress={() => setModal(false)}>
            <MediumText
              fontSize={14}
              style={{color: colors.colorMain, fontWeight: '600'}}>
              Закрыть
            </MediumText>
          </TouchableOpacity>
        </Containter>
      </BlurView>
    </Modal>
  );
};

const stylesModal = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    height: '100%',
    bottom: 0,
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  viewTop: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  view: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomEndRadius: 16,
  },
  touchItem: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchCancel: {
    marginTop: 8,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
