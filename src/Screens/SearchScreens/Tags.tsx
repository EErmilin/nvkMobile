import * as React from 'react';
import {
  View,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
  FlatList,
  Platform,
} from 'react-native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import BoldText from '../../components/BoldText';
import {Hashtag} from '../../components/SVGcomponents/Hashtag';
import RegularText from '../../components/RegularText';
import {Containter} from '../../components/Container';
import {HASHTAG_POSTS} from '../../gql/query/HashTags';
import {calculateEndWord} from '../../helpers/calculateEndWord';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
import {getUpdateClient} from '../../requests/updateHeaders';
import {useTheme} from '../../Styles/Styles';
import {MusicPlayerContext} from '../../contexts/musicContext';
import {useAppSelector} from '../../redux/hooks';
import DeviceInfo from 'react-native-device-info';

interface IProps {
  search: string;
  activeScreen: number;
  navigation: TabNavigationProps<'Search'>['navigation'];
}

const getSortData = (data: ITag[]) => {
  let temp = [...data];
  return temp.sort(function (a, b) {
    return b.posts!.length - a.posts!.length;
  });
};

interface ITag {
  id: number;
  name: string;
  posts: {postId: number}[];
}

const Skeleton = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const {colors} = useTheme();
  const length = Math.ceil(screenHeight / 44);

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
            <Circle
              key={index.toString() + 'circle'}
              r={'12'}
              x="12"
              y={32 + 44 * index}
            />
            <Rect
              key={index.toString() + 'text'}
              width={(screenWidth - 30 - 24 - 30 - 90).toString()}
              height={'24'}
              x="39"
              y={index * 44 + 20}
              rx="8"
              ry="8"
            />
            <Rect
              key={index.toString() + 'author'}
              width={'90'}
              height={'24'}
              x={(screenWidth - 30 - 90).toString()}
              y={index * 44 + 20}
              rx="8"
              ry="8"
            />
          </>
        ))}
    </ContentLoader>
  );
};

export const Tags = (props: IProps) => {
  const {search, activeScreen, navigation} = props;
  const screenHeight = useWindowDimensions().height;
  const [data, setData] = React.useState<ITag[]>([]);
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();
  const user = useAppSelector(state => state.user.data);

  const refresh = React.useCallback(async () => {
    if (activeScreen === 1) {
      setLoading(true);
      let client = await getUpdateClient();
      const response = await client.query({
        query: HASHTAG_POSTS,
        variables: {
          search: search,
        },
      });
      if (response.data) {
        setData(response.data.hashtags);
      }
      AppMetrica.reportEvent('SEARCH_TAGS', {
        user: user,
        search_tags: search,
        date: new Date(),
        date_string: new Date().toString(),
        platform: Platform.OS,
        device_id: !user ? DeviceInfo.getDeviceId() : undefined,
        app_version: DeviceInfo.getVersion(),
      });
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScreen, search]);

  React.useEffect(() => {
    refresh();
  }, [search, refresh]);

  return (
    <View
      style={{flex: 1, backgroundColor: colors.bgSecondary, marginBottom: 50}}>
      <Containter
        style={{
          flex: 1,
          backgroundColor: colors.bgSecondary,
          paddingTop: 0,
          paddingBottom: 0,
        }}>
        <FlatList
          data={getSortData(data)}
          style={{paddingTop: 10}}
          contentContainerStyle={{paddingTop: 20}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <RenderItem
              item={item}
              navigation={navigation}
              length={getSortData(data).length}
              index={index}
            />
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              colors={[colors.colorMain]}
              tintColor={colors.colorMain}
              onRefresh={() => refresh()}
            />
          }
          ListEmptyComponent={
            loading && data.length === 0 ? (
              <Skeleton />
            ) : (
              <View
                style={{
                  flex: 1,
                  height: screenHeight - 190,
                  justifyContent: 'center',
                }}>
                <RegularText
                  fontSize={16}
                  style={{textAlign: 'center', color: colors.textSecondary}}>
                  По вашему запросу, ничего не найдено
                </RegularText>
              </View>
            )
          }
        />
      </Containter>
    </View>
  );
};

const RenderItem = ({
  item,
  navigation,
  length,
  index,
}: {
  item: ITag;
  navigation: TabNavigationProps<'Search'>['navigation'];
  length: number;
  index: number;
}) => {
  const {colors} = useTheme();
  const musicContext = React.useContext(MusicPlayerContext);

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:
          index === length - 1
            ? musicContext.musicPlayerOption.music !== null
              ? 100
              : 50
            : 20,
      }}
      onPress={() => {
        navigation.navigate('ViewTag', {id: item.id, name: item.name});
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Hashtag color={colors.bgSecondary} />
        <BoldText style={{marginLeft: 15}}>{item.name}</BoldText>
      </View>
      <RegularText fontSize={12}>
        {item.posts ? item.posts.length : '0'}{' '}
        {calculateEndWord(item.posts ? item.posts.length : 0)}
      </RegularText>
    </TouchableOpacity>
  );
};
