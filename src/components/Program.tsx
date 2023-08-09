import * as React from 'react';
import {
  Animated,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {getWeekDay} from '../helpers/getWeekDay';
import {IProgram} from '../models/Program';
import {useTheme} from '../Styles/Styles';
import MediumText from './MediumText';
import {TimeLineLive} from './TimeLineLive';
import {TrackPlayerReset} from '../services/service';
import {LIVESTREAMS_PROGRAMS} from '../gql/query/livestreams/LiveStreams';
import {getUpdateClient} from '../requests/updateHeaders';
import Toast from 'react-native-toast-message';
import {Separator} from './Separator';
import {getProgramsForDate} from '../helpers/getProgramsForDate';

interface IProps {
  id: number;
  setPrograms: (value: IProgram[]) => void;
}

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

export const ProgramLive = (props: IProps) => {
  const {id, setPrograms} = props;
  const {colors} = useTheme();
  const dates = [0, 1, 2, 3, 4, 5, 6].map(item => {
    return {
      date: new Date(getStartDate().getTime() + item * 1000 * 60 * 60 * 24),
    };
  });
  const [selectDate, setSelectDate] = React.useState({
    date: dates[0].date,
    index: 0,
  });
  const screenWidth = useWindowDimensions().width;

  const ref = React.useRef<ScrollView>(null);
  const layouts = React.useRef(
    dates.map(() => {
      return {x: 0, width: 0};
    }),
  ).current;
  const [animWidth, setAnimWidth] = React.useState(layouts[0].width);
  const translateX = React.useRef(new Animated.Value(15)).current;
  const [data, setData] = React.useState<IProgram[]>([]);
  const [loading, setLoading] = React.useState(false);

  const update = React.useCallback(async () => {
    try {
      await TrackPlayerReset();
      setData([]);
      setLoading(true);
      const client = await getUpdateClient();
      const response = await client.query({
        query: LIVESTREAMS_PROGRAMS,
        variables: {
          where: {
            liveId: id,
          },
          orderBy: {
            startTime: 'asc',
          },
        },
      });
      setData(response.data.liveStreamsPrograms);
      setPrograms(response.data.liveStreamsPrograms);
    } catch (e) {
      console.log('e', e);
      Toast.show({
        type: 'error',
        text1: 'Во время загрузки программы произошла ошибка',
      });
    } finally {
      setLoading(false);
    }
  }, [id, setPrograms]);

  React.useEffect(() => {
    update();
  }, [update]);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{flexGrow: 0}}
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {dates.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: index === 0 ? 15 : 0,
            }}
            onLayout={e => {
              layouts[index].x = e.nativeEvent.layout.x;
              layouts[index].width = e.nativeEvent.layout.width;
              if (index === 0) {
                setAnimWidth(e.nativeEvent.layout.width - 15);
              }
            }}
            onPress={() => {
              ref.current?.scrollTo({
                x:
                  index > selectDate.index
                    ? layouts[selectDate.index].x + 1
                    : index > 0
                    ? layouts[index - 1].x - 15
                    : layouts[index].x - 15,
                y: 0,
                animated: true,
              });
              setAnimWidth(layouts[index].width - 15);
              setSelectDate({
                date: item.date,
                index: index,
              });
              Animated.timing(translateX, {
                toValue: layouts[index].x,
                duration: 200,
                useNativeDriver: true,
              }).start();
            }}>
            <MediumText
              style={{
                marginRight: 15,
                color:
                  selectDate.index === index
                    ? colors.colorMain
                    : colors.textSecondary,
                fontWeight: '600',
              }}>
              {index === 0
                ? 'Сегодня, '
                : index === 1
                ? 'Завтра, '
                : getWeekDay(item.date.getDay()) + ', '}
              {item.date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
              })}
            </MediumText>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={{
            width: animWidth,
            height: 3,
            position: 'absolute',
            bottom: 0,
            transform: [
              {
                translateX: translateX,
              },
            ],
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            backgroundColor: colors.colorMain,
          }}
        />
      </ScrollView>
      <Separator mh={15} style={{width: screenWidth - 30}} />
      <TimeLineLive
        data={getProgramsForDate(data, selectDate.date)}
        loading={loading}
      />
    </View>
  );
};
