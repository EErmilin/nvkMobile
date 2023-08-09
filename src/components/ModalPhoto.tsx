import * as React from 'react';
import {useWindowDimensions, Platform} from 'react-native';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {useTheme} from '../Styles/Styles';
import BoldText from './BoldText';
import {FormContainer} from './FormContainer';
import MediumText from './MediumText';
import {Separator} from './Separator';
import {openCamera, openPicker} from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {BlurView} from '@react-native-community/blur';
import {uploadImage} from '../requests/UploadImage';

interface IProps {
  visible: boolean;
  shouldClose: () => void;
  setAvatar: (value: string, id: number) => void;
  setLoadingAvatar: (value: boolean) => void;
}

const openAndSendPicker = async (
  permissionType: 'CAMERA' | 'LIBRARY',
  setAvatar: (url: string, id: number) => void,
  shoudClose: () => void,
  setLoadingAvatar: (value: boolean) => void,
) => {
  setLoadingAvatar(true);
  if (permissionType === 'CAMERA') {
    try {
      const responseCamera = await openCamera({
        mediaType: 'photo',
        cropping: true,
      });
      let data = {
        type: responseCamera.mime,
        uri: responseCamera.path,
        fileName: responseCamera.path,
      };
      shoudClose();
      let response = await uploadImage(data);
      if (response.status === 201) {
        setAvatar(response.data.url_128, response.data.id);
        setLoadingAvatar(false);
      } else {
        setLoadingAvatar(false);
      }
    } catch (e) {
      console.log('e camera', e);
      shoudClose();
      setLoadingAvatar(false);
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        // @ts-ignore
        text2: e.message,
      });
    }
  } else {
    try {
      const responseLib = await openPicker({
        mediaType: 'photo',
        cropping: true,
      });
      shoudClose();
      let data = {
        type: responseLib.mime,
        uri: responseLib.path,
        fileName: responseLib.path,
      };
      let response = await uploadImage(data);
      if (response.status === 201) {
        setAvatar(response.data.url_128, response.data.id);
        setLoadingAvatar(false);
      } else {
        setLoadingAvatar(false);
      }
    } catch (e) {
      shoudClose();
      setLoadingAvatar(false);
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        // @ts-ignore
        text2: e.message,
      });
    }

    // const responseLib = await launchImageLibrary({mediaType: 'photo'});
    // shoudClose();
    // if (responseLib.assets) {
    //   let response = await uploadImage(responseLib.assets[0]);
    //   if (response.status === 201) {
    //     setAvatar(response.data.url_128, response.data.id);
    //     setLoadingAvatar(false);
    //   } else {
    //     setLoadingAvatar(false);
    //   }
    // } else {
    //   setLoadingAvatar(false);
    // }
  }
};

const checkPermission = (
  permissionType: 'CAMERA' | 'LIBRARY',
  setAvatar: (value: string, id: number) => void,
  shouldClose: () => void,
  setLoadingAvatar: (value: boolean) => void,
) => {
  if (Platform.OS === 'android') {
    check(
      PERMISSIONS.ANDROID[
        permissionType === 'CAMERA' ? 'CAMERA' : 'READ_EXTERNAL_STORAGE'
      ],
    ).then(result => {
      switch (result) {
        case 'blocked':
        case 'denied':
        case 'unavailable':
          request(
            PERMISSIONS.ANDROID[
              permissionType === 'CAMERA' ? 'CAMERA' : 'READ_EXTERNAL_STORAGE'
            ],
          )
            .then(resultReq => {
              if (resultReq === 'granted' || resultReq === 'limited') {
                openAndSendPicker(
                  permissionType,
                  setAvatar,
                  shouldClose,
                  setLoadingAvatar,
                );
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Ошибка',
                  text2: 'Разрешение не получено',
                });
              }
            })
            .catch();
          break;
        case 'granted':
        case 'limited':
          openAndSendPicker(
            permissionType,
            setAvatar,
            shouldClose,
            setLoadingAvatar,
          );
          break;
      }
    });
  } else {
    check(
      PERMISSIONS.IOS[permissionType === 'CAMERA' ? 'CAMERA' : 'PHOTO_LIBRARY'],
    ).then(result => {
      switch (result) {
        case 'blocked':
        case 'denied':
        case 'unavailable':
          request(
            PERMISSIONS.IOS[
              permissionType === 'CAMERA' ? 'CAMERA' : 'PHOTO_LIBRARY'
            ],
          )
            .then(resultReq => {
              if (resultReq === 'granted' || resultReq === 'limited') {
                openAndSendPicker(
                  permissionType,
                  setAvatar,
                  shouldClose,
                  setLoadingAvatar,
                );
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Ошибка',
                  text2: 'Разрешение не получено\n' + resultReq,
                });
              }
            })
            .catch();
          break;
        case 'granted':
        case 'limited':
          openAndSendPicker(
            permissionType,
            setAvatar,
            shouldClose,
            setLoadingAvatar,
          );
          break;
      }
    });
  }
};

export const ModalPhoto = (props: IProps) => {
  const {visible, shouldClose, setAvatar, setLoadingAvatar} = props;
  const screenWidth = useWindowDimensions().width;
  const {colors} = useTheme();

  return (
    <Modal
      visible={visible}
      onRequestClose={() => shouldClose()}
      animationType="fade"
      transparent>
      <BlurView
        style={{flex: 1}}
        blurType="dark"
        blurAmount={1}
        reducedTransparencyFallbackColor="white">
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => shouldClose()}
          activeOpacity={0.99}>
          <FormContainer
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              justifyContent: 'flex-end',
            }}
            styleView={{flex: 1, justifyContent: 'flex-end'}}>
            <View>
              <View style={[{backgroundColor: colors.bgPrimary}, styles.view]}>
                <TouchableOpacity
                  style={styles.touch}
                  onPress={() => {
                    checkPermission(
                      'LIBRARY',
                      setAvatar,
                      shouldClose,
                      setLoadingAvatar,
                    );
                  }}>
                  <MediumText>Выбрать из галереи</MediumText>
                </TouchableOpacity>
                <Separator mh={25} style={{width: screenWidth - 80}} />
                <TouchableOpacity
                  style={styles.touch}
                  onPress={() => {
                    checkPermission(
                      'CAMERA',
                      setAvatar,
                      shouldClose,
                      setLoadingAvatar,
                    );
                  }}>
                  <MediumText>Сделать фото</MediumText>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.touchClose, {backgroundColor: colors.bgPrimary}]}
                onPress={() => shouldClose()}>
                <BoldText style={{color: colors.colorMain}}>Закрыть</BoldText>
              </TouchableOpacity>
            </View>
          </FormContainer>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {},
  view: {borderRadius: 20},
  touch: {
    height: 73,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchClose: {
    marginTop: 8,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
