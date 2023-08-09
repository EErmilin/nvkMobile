import React, {useState} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import Toast from 'react-native-toast-message';
import {ApolloError} from '@apollo/client';

import {
  BoldText,
  Button,
  FormContainer,
  MediumText,
  ModalComponent,
  Avatar,
  NavLink,
  Separator,
  ModalPhoto,
  ModalDatePicker,
} from '../../components';
import {ArrowRight} from '../../components/SVGcomponents';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {updateUser} from '../../redux/thunks/user/UpdateUser';
import {useTheme} from '../../Styles/Styles';
import {MailEdit} from './screenComponents/MailEdit';
import {NameEdit} from './screenComponents/NameEdit';
import {PhoneEdit} from './screenComponents/PhoneEdit';

export const EditProfile: React.FC<RootNavigationProps<'EditProfile'>> = ({
  navigation,
}) => {
  const [modalDrag, setModalDrag] = useState<
    'name' | 'number' | 'mail' | 'password' | ''
  >('');
  const [modalBirth, setModalBirth] = React.useState(false);
  const user = useAppSelector(state => state.user.data);

  const [birthdate, setBirthdate] = React.useState<Date | null>(
    user?.birthdate ? new Date(user?.birthdate) : null,
  );
  const [firstname, setFirstname] = React.useState(user?.firstname ?? '');
  const [email, setEmail] = React.useState(user?.email ?? null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [modalPhoto, setModalPhoto] = React.useState(false);
  const [avatar, setAvatar] = React.useState<{
    url: string | null;
    id: number | null;
  }>({
    url: user?.avatar?.url_128 ?? null,
    id: null,
  });
  const [loadingAvatar, setLoadingAvatar] = React.useState(false);
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: colors.bgSecondary}}>
      <View
        style={{
          height: 150,
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 15,
          backgroundColor: colors.fillPrimary,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}>
        {loadingAvatar ? (
          <TouchableOpacity
            onPress={() => setModalPhoto(true)}
            style={{
              width: 80,
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 40,
              backgroundColor: colors.gray,
            }}>
            <ActivityIndicator size={'small'} color={colors.orange} />
          </TouchableOpacity>
        ) : (
          <Avatar
            editable
            size={80}
            // style={{transform: [{rotate: '90deg'}]}}
            url={avatar.url}
            onPress={() => {
              setModalPhoto(true);
            }}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            setModalDrag('name');
          }}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{marginLeft: 20}}>
            <MediumText
              fontSize={12}
              style={{color: colors.textSecondary, marginBottom: 5}}>
              Имя
            </MediumText>
            <BoldText fontSize={14} style={{fontWeight: '700'}}>
              {firstname}
            </BoldText>
          </View>
          <ArrowRight />
        </TouchableOpacity>
      </View>
      <FormContainer style={{backgroundColor: colors.bgSecondary}}>
        <View style={{flex: 1, marginHorizontal: 0}}>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                alignSelf: 'stretch',
                backgroundColor: colors.fillPrimary,
                borderRadius: 20,
                marginTop: 20,
                padding: 20,
              }}>
              <BoldText
                fontSize={16}
                style={{fontWeight: '700', marginBottom: 20}}>
                Учетные данные
              </BoldText>
              <View style={{flex: 1}}>
                <NavLink
                  text={user?.phone ?? 'Не указано'}
                  label="Номер телефона"
                  onPress={() => {
                    setModalDrag('number');
                  }}
                />
                <Separator mt={10} mb={20} />
                <NavLink
                  text={
                    birthdate !== null
                      ? birthdate.toLocaleDateString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })
                      : 'Не указано'
                  }
                  label="День рождения"
                  onPress={() => {
                    setModalBirth(true);
                  }}
                />
                <Separator mt={10} mb={20} />
                <NavLink
                  text={email !== null ? email : 'Не указано'}
                  label="Эл. Почта"
                  onPress={() => {
                    setModalDrag('mail');
                  }}
                />
                <Separator mt={10} mb={20} />
                <NavLink
                  text={'Изменить'}
                  label="Пароль"
                  onPress={() => {
                    navigation.navigate('PasswordEdit');
                  }}
                />
              </View>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <Button
                disabled={loadingAvatar}
                title={'Сохранить'}
                loading={loading}
                loadingColor={colors.white}
                style={{
                  borderRadius: 15,
                  marginTop: 15,
                }}
                onPress={async () => {
                  try {
                    setLoading(true);
                    await dispatch(
                      updateUser({
                        firstname: firstname,
                        email: email ?? undefined,
                        birthdate: birthdate ?? undefined,
                        avatar_id: avatar.id ?? undefined,
                      }),
                    );
                    navigation.goBack();
                    setLoading(false);
                  } catch (e: unknown) {
                    if (e instanceof ApolloError) {
                      Toast.show({
                        type: 'error',
                        text1: 'Ошибка',
                        text2: e.message,
                      });
                    }
                  }
                }}
              />
            </View>
          </View>
        </View>
      </FormContainer>
      <ModalPhoto
        visible={modalPhoto}
        shouldClose={() => {
          setModalPhoto(false);
        }}
        setAvatar={(url, id) => {
          setAvatar({url: url, id: id});
        }}
        setLoadingAvatar={setLoadingAvatar}
      />
      <ModalDatePicker
        visible={modalBirth}
        date={birthdate ?? new Date()}
        onChangeDate={value => setBirthdate(value)}
        shouldClose={() => {
          setModalBirth(false);
        }}
        mode="date"
        onStart={() => {}}
      />
      <ModalComponent
        visible={modalDrag !== ''}
        child={
          modalDrag === 'name' ? (
            <NameEdit
              firstname={firstname}
              setFirstname={setFirstname}
              shoudClose={() => {
                setModalDrag('');
              }}
            />
          ) : modalDrag === 'number' ? (
            <PhoneEdit
              shouldClose={() => {
                setModalDrag('');
              }}
            />
          ) : modalDrag === 'mail' ? (
            <MailEdit
              email={email}
              setEmail={setEmail}
              shouldClose={() => {
                setModalDrag('');
              }}
            />
          ) : (
            <View />
          )
        }
        shouldClose={() => {
          setModalDrag('');
        }}
      />
    </View>
  );
};
