import * as React from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import {Containter} from '../../components/Container';
import {Hashtag} from '../../components/SVGcomponents/Hashtag';
import MediumText from '../../components/MediumText';
import {calculateEndWord} from '../../helpers/calculateEndWord';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {updateUser} from '../../redux/thunks/user/UpdateUser';
import {useTheme} from '../../Styles/Styles';
import {setLogged} from '../../redux/slices/authSlice';
import {getUpdateClient} from '../../requests/updateHeaders';
import {HASHTAG} from '../../gql/query/HashTags';
import {IPost} from '../../models/Post';
import {RegularText} from '../../components';
import DeviceInfo from 'react-native-device-info';
import {PostCell} from '../../components/PostCell';

const Skeleton = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const {colors} = useTheme();
  const length = Math.ceil((screenHeight - 60 - 98) / ((screenWidth - 2) / 3));

  return (
    <ContentLoader
      width={screenWidth}
      height={length * ((screenWidth - 2) / 3)}
      backgroundColor={colors.skeletonBg}
      foregroundColor={colors.skeletonFg}>
      {Array(length)
        .fill(0)
        .map((item, index) => (
          <>
            <Rect
              key={index.toString() + '_left'}
              width={(screenWidth - 2) / 3}
              height={(screenWidth - 2) / 3}
              x={0}
              y={index * ((screenWidth - 2) / 3 + 1)}
            />
            <Rect
              key={index.toString() + '_center'}
              width={(screenWidth - 2) / 3}
              height={(screenWidth - 2) / 3}
              x={(screenWidth - 2) / 3 + 1}
              y={index * ((screenWidth - 2) / 3 + 1)}
            />
            <Rect
              key={index.toString() + '_right'}
              width={(screenWidth - 2) / 3}
              height={(screenWidth - 2) / 3}
              x={(2 * (screenWidth - 2)) / 3 + 2}
              y={index * ((screenWidth - 2) / 3 + 1)}
            />
          </>
        ))}
    </ContentLoader>
  );
};

const SkeletonPostLength = () => {
  const {colors} = useTheme();
  return (
    <ContentLoader
      style={{marginTop: 15}}
      height={24}
      width={100}
      backgroundColor={colors.skeletonBg}
      foregroundColor={colors.skeletonFg}>
      <Rect width={100} height={24} rx={8} ry={8} />
    </ContentLoader>
  );
};

export const ViewTag = (props: RootNavigationProps<'ViewTag'>) => {
  const {route, navigation} = props;
  const {id, name} = route.params;
  const screenHeight = useWindowDimensions().height;
  const hashtags = useAppSelector(state => state.user.data?.hashtags) ?? [];
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const {colors, theme} = useTheme();
  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.user.data);

  const [data, setData] = React.useState<IPost[]>([]);

  const update = React.useCallback(async () => {
    try {
      setLoading(true);
      let client = await getUpdateClient();
      let response = await client.query({
        query: HASHTAG,
        variables: {
          hashtagId: id,
        },
      });
      AppMetrica.reportEvent('VIEW_TAG', {
        user: user,
        date: new Date(),
        date_string: new Date().toString(),
        platform: Platform.OS,
        tag_name: name,
        device_id: !user ? DeviceInfo.getDeviceId() : undefined,
        app_version: DeviceInfo.getVersion(),
      });
      setData(
        response.data.hashtag.posts.map((item: {post: IPost}) => item.post),
      );
    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  React.useEffect(() => {
    update();
  }, [update]);

  return (
    <View style={{flex: 1, backgroundColor: colors.bgSecondary}}>
      <Containter style={{height: 98}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Hashtag color={colors.bgSecondary} />
            <MediumText
              style={{
                marginLeft: 15,
                paddingBottom: Platform.OS === 'android' ? 3 : 0,
                textAlignVertical: 'center',
              }}
              fontSize={14}>
              {name}
            </MediumText>
          </View>

          <TouchableOpacity
            style={[
              styles.touchHashtag,
              {
                borderColor: hashtags
                  .map(hashtag => hashtag.hashtag.name)
                  .includes(name)
                  ? colors.colorMain
                  : colors.bgSecondary,
                backgroundColor: hashtags
                  .map(hashtag => hashtag.hashtag.name)
                  .includes(name)
                  ? colors.bgSecondary
                  : colors.colorMain,
              },
            ]}
            onPress={async () => {
              if (token) {
                if (
                  hashtags.map(hashtag => hashtag.hashtag.name).includes(name)
                ) {
                  setLoading(true);
                  await dispatch(
                    updateUser({
                      hashtags: hashtags
                        .map(hashtag => {
                          return {name: hashtag.hashtag.name};
                        })
                        .filter(hashtag => hashtag.name !== name),
                    }),
                  );
                  setLoading(false);
                } else {
                  setLoading(true);
                  await dispatch(
                    updateUser({
                      hashtags: hashtags
                        .map(hashtag => {
                          return {name: hashtag.hashtag.name};
                        })
                        .concat({name: name}),
                    }),
                  );
                  setLoading(false);
                }
              } else {
                dispatch(setLogged(false));
              }
            }}>
            {loading ? (
              <ActivityIndicator
                color={
                  hashtags.map(hashtag => hashtag.hashtag.name).includes(name)
                    ? colors.colorMain
                    : colors.white
                }
                size="small"
              />
            ) : (
              <MediumText
                style={{
                  color: hashtags
                    .map(hashtag => hashtag.hashtag.name)
                    .includes(name)
                    ? colors.colorMain
                    : theme === 'dark'
                    ? colors.black
                    : colors.white,
                  lineHeight: 20,
                }}>
                {hashtags.map(hashtag => hashtag.hashtag.name).includes(name)
                  ? 'Отписаться'
                  : 'Подписаться'}
              </MediumText>
            )}
          </TouchableOpacity>
        </View>
        {loading && data.length === 0 ? (
          <SkeletonPostLength />
        ) : (
          <MediumText
            style={{
              marginTop: 15,
              paddingBottom: Platform.OS === 'android' ? 3 : 0,
            }}
            fontSize={12}>
            {data ? data.length : '0'}{' '}
            {calculateEndWord(data ? data.length : 0)}
          </MediumText>
        )}
      </Containter>
      <FlatList
        style={{marginTop: 20}}
        data={data}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={item1 => item1.id.toString()}
        renderItem={({item: post, index}) => (
          <TouchableOpacity
            activeOpacity={0.3}
            style={{
              marginLeft: index % 3 === 0 ? 0 : 0.5,
              marginRight: index % 3 === 2 ? 0 : 0.5,
              marginTop: 0.5,
              marginBottom: index % 3 === 2 ? 0 : 0.5,
            }}
            onPress={() => {
              navigation.push('NewsView', {post: post});
            }}>
            <PostCell post={post} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          loading && data.length === 0 ? (
            <Skeleton />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                height: screenHeight - 60 - 98,
                justifyContent: 'center',
              }}>
              <RegularText fontSize={16} style={{color: colors.textSecondary}}>
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
  touchHashtag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    minWidth: 120,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
