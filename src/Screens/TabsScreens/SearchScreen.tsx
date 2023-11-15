import * as React from 'react';
import {
  SafeAreaView,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from 'react-native';
import {
  TabView,
  TabBar,
  SceneRendererProps,
  NavigationState,
  Route,
} from 'react-native-tab-view';

import {
  BoldText,
  Containter,
  MediumText,
  SearchComponent,
} from '../../components';
import {Clock, Close} from '../../components/SVGcomponents';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  addListSearch,
  removeItemListSearch,
} from '../../redux/slices/userSlice';
import {useTheme} from '../../Styles/Styles';
import {Posts} from '../SearchScreens/Posts';
import {Tags} from '../SearchScreens/Tags';
import {Media} from '../SearchScreens/Media';

interface IRenderSceneProps extends SceneRendererProps {
  route: Route;
}

export const SearchScreen: React.FC<TabNavigationProps<'Search'>> = ({
  route,
  navigation,
}) => {
  const {page, searchValue} = route.params;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(page ?? 0);
  const [routes] = React.useState([
    {key: 'first', title: 'Посты'},
    {key: 'second', title: 'Хэштеги'},
    {key: 'third', title: 'Медиа'},
  ]);
  const [search, setSearch] = React.useState(searchValue ?? '');
  const listSearch = useAppSelector(state => state.user.listSearch);
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const screenWidth = useWindowDimensions().width;

  React.useEffect(() => {
    setIndex(page ?? 0);
    setSearch(searchValue ?? '');
  }, [page, searchValue]);

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
      black: string;
      orange: string;
      gray: string;
      color: string;
      background: string;
    },
  ) => {
    return (
      <TabBar
        scrollEnabled={false}
        {...props}
        indicatorStyle={{
          backgroundColor: colors.colorMain,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        }}
        renderLabel={({route: route1, focused}) => (
          <BoldText
            numberOfLines={1}
            fontSize={14}
            style={{
              color: focused ? colors.colorMain : props.gray,
              textAlign: 'center',
              width: screenWidth / 2,
            }}>
            {route1.title ?? ''}
          </BoldText>
        )}
        style={{
          backgroundColor: props.background,
        }}
        indicatorContainerStyle={{
          width: screenWidth * 0.6,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: (screenWidth * 0.4) / 4,
        }}
      />
    );
  };

  const renderScene = ({route: renderRoute}: IRenderSceneProps) => {
    switch (renderRoute.key) {
      case 'first':
        return (
          <Posts
            key={'PostScreen'}
            search={search}
            activeScreen={index}
            navigation={navigation}
          />
        );
      case 'second':
        return (
          <Tags
            key={'TagsScreen'}
            search={search}
            activeScreen={index}
            navigation={navigation}
          />
        );
      case 'third':
        return (
          <Media
            key={'MediaScreen'}
            search={search}
            activeScreen={index}
            navigation={navigation}
          />
        );
    }
  };

  const [showList, setShowList] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowList(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowList(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.fillPrimary}}>
      <SafeAreaView />
      <SafeAreaView style={{flex: 1, backgroundColor: colors.bgSecondary}}>
        <View
          style={{
            alignSelf: 'stretch',
            height: 70,
            backgroundColor: colors.fillPrimary,
            paddingHorizontal: 15,
            justifyContent: 'center',
          }}>
          <SearchComponent
            value={search}
            onChangeText={value => setSearch(value)}
            placeholder={'Поиск'}
            onEndEditing={() => {
              if (search.trim() !== '') {
                dispatch(addListSearch(search));
              }
            }}
          />
        </View>
        {showList ? (
          <Containter style={{flex: 1}}>
            <FlatList
              data={listSearch}
              keyboardShouldPersistTaps="always"
              keyExtractor={item => item.toString()}
              style={{}}
              contentContainerStyle={{
                flex: listSearch.length > 0 ? 0 : 1,
                paddingBottom: 120,
              }}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 25,
                  }}
                  onPress={() => {
                    setSearch(item);
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Clock />
                    <MediumText style={{marginLeft: 15}} fontSize={16}>
                      {item}
                    </MediumText>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(removeItemListSearch(item));
                    }}>
                    <Close />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 50,
                  }}
                />
              }
            />
          </Containter>
        ) : (
          <>
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              renderTabBar={propsTabBar =>
                renderTabBar(
                  // @ts-ignore
                  Object.assign(propsTabBar, {
                    black: colors.black,
                    orange: colors.colorMain,
                    gray: colors.textSecondary,
                    color: colors.textPrimary,
                    background: colors.bgSecondary,
                  }),
                )
              }
              onIndexChange={setIndex}
              initialLayout={{width: layout.width}}
            />
          </>
        )}
      </SafeAreaView>
    </View>
  );
};
