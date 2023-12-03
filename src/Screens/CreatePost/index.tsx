import * as React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {openPicker} from 'react-native-image-crop-picker';
import {
  PERMISSIONS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {useTheme} from '../../Styles/Styles';
import CameraIcon from '../../assets/icons/Camera_icon';
import ImageIcon from '../../assets/icons/Image_icon';
import {ModalPhoto, VideoPlayer} from '../../components';
import {Plus} from '../../components/SVGcomponents';
import {useAppSelector} from '../../redux/hooks';
import {
  addImage,
  removeImage,
  setContent,
  setTitle,
  setVideo,
} from '../../redux/slices/createPostSlice';

export default function CreatePost() {
  const {colors} = useTheme();
  const [modalPhoto, setModalPhoto] = React.useState(false);
  const content = useAppSelector(state => state.createPost.content);
  const title = useAppSelector(state => state.createPost.title);
  const images = useAppSelector(state => state.createPost.images);
  const video = useAppSelector(state => state.createPost.video);
  const dispatch = useDispatch();

  const onChangeText = React.useCallback((value: string) => {
    dispatch(setContent(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeTitle = React.useCallback((value: string) => {
    dispatch(setTitle(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addPostImage = React.useCallback((url: string, id: number) => {
    dispatch(addImage({url, id}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMedia = React.useCallback(async () => {
    const permission =
      Platform.OS === 'android'
        ? Platform.Version && Number(Platform.Version) >= 32
          ? PERMISSIONS.ANDROID.READ_MEDIA_VIDEO
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.MEDIA_LIBRARY;

    let result = await check(permission);
    if (result !== 'granted' && result !== 'limited') {
      result = await request(permission);
    }

    if (result !== 'granted' && result !== 'limited') {
      Toast.show({
        type: 'info',
        text1: 'Необходимо разрешение на чтение из библиотеки',
        text2: 'Нажмите здесь для перехода в настройки',

        onPress() {
          openSettings();
        },
      });

      return;
    }

    const vid = await openPicker({
      mediaType: 'video',
    });

    if (vid.duration && vid.duration > 60_000) {
      Toast.show({
        type: 'error',
        text1: 'Видео файл слишком большой',
        text2: 'Максимальная длительность видео одна минута',
      });

      return;
    }
    dispatch(setVideo(vid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
      }}>
      <SafeAreaView
        style={{
          borderBottomWidth: 1,
          borderColor: colors.borderGray,
          height: 50,
        }}>
        <TextInput
          placeholder="Заголовок..."
          onChangeText={onChangeTitle}
          value={title}
          placeholderTextColor={colors.textSecondary}
          style={{
            textAlignVertical: 'top',
            fontFamily: 'NotoSans-Regular',
            fontSize: 14,
            lineHeight: 24,
            paddingLeft: 16,
            paddingRight: 16,
            flex: 1,
            color: colors.textPrimary,
          }}
        />
      </SafeAreaView>
      <SafeAreaView
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderColor: colors.borderGray,
        }}>
        {video && (
          <View
            style={{aspectRatio: 16 / 9, width: '100%', position: 'relative'}}>
            <VideoPlayer urls={{url: video.path, hls: []}} />

            <View
              style={{
                position: 'absolute',
                right: 12,
                top: 12,
                width: 24,
                height: 24,
                backgroundColor: colors.background,
                zIndex: 2,
                borderRadius: 32,
                transform: [{rotate: '45deg'}],
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                borderColor: colors.borderGray,
                borderWidth: 1,
              }}>
              <TouchableOpacity onPress={() => dispatch(setVideo(null))}>
                <Plus color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TextInput
          multiline
          placeholder="Напишите что-нибудь..."
          onChangeText={onChangeText}
          value={content}
          placeholderTextColor={colors.textSecondary}
          style={{
            textAlignVertical: 'top',
            fontFamily: 'NotoSans-Regular',
            fontSize: 14,
            lineHeight: 24,
            paddingLeft: 16,
            paddingRight: 16,
            flex: 1,
            color: colors.textPrimary,
          }}
        />
      </SafeAreaView>

      {images.length > 0 && (
        <SafeAreaView style={{borderBottomWidth: 1, borderColor: '#0000001A'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 4,
              padding: 4,
              paddingLeft: 16,
              paddingRight: 16,
              borderBottomWidth: 1,
              borderColor: colors.borderGray,
            }}>
            {images.map(i => (
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderWidth: 1,
                  borderColor: colors.borderGray,
                  borderRadius: 8,
                  position: 'relative',
                }}>
                <Image
                  source={{uri: i.url}}
                  key={i.id}
                  style={{width: '100%', height: '100%'}}
                />

                <View
                  style={{
                    position: 'absolute',
                    right: -4,
                    top: -4,
                    width: 24,
                    height: 24,
                    backgroundColor: colors.background,
                    borderWidth: 1,
                    borderColor: colors.borderGray,
                    zIndex: 2,
                    borderRadius: 24,
                    transform: [{rotate: '45deg'}],
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                  }}>
                  <TouchableOpacity onPress={() => dispatch(removeImage(i.id))}>
                    <Plus color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </SafeAreaView>
      )}
      <SafeAreaView
        style={{
          height: 56,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 2,
          }}>
          <View>
            <TouchableOpacity
              onPress={() => setModalPhoto(true)}
              style={{
                height: 40,
                width: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageIcon color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={addMedia}
              style={{
                height: 40,
                width: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CameraIcon color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ModalPhoto
        visible={modalPhoto}
        shouldClose={() => setModalPhoto(false)}
        setAvatar={addPostImage}
        setLoadingAvatar={() => {}}
      />
    </View>
  );
}
