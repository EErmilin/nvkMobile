import * as React from 'react';
import {
  Animated,
  SafeAreaView,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {themeColors, useTheme} from '../../../../Styles/Styles';
import {getWeekDay} from '../../../../helpers/getWeekDay';
import {BoldText} from '../../../../components';
import {I18nManager} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from '../../../../components/SVGcomponents';
import {useApolloClient} from '@apollo/client';
import {RADIO_PROGRAM} from '../../../../gql/query/radios/Radio';
import {ProgramView} from './ProgramView';
import {getProgramsForDate2} from '../../../../helpers/getProgramsForDate';

const Tab = createMaterialTopTabNavigator();

const getStartDate = () => {
  let now = new Date();
  now.setDate(now.getDate() - 1);
  let date = now.toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  let start = new Date(`${date}T21:00:01.000Z`);
  return start;
};

export const RadioProgramTopNavigator = () => {
  const {colors} = useTheme();
  const dates = [0, 1, 2, 3, 4, 5, 6].map(item => {
    return {
      date: new Date(getStartDate().getTime() + item * 1000 * 60 * 60 * 24),
    };
  });
  const routes = dates.map((item, index1) => {
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
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bgRadio}}>
      <Header />
      <Tab.Navigator
        screenOptions={({navigation}) => ({
          tabBarStyle: {
            backgroundColor: colors.bgRadio,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: 'none',
          },
          tabBarItemStyle: {
            width: 'auto',
            paddingHorizontal: 0,
          },
          tabBarIndicatorContainerStyle: {
            height: 50,
          },
          tabBarActiveTintColor: colors.colorMain,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: {
            backgroundColor: colors.colorMain,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            height: 3,
          },
          tabBarIndicator: props => (
            <TabBarIndicator {...props} navigation={navigation} />
          ),
        })}>
        {routes.map(item => (
          <Tab.Screen
            key={item.title}
            name={item.title}
            component={Screen}
            initialParams={{
              initialData: [],
              id: 1,
              date: item.date,
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 12,
        marginTop: Platform.OS === 'android' ? 5 : 0,
      }}>
      <TouchableOpacity
        style={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <ArrowLeft color={themeColors.dark.colorMain} />
      </TouchableOpacity>
      <BoldText
        fontSize={16}
        style={{
          color: themeColors.dark.white,
          marginLeft: 5,
          marginBottom: 2,
          flex: 1,
        }}>
        Программа
      </BoldText>
    </View>
  );
};

const Screen = (props: any) => {
  const {route} = props;
  const {initialData, id, date} = route.params;
  const {colors} = useTheme();

  const [data, setData] = React.useState(initialData ?? []);
  const [loading, setLoading] = React.useState(false);
  const client = useApolloClient();

  const update = React.useCallback(async () => {
    try {
      setLoading(true);
      let response = await client.query({
        query: RADIO_PROGRAM,
        variables: {
          where: {
            radioId: id,
          },
          orderBy: {
            startTime: 'asc',
          },
        },
      });
      setData(getProgramsForDate2(response.data.programs, date));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [client, date, id]);

  React.useEffect(() => {
    update();
  }, [update]);

  return (
    <View style={{flex: 1, backgroundColor: colors.bgRadio}}>
      <ProgramView
        loading={loading}
        data={getProgramsForDate2(data, new Date(date))}
        update={update}
      />
    </View>
  );
};

interface TabBarProps {
  position: Animated.AnimatedInterpolation<number>;
  state: any;
  getTabWidth: (value: number) => number;
  navigation: any;
}

const TabBarIndicator = (props: TabBarProps) => {
  const {colors} = useTheme();

  const translateX = getTranslateX(
    props.position,
    props.state.routes,
    props.getTabWidth,
    0,
  );
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    props.position.addListener(t => {
      setWidth(Math.round(t.value));
    });
  }, [props.position]);

  return (
    <Animated.View
      style={[
        {
          width: props.getTabWidth(width),
          height: 3,
          backgroundColor: colors.colorMain,
          position: 'absolute',
          bottom: 0,
          transform: [
            {
              translateX,
            },
          ],
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
      ]}
    />
  );
};

const getTranslateX = (
  position: Animated.AnimatedInterpolation<number>,
  routes: {key: string; name: string; param: any}[],
  getTabWidth: (value: number) => number,
  gap?: number,
) => {
  const inputRange = routes.map((_, i) => i);

  const outputRange = routes.reduce<number[]>((acc, _, i) => {
    if (i === 0) {
      return [0];
    }
    return [...acc, acc[i - 1] + getTabWidth(i - 1) + (gap ?? 0)];
  }, []);

  const translateX = position.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });

  return Animated.multiply(translateX, I18nManager.isRTL ? -1 : 1);
};
