import * as React from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {BoldText} from '../../components';
import {useTheme} from '../../Styles/Styles';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {IPost} from '../../models/Post';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
import {removeFavorite} from '../../redux/thunks/favorite/RemoveFavorite';

import ContentLoader, {Rect} from 'react-content-loader/native';
import {MusicPlayerContext} from '../../contexts/musicContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PostCell} from '../../components/PostCell';
import {useQuery} from '@apollo/client';
import {POSTS} from '../../gql/query/posts/Post';

interface IProps {
  navigation: TabNavigationProps<'Favorite'>['navigation'];
}

export const FavoritePost = (props: IProps) => {
  const {navigation} = props;
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const userId = useAppSelector(state => state.user.data?.id);

  const {colors} = useTheme();
  const {data, loading, refetch} = useQuery(POSTS, {
    skip: !userId,
    variables: {
      orderBy: {createdAt: 'desc'},
      skip: 0,
      take: 100000,
      where: {
        favorites: {
          some: {
            userId,
          },
        },
      },
    },
  });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

  const favoritePost = data?.posts || [];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgSecondary,
      }}>
      <FlatList
        data={favoritePost}
        contentContainerStyle={{
          flex: favoritePost.length === 0 ? 1 : 0,
        }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({item, index}) => (
          <RenderItem
            key={item.id.toString()}
            item={item}
            id={item.id}
            index={index}
            navigation={navigation}
            size={(screenWidth - 2) / 3}
            length={favoritePost.length}
          />
        )}
        ListEmptyComponent={
          loading ? (
            <View key={'view_null'} style={{flex: 1}}>
              <ContentLoader
                width={screenWidth.toString()}
                height={(screenHeight - 100).toString()}
                x={0}
                y={0}
                backgroundColor={colors.skeletonBg}
                foregroundColor={colors.skeletonFg}>
                {Array(
                  Math.ceil((screenHeight - 100) / ((screenWidth - 2) / 3 - 2)),
                )
                  .fill(0)
                  .map((item, index) => (
                    <>
                      <Rect
                        key={index.toString() + '_left'}
                        x={'0'}
                        y={(((screenWidth - 2) / 3) * index).toString()}
                        width={((screenWidth - 2) / 3 - 2).toString()}
                        height={((screenWidth - 2) / 3 - 2).toString()}
                      />
                      <Rect
                        key={index.toString() + '_center'}
                        x={((screenWidth - 2) / 3).toString()}
                        y={(((screenWidth - 2) / 3) * index).toString()}
                        width={((screenWidth - 2) / 3 - 2).toString()}
                        height={((screenWidth - 2) / 3 - 2).toString()}
                      />
                      <Rect
                        key={index.toString() + '_right'}
                        x={((2 * (screenWidth - 2)) / 3).toString()}
                        y={(((screenWidth - 2) / 3) * index).toString()}
                        width={((screenWidth - 2) / 3 - 2).toString()}
                        height={((screenWidth - 2) / 3 - 2).toString()}
                      />
                    </>
                  ))}
              </ContentLoader>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: screenHeight - 150,
              }}>
              <BoldText style={{color: colors.textSecondary}}>
                У вас нет избранных постов
              </BoldText>
            </View>
          )
        }
      />
    </View>
  );
};

const RenderItem = ({
  item,
  index,
  navigation,
  id,
  size,
  length,
}: {
  item: IPost | null;
  index: number;
  id: number;
  navigation: TabNavigationProps<'Favorite'>['navigation'];
  size: number;
  length: number;
}) => {
  const dispatch = useAppDispatch();
  const [likeIsDisabled, setLikeIsDisabled] = React.useState(false);
  const musicContext = React.useContext(MusicPlayerContext);
  const insets = useSafeAreaInsets();
  const getPaddingBottom = () => {
    return musicContext.musicPlayerOption.music
      ? 70 + 55 + insets.bottom
      : 70 + insets.bottom;
  };

  return (
    <TouchableOpacity
      key={item?.id.toString() + '_touch'}
      activeOpacity={0.5}
      style={{
        width: size,
        height: size,
        marginLeft: index % 3 === 0 ? 0 : 0.5,
        marginRight: index % 3 === 2 ? 0 : 0.5,
        marginTop: 0.5,
        marginBottom: index === length - 1 ? getPaddingBottom() : 0.5,
      }}
      disabled={likeIsDisabled}
      onPress={() => {
        if (item) {
          navigation.navigate('NewsView', {post: item});
        }
        console.log(item);
      }}
      onLongPress={async () => {
        setLikeIsDisabled(true);
        await dispatch(removeFavorite(id));
        setLikeIsDisabled(false);
      }}>
      <PostCell post={item} />
    </TouchableOpacity>
  );
};
