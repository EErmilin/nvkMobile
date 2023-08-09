import * as React from 'react';
import {FlatList, StyleSheet, View, useWindowDimensions} from 'react-native';
import {IProgram} from '../models/Program';
import {useTheme} from '../Styles/Styles';
import RegularText from './RegularText';
import MediumText from './MediumText';
import useDebounce from '../helpers/useDebounce';
import {LiveProgramSkeleton} from '../Screens/ServicesScreen/Live/LIveSkeleton';

const getTime = (str: string) => {
  let date = new Date(str);
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const isCurrentTime = (program: IProgram) => {
  let start = new Date(program.date + 'T' + program.startTime);
  let end = new Date(program.date + 'T' + program.endTime);
  let now = new Date();
  if (
    end.getHours() * 60 + end.getMinutes() >
    start.getHours() * 60 + start.getMinutes()
  ) {
    if (now >= start && now <= end) {
      return true;
    } else {
      return false;
    }
  } else {
    if (
      now.getHours() * 60 + now.getMinutes() >=
        start.getHours() * 60 + start.getMinutes() &&
      now.getHours() * 60 + now.getMinutes() <=
        end.getHours() * 60 +
          end.getMinutes() +
          start.getHours() * 60 +
          start.getMinutes()
    ) {
      return true;
    } else {
      return false;
    }
  }
};

export const TimeLineLive: React.FC<{
  data: IProgram[];
  loading: boolean;
}> = props => {
  const {data, loading} = props;
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const {colors} = useTheme();

  return (
    <FlatList
      data={data}
      style={styles.main}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <RenderItem item={item} index={index} length={data.length} />
      )}
      ListEmptyComponent={
        loading && data.length === 0 ? (
          <LiveProgramSkeleton />
        ) : (
          <View
            style={{
              flex: 1,
              width: screenWidth - 30,
              height: screenHeight - 60 - (screenWidth / 16) * 9 - 130,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RegularText
              fontSize={16}
              style={{textAlign: 'center', color: colors.textSecondary}}>
              На данную дату, еще не расписана программа передач
            </RegularText>
          </View>
        )
      }
    />
  );
};

const RenderItem: React.FC<{
  item: IProgram;
  index: number;
  length: number;
}> = props => {
  const {item, index} = props;
  const {colors} = useTheme();

  return (
    <View
      key={item.id.toString()}
      style={[styles.renderView, {marginTop: index === 0 ? 22 : 0}]}>
      <RegularText
        fontSize={16}
        style={[
          styles.textTime,
          {
            color: isCurrentTime({...item, endTime: item.endTime})
              ? colors.textPrimary
              : colors.textSecondary,
          },
        ]}>
        {getTime(item.date + 'T' + item.startTime)} -{' '}
        {getTime(item.date + 'T' + item.endTime)}
      </RegularText>
      <CurrentTrack
        name={item.name}
        start={new Date(item.date + 'T' + item.startTime)}
        end={new Date(item.date + 'T' + item.endTime)}
      />
    </View>
  );
};

const CurrentTrack = (props: {name: string; start: Date; end: Date}) => {
  const screenWidth = useWindowDimensions().width;
  const {colors} = useTheme();
  const [now, setNow] = React.useState(new Date());

  const temp = useDebounce(() => {
    setNow(new Date());
  }, 15000);

  React.useEffect(() => {
    temp();
  }, [temp]);

  if (
    props.end.getHours() * 60 + props.end.getMinutes() >
    props.start.getHours() * 60 + props.start.getMinutes()
  ) {
    if (now >= props.start && now <= props.end) {
      return (
        <View>
          <RegularText
            fontSize={14}
            style={{
              width: screenWidth - 140,
            }}
            numberOfLines={2}>
            {props.name}
          </RegularText>
          <MediumText
            fontSize={12}
            style={{
              marginTop: 5,
              color: colors.colorMain,
            }}>
            Сейчас в эфире
          </MediumText>
          <TimeLine start={props.start} end={props.end} now={now} />
        </View>
      );
    } else {
      return (
        <RegularText
          fontSize={14}
          style={{
            width: screenWidth - 140,
            color: colors.textSecondary,
          }}
          numberOfLines={2}>
          {props.name}
        </RegularText>
      );
    }
  } else {
    if (
      now.getHours() * 60 + now.getMinutes() >=
        props.start.getHours() * 60 + props.start.getMinutes() &&
      now.getHours() * 60 + now.getMinutes() <=
        props.end.getHours() * 60 +
          props.end.getMinutes() +
          props.start.getHours() * 60 +
          props.start.getMinutes()
    ) {
      return (
        <View>
          <RegularText
            fontSize={14}
            style={{
              width: screenWidth - 140,
            }}
            numberOfLines={2}>
            {props.name}
          </RegularText>
          <MediumText
            fontSize={12}
            style={{
              marginTop: 5,
              color: colors.colorMain,
            }}>
            Сейчас в эфире
          </MediumText>
          <TimeLine start={props.start} end={props.end} now={now} />
        </View>
      );
    } else {
      return (
        <RegularText
          fontSize={14}
          style={{
            width: screenWidth - 140,
            color: colors.textSecondary,
          }}
          numberOfLines={2}>
          {props.name}
        </RegularText>
      );
    }
  }
};

const TimeLine: React.FC<{start: Date; end: Date; now: Date}> = props => {
  const {colors} = useTheme();

  const start = props.start.getTime();
  const end =
    props.end > props.start
      ? props.end.getTime()
      : props.end.getTime() + props.start.getTime();

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: colors.borderPrimary,
        height: 2,
        marginTop: 5,
      }}>
      <View
        style={{
          width:
            (((props.now.getTime() - start) * 100) / (end - start)).toString() +
            '%',
          backgroundColor: colors.colorMain,
          height: 2,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 15,
  },
  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
  },
  textTime: {
    width: 100,
    marginRight: 10,
    paddingBottom: 3,
  },
});
