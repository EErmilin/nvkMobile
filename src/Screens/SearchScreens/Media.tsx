import * as React from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl,
  FlatList,
  Platform,
  Image,
  StyleSheet,
  Dimensions,
  SectionList,
  Text,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {ApolloError} from '@apollo/client';
import ContentLoader, {Rect} from 'react-content-loader/native';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import RegularText from '../../components/RegularText';
import {IPost} from '../../models/Post';
import {POSTS} from '../../gql/query/posts/Post';
import {getUpdateClient} from '../../requests/updateHeaders';
import {useTheme} from '../../Styles/Styles';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
import {MusicPlayerContext} from '../../contexts/musicContext';
import {useAppSelector} from '../../redux/hooks';
import DeviceInfo from 'react-native-device-info';
import {PostCell} from '../../components/PostCell';
import {GET_MOVIES} from '../../gql/query/films/films';
import {BoldText} from '../../components';
import {IMedia} from '../../models/Media';
import {SEARCH_MEDIA} from '../../gql/query/search/search';

const Skeleton = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const {colors} = useTheme();
  const length = Math.ceil(screenHeight / (screenWidth / 3 - 2));

  return (
    <ContentLoader
      width={screenWidth.toString()}
      height={screenHeight - 120}
      backgroundColor={colors.skeletonBg}
      foregroundColor={colors.skeletonFg}>
      {Array(length)
        .fill(0)
        .map((item, index) => (
          <>
            <Rect
              key={index.toString() + 'image_left'}
              width={screenWidth / 3 - 2}
              height={screenWidth / 3 - 2}
              x={0}
              y={index * (screenWidth / 3)}
            />
            <Rect
              key={index.toString() + 'image_center'}
              width={screenWidth / 3 - 2}
              height={screenWidth / 3 - 2}
              x={screenWidth / 3}
              y={index * (screenWidth / 3)}
            />
            <Rect
              key={index.toString() + 'image_right'}
              width={screenWidth / 3 - 2}
              height={screenWidth / 3 - 2}
              x={(2 * screenWidth) / 3}
              y={index * (screenWidth / 3)}
            />
          </>
        ))}
    </ContentLoader>
  );
};

interface IProps {
  search: string;
  activeScreen: number;
  navigation: any; //TabNavigationProps<'Search'>['navigation'];
}

type SectionMedia = {
  title: string;
  data: any[];
};

export const Media = (props: IProps) => {
  const dimention = Dimensions.get('screen');
  const {navigation, search, activeScreen} = props;
  const screenHeight = useWindowDimensions().height;
  const [posts, setPosts] = React.useState<IMedia[]>([]);
  const [medias, setMedias] = React.useState<SectionMedia[]>([]);
  const screenWidth = useWindowDimensions().width;
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();
  const user = useAppSelector(state => state.user.data);

  const refresh = React.useCallback(async () => {
    if (activeScreen === 2) {
      try {
        setLoading(true);
        const client = await getUpdateClient();
        let response = await client.query({
          query: SEARCH_MEDIA,
          variables: {
            search: search,
            take: 20,
          },
        });

        const data: SectionMedia[] = [
          {
            title: 'Фильмы',
            data: response.data.movies ?? [],
          },
          {
            title: 'Мультики',
            data: response.data.animations ?? [],
          },
          {
            title: 'Сериалы',
            data: response.data.serials ?? [],
          },
        ];

        console.log(response.data);
        // setPosts(response.data.animations);
        setMedias(data);
      } catch (e) {
        console.log(e);
        if (e instanceof ApolloError) {
          Toast.show({
            type: 'error',
            text1: 'Ошибка',
            text2: 'Ошибка при поиске постов',
          });
        }
      } finally {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScreen, search]);

  React.useEffect(() => {
    refresh();
  }, [refresh, search]);

  return (
    <View style={{flex: 1, backgroundColor: colors.bgSecondary}}>
      <SectionList
        data={posts}
        // numColumns={2}
        sections={medias}
        style={{paddingTop: 20, marginHorizontal: 15, marginBottom: 75}}
        // contentContainerStyle={{
        //   flex: !!posts?.length && posts.length > 0 ? 0 : 1,
        //   flexGrow: 1,
        // }}
        // columnWrapperStyle={{
        //   justifyContent: 'space-between',
        //   marginBottom: 20,
        // }}
        keyExtractor={(item, index) => item + `${index}`}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({section}) => {
          if (!section.data.length) return null;
          return (
            <BoldText fontSize={20} style={{marginBottom: 20}}>
              {section.title}
            </BoldText>
          );
        }}
        renderItem={({item, index, section}) => {
          if (index !== 0) return null;
          return (
            <FlatList
              keyExtractor={(item, index) => item.id}
              numColumns={2}
              data={section.data}
              contentContainerStyle={{
                flex: !!posts?.length && posts.length > 0 ? 0 : 1,
                flexGrow: 1,
              }}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
              renderItem={({item}) => {
                return (
                  <View key={index.toString()}>
                    <TouchableOpacity
                      onPress={() => {
                        //navigation.navigate('BroadcastView', {broadcast: item})
                      }}
                      style={{
                        width: (dimention.width - 45) / 2,
                      }}>
                      <Image
                        style={styles.image}
                        source={{uri: item.image?.url_512 ?? undefined}}
                      />
                      <BoldText>{item.name ?? ''}</BoldText>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          );
        }}
        refreshControl={
          <RefreshControl
            colors={[colors.colorMain]}
            tintColor={colors.colorMain}
            refreshing={loading}
            onRefresh={() => refresh()}
          />
        }
        ListEmptyComponent={
          loading && posts.length === 0 ? (
            <Skeleton />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                height: screenHeight - 190,
              }}>
              <RegularText
                fontSize={16}
                style={{color: colors.textSecondary, textAlign: 'center'}}>
                По вашему запросу, ничего не найдено
              </RegularText>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: 110,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: '#eee',
  },
  search: {
    marginTop: 15,
    marginBottom: 20,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
