import * as React from 'react';
import {useWindowDimensions} from 'react-native';
import {
  NavigationState,
  Route,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import {useTheme} from '../../../../Styles/Styles';
import {getWeekDay} from '../../../../helpers/getWeekDay';
import {useApolloClient} from '@apollo/client';
import {RADIO} from '../../../../gql/query/radios/Radio';
import MediumText from '../../../../components/MediumText';
import {ProgramView} from './ProgramView';
import {IProgram} from '../../../../models/Program';
import {TabBarIndicator} from '../../../../components/TabBarIndicator';

interface IRenderTabBarProps extends SceneRendererProps {
  navigationState: NavigationState<Route>;
}

export const RadioProgram: React.FC = () => {
  const client = useApolloClient();
  const [data, setData] = React.useState<IProgram[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const {colors} = useTheme();
  const screenWidth = useWindowDimensions().width;
  const dates = [0, 1, 2, 3, 4, 5, 6].map(item => {
    return {
      date: new Date(new Date().getTime() + item * 1000 * 60 * 60 * 24),
    };
  });
  const [temp, setTemp] = React.useState(0);
  const [routes] = React.useState(
    dates.map((item, index1) => {
      return {
        key: item.date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
        }),
        date: item.date,
        title:
          index1 === 0
            ? 'Cегодня, ' +
              item.date.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
              })
            : index1 === 1
            ? 'Завтра, ' +
              item.date.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
              })
            : getWeekDay(item.date.getDay()) +
              ', ' +
              item.date.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
              }),
      };
    }),
  );

  const update = React.useCallback(async () => {
    try {
      setLoading(true);
      let response = await client.query({
        query: RADIO,
        variables: {
          radioId: 1,
        },
      });
      setData(response.data.radio.programs);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [client]);

  React.useEffect(() => {
    update();
  }, [update]);

  const renderTabBar = (tabBarProps: IRenderTabBarProps) => {
    return (
      <TabBar
        {...tabBarProps}
        activeColor={colors.colorMain}
        style={{backgroundColor: colors.bgRadio}}
        contentContainerStyle={{backgroundColor: colors.bgRadio}}
        inactiveColor={colors.textSecondary}
        scrollEnabled
        pressColor="transparent"
        tabStyle={{
          width: 'auto',
          backgroundColor: colors.bgRadio,
        }}
        gap={7.5}
        renderLabel={({route: routeLabel, focused}) => (
          <MediumText
            fontSize={14}
            style={{
              fontWeight: '600',
              textAlign: 'center',
              color: focused ? colors.colorMain : colors.textSecondary,
            }}>
            {routeLabel.title}
          </MediumText>
        )}
        onTabPress={e => {
          setTemp(routes.findIndex(s => s === e.route));
        }}
        renderIndicator={indicatoProps => {
          return (
            <TabBarIndicator
              {...indicatoProps}
              style={{
                bottom: -1.5,
                backgroundColor: colors.colorMain,
                height: 3,
                borderRadius: 3,
              }}
              index2={temp}
            />
          );
        }}
      />
    );
  };

  const renderScene = SceneMap(
    routes.reduce((accumulator, value) => {
      return {
        ...accumulator,
        [value.key]: () => (
          <ProgramView
            loading={loading}
            data={data.filter(
              item =>
                new Date(item.date + 'T' + item.startTime).toLocaleDateString(
                  'ru-RU',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  },
                ) ===
                value.date.toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }),
            )}
            update={() => {}}
          />
        ),
      };
    }, {}),
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: screenWidth}}
      renderTabBar={renderTabBar}
      onSwipeEnd={() => {
        setTemp(index);
      }}
      sceneContainerStyle={{flex: 1, backgroundColor: colors.bgRadio}}
      style={{flex: 1, backgroundColor: colors.bgRadio}}
    />
  );
};
