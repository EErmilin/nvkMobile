import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BoldText, Button, InputText} from '../../components';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, useFieldArray} from 'react-hook-form';

import {InputForm} from '../../components/react-hook-form-fields/InputForm';
import {colors} from '../../Styles/Styles';
import VK_Icon from '../../assets/icons/VK_Icon';
import Plus_icon from '../../assets/icons/Plus_icon';
import Telegram_Icon from '../../assets/icons/Telegram_Icon';
import YouTube_Icon from '../../assets/icons/YouTube_Icon';
import Odnoklassniki_icon from '../../assets/icons/Odnoklassniki_icon';
import {TEST_BLOGER_DATA} from './components/tmpData';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import PlusWithCircle_icon from '../../assets/icons/PlusWithCircle_icon';
import {authorCreate, authorUpdate} from '../../redux/thunks/author/GetAuthor';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const INITIAL_VALUES = {
  about: '',
  nik: '',
  odnoklassniki: '',
  telegram: '',
  vk: '',
  youTube: '',
  sites: [],
};

type TFormProps = {
  type?: 'Edit' | undefined;
};

const CreateBloger: React.FC<TFormProps> = ({type}) => {
  const nav = useNavigation();
  const dispatch = useAppDispatch();
  const currentAuthor = useAppSelector(state => state.user.author)?.author;
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues:
      type === 'Edit'
        ? {
            nik: currentAuthor?.nickname,
            about: currentAuthor?.description,
            odnoklassniki: currentAuthor?.odnoklassniki,
            youTube: currentAuthor?.youtube,
            vk: currentAuthor?.vk,
            telegram: currentAuthor?.telegram,
            sites: currentAuthor?.websites,
          }
        : INITIAL_VALUES,
  });
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const {fields, append, remove} = useFieldArray({
    control,
    // @ts-expect-error incorrect schema resolution in library types
    name: 'sites',
  });

  const handleSubmitForm = async (data: any) => {
    if (type === 'Edit' && !!currentAuthor) {
      const res = await dispatch(
        authorUpdate({
          id: currentAuthor.id,
          nickname: data.nik,
          description: data.about,
          odnoklassniki: data.odnoklassniki,
          telegram: data.telegram,
          vk: data.vk,
          youtube: data.youTube,
          websites: data.sites,
        }),
      );
    } else {
      await dispatch(
        authorCreate({
          nickname: data.nik,
          description: data.about,
          odnoklassniki: data.odnoklassniki,
          telegram: data.telegram,
          vk: data.vk,
          youtube: data.youTube,
          websites: data.sites,
        }),
      );
    }
    nav.goBack();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {marginTop: keyboardVisible ? 8 : 15}]}>
      <ScrollView
        style={styles.scroll_container}
        showsVerticalScrollIndicator={false}>
        <BoldText fontSize={16} mt={21}>
          Профиль
        </BoldText>

        <InputForm
          name="nik"
          placeholder="Желаемый никнейм"
          control={control}
          maxLength={16}
          mt={15}
        />

        <InputForm
          name="about"
          placeholder="Описание"
          control={control}
          mt={15}
          multiline
        />

        <BoldText fontSize={16} mt={30} mb={15}>
          Сайт(ы)
        </BoldText>

        {fields.map((field, index) => (
          <View style={styles.social_container} key={`sites[${index}]`}>
            <InputForm
              name={`sites[${index}]`}
              placeholder="Сайт"
              control={control}
              width={width - 100}
            />
            <PlusWithCircle_icon
              containerStyle={styles.social_icon}
              backgroundColor={colors.background}
              iconColor="#F6A80B"
              onPress={() => {
                if (index !== 0) {
                  remove(index); // Удаление элемента через remove
                } else {
                  append(''); // Добавление нового элемента
                }
              }}
            />
          </View>
        ))}
        <BoldText fontSize={16} mt={30}>
          Соц. сети
        </BoldText>
        <KeyboardAvoidingView>
          <View style={[styles.social_container]}>
            <InputForm
              name="vk"
              placeholder="Ссылка"
              control={control}
              width={width - 100}
            />

            <VK_Icon
              containerStyle={styles.social_icon}
              backgroundColor={colors.background}
            />
          </View>

          <View style={styles.social_container}>
            <InputForm
              name="telegram"
              placeholder="Ссылка"
              control={control}
              width={width - 100}
            />

            <Telegram_Icon
              containerStyle={styles.social_icon}
              backgroundColor={colors.background}
            />
          </View>

          <View style={styles.social_container}>
            <InputForm
              name="youTube"
              placeholder="Ссылка"
              control={control}
              width={width - 100}
            />

            <YouTube_Icon
              containerStyle={styles.social_icon}
              backgroundColor={colors.background}
            />
          </View>

          <View style={styles.social_container}>
            <InputForm
              name="odnoklassniki"
              placeholder="Ссылка"
              control={control}
              width={width - 100}
            />

            <Odnoklassniki_icon
              containerStyle={styles.social_icon}
              backgroundColor={colors.background}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Button
        title="Опубликовать"
        disabled={false}
        onPress={handleSubmit(handleSubmitForm)}
      />
    </SafeAreaView>
  );
};

export default CreateBloger;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  scroll_container: {
    marginBottom: 15,
  },

  social_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    height: 60,
  },
  social_input: {
    width: width - 100,
  },
  social_icon: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
});
