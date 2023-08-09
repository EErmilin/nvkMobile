import * as React from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useTheme} from '../../../Styles/Styles';
import {RootNavigationProps} from '../../../navigation/types/RootStackTypes';
import {SearchComponent} from '../../../components/SearchComponent';
import BoldText from '../../../components/BoldText';

import {getBroadcasts} from '../../../redux/thunks/screens/broadcasts/GetBroadcasts';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {MediumText} from '../../../components';

export const Broadcasts: React.FC<RootNavigationProps<'Broadcasts'>> = ({
  navigation,
}) => {
  const dimention = Dimensions.get('screen');
  const {colors, Style} = useTheme();
  const dispatch = useAppDispatch();
  const broadcastsRedux = useAppSelector(state => state.screens.broadcasts);
  const [loading, setLoading] = React.useState(false);
  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const update = React.useCallback(async () => {
    setLoadingSearch(true);
    await dispatch(getBroadcasts({search: search}));
    setLoadingSearch(false);
  }, [dispatch, search]);

  React.useEffect(() => {
    (async () => {
      await update();
    })();
  }, [update]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgSecondary,
        },
      ]}>
      <FlatList
        data={broadcastsRedux}
        keyboardShouldPersistTaps={'always'}
        refreshControl={
          <RefreshControl
            colors={[colors.colorMain]}
            tintColor={colors.colorMain}
            refreshing={loading}
            onRefresh={async () => {
              try {
                setLoading(true);
                await update();
              } catch (e) {
                console.log(e);
              } finally {
                setLoading(false);
              }
            }}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        stickyHeaderIndices={[0]}
        contentContainerStyle={[Style.marginHorizontal, {paddingBottom: 20}]}
        columnWrapperStyle={styles.columnWrapperStyle}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SearchComponent
            style={styles.search}
            containerStyle={{backgroundColor: colors.fillPrimary}}
            value={search}
            onChangeText={text => {
              setSearch(text);
            }}
            placeholder={'Поиск'}
          />
        }
        ListEmptyComponent={
          <View>
            {loadingSearch ? (
              <Skeleton />
            ) : (
              <MediumText style={{color: colors.textSecondary}}>
                По вашему запросу ничего не найдено
              </MediumText>
            )}
          </View>
        }
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BroadcastView', {broadcast: item})
              }
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
        )}
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

const Skeleton = () => {
  const {width, height} = useWindowDimensions();
  const length = Math.ceil((height - 150) / 184);
  const {colors} = useTheme();
  return (
    <ContentLoader
      width={'100%'}
      height={(height - 120 - 30).toString()}
      backgroundColor={colors.skeletonBg}
      foregroundColor={colors.skeletonFg}>
      {Array(length)
        .fill(0)
        .map((item, index) => (
          <>
            <Rect
              key={index.toString() + 'image_left'}
              x="0"
              y={((110 + 10 + 24 + 20) * index).toString()}
              rx="15"
              ry="15"
              width={((width - 45) / 2).toString()}
              height={'110'}
            />
            <Rect
              key={index.toString() + 'text_left'}
              x={'0'}
              y={((110 + 10 + 24 + 20) * index + 110 + 10).toString()}
              rx="8"
              ry="8"
              height={24}
              width={((width - 45) / 2).toString()}
            />
            <Rect
              key={index.toString() + 'image_right'}
              x={((width - 45) / 2 + 15).toString()}
              y={((110 + 10 + 24 + 20) * index).toString()}
              rx="15"
              ry="15"
              width={((width - 45) / 2).toString()}
              height="110"
            />
            <Rect
              key={index.toString() + 'text_right'}
              x={((width - 45) / 2 + 15).toString()}
              y={((110 + 10 + 24 + 20) * index + 110 + 10).toString()}
              rx="8"
              ry="8"
              height={24}
              width={((width - 45) / 2).toString()}
            />
          </>
        ))}
    </ContentLoader>
  );
};
