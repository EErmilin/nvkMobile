import * as React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {
  TabView,
  SceneMap,
  SceneRendererProps,
  NavigationState,
  Route,
  TabBar,
  TabBarIndicator,
} from 'react-native-tab-view';
import Toast from 'react-native-toast-message';

import {BoldText} from '../../../components';
import {RootNavigationProps} from '../../../navigation/types/RootStackTypes';
import {useTheme} from '../../../Styles/Styles';
import {Announcement} from './TabViewScreens/Announcement';
import {Services} from './TabViewScreens/Services';
import {ApolloError} from '@apollo/client';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {QUERY_SERVICES} from '../../../gql/query/services/Query';

interface IRenderTabBarProps extends SceneRendererProps {
  navigationState: NavigationState<Route>;
}

export const ServicesScreen = (
  props: RootNavigationProps<'ServicesScreen'>,
) => {
  const {navigation} = props;
  const screenWidth = useWindowDimensions().width;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'Services',
      title: 'Услуги',
    },
    {
      key: 'Announcement',
      title: 'Заявка на рекламу',
    },
  ]);
  const {colors} = useTheme();

  const [data, setData] = React.useState({
    ads: [],
    coupons: [],
    services: [],
  });
  const [loading, setLoading] = React.useState(false);

  const update = async () => {
    try {
      setLoading(true);
      let client = await getUpdateClient();
      let response = await client.query({
        query: QUERY_SERVICES,
      });
      setData(response.data);
    } catch (e: unknown) {
      if (e instanceof ApolloError) {
        Toast.show({
          type: 'error',
          text1: 'Ошибка',
          text2: 'Ошибка при получении данных',
        });
        console.log('e', e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    update();
  }, []);

  const renderScene = SceneMap({
    Services: React.useCallback(
      () => (
        <Services
          navigation={navigation}
          services={data.services}
          update={update}
          loading={loading}
        />
      ),
      [data.services, loading, navigation],
    ),
    Announcement: React.useCallback(
      () => (
        <Announcement
          navigation={navigation}
          announcements={data.ads}
          update={update}
          loading={loading}
        />
      ),
      [data.ads, loading, navigation],
    ),
  });

  const renderTabBar = (tabBarProps: IRenderTabBarProps) => {
    return (
      <TabBar
        {...tabBarProps}
        activeColor={colors.colorMain}
        style={{
          backgroundColor: colors.fillPrimary,
          elevation: 0,
          shadowOffset: {height: 0, width: 0},
          shadowColor: 'transparent',
          shadowOpacity: 0,
          paddingHorizontal: 15,
        }}
        inactiveColor={colors.textSecondary}
        gap={0}
        tabStyle={{
          width: 'auto',
        }}
        scrollEnabled
        pressColor="transparent"
        renderLabel={({route, focused}) => (
          <BoldText
            style={{color: focused ? colors.colorMain : colors.textSecondary}}>
            {route.title}
          </BoldText>
        )}
        renderIndicator={indicatorProps => {
          const width = indicatorProps.getTabWidth(index!);
          return (
            <TabBarIndicator
              {...indicatorProps}
              width={width}
              style={{
                marginLeft: 15,
                bottom: -1.5,
                backgroundColor: indicatorProps
                  ? colors.colorMain
                  : colors.textSecondary,
                height: 3,
                borderRadius: 3,
              }}
            />
          );
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgSecondary,
        // paddingHorizontal: 15,
      }}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: screenWidth}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};
