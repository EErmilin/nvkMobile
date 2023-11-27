import * as React from 'react';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView, View} from 'react-native';
import {useTheme} from '../../Styles/Styles';
import ImageIcon from '../../assets/icons/Image_icon';
import {ModalPhoto} from '../../components';
import {useAppSelector} from '../../redux/hooks';
import {useDispatch} from 'react-redux';
import {addImage, setText} from '../../redux/slices/createPostSlice';

export default function CreatePost() {
  const {colors} = useTheme();
  const [modalPhoto, setModalPhoto] = React.useState(false);
  const text = useAppSelector(state => state.createPost.text);
  const images = useAppSelector(state => state.createPost.images);
  const dispatch = useDispatch();

  const onChangeText = React.useCallback((value: string) => {
    dispatch(setText(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addPostImage = React.useCallback((url: string, id: number) => {
    dispatch(addImage({url, id}));
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
          flex: 1,
          borderBottomWidth: 1,
          borderColor: '#0000001A',
        }}>
        <TextInput
          multiline
          placeholder="Напишите что-нибудь..."
          onChangeText={onChangeText}
          value={text}
          style={{
            textAlignVertical: 'top',
            fontFamily: 'NotoSans-Regular',
            fontSize: 14,
            lineHeight: 24,
            paddingLeft: 16,
            paddingRight: 16,
            flex: 1,
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
            }}>
            {images.map(i => (
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderWidth: 1,
                  borderColor: '#0000001A',
                  borderRadius: 8,
                }}>
                <Image
                  source={{uri: i.url}}
                  key={i.id}
                  style={{maxWidth: '100%', maxHeight: '100%'}}
                />
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
          }}>
          <TouchableOpacity
            onPress={() => setModalPhoto(true)}
            style={{
              padding: 4,
              marginTop: -4,
            }}>
            <ImageIcon />
          </TouchableOpacity>
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
