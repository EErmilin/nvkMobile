import * as React from 'react';
import {ImageBackground, RefreshControl, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import {FlashList} from '@shopify/flash-list';

import {
  FormContainer,
  BoldText,
  LiveIcon,
  Containter,
} from '../../../components';
import {RootNavigationProps} from '../../../navigation/types/RootStackTypes';
import {useTheme} from '../../../Styles/Styles';

let temp = [
  {
    title: 'Тэтим радио',
    url: 'https://icecast-saha.cdnvideo.ru/saha',
    imageUrl:
      'http://tele2nat.cdnvideo.ru/mw-lives/uploads/images/3f5/3f5be172bf8e7a2e699a6bd6934f07b34d8bf964.png',
    author: 'KitJah & Айыллаана Семенова',
    trackTitle: 'Махтанабын',
  },
];

export const RadioListScreen = (
  props: RootNavigationProps<'RadioListScreen'>,
) => {
  const {navigation} = props;
  const [data, setData] = React.useState<
    {
      title: string;
      url: string;
      imageUrl: string;
      author: string;
      trackTitle: string;
    }[]
  >([]);
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();

  const update = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setData(temp);
      }, 1500);
    } catch (e: unknown) {
      if (e instanceof Error) {
        Toast.show({
          type: 'error',
          text1: 'Ошибка',
          text2: e.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    update();
  }, []);

  return (
    <FormContainer style={{flex: 1}}>
      <FlashList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <RenderItem live navigation={navigation} item={item} />
        )}
        estimatedItemSize={200}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              update();
            }}
            colors={[colors.orange]}
            tintColor={colors.orange}
          />
        }
      />
    </FormContainer>
  );
};

const RenderItem = (props: {
  live: boolean;
  navigation: RootNavigationProps<'RadioListScreen'>['navigation'];
  item: {
    title: string;
    url: string;
    imageUrl: string;
    author: string;
    trackTitle: string;
  };
}) => {
  const {live, navigation, item} = props;
  const {colors} = useTheme();
  return (
    <Containter>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('RadioScreen', item);
        }}>
        <ImageBackground
          style={{
            backgroundColor: colors.gray,
            borderRadius: 20,
            height: 196,
          }}
          resizeMode="stretch"
          imageStyle={{borderRadius: 20, height: 196, width: '100%'}}
          source={
            item.imageUrl
              ? {uri: item.imageUrl}
              : require('../../../assets/images/emptyPost.png')
          }>
          {live ? <LiveIcon /> : <></>}
        </ImageBackground>
        <BoldText style={{marginTop: 10}}>{item.title ?? ''}</BoldText>
      </TouchableOpacity>
    </Containter>
  );
};
