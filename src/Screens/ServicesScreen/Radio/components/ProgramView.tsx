import * as React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {IProgram} from '../../../../models/Program';
import {MediumText, RegularText} from '../../../../components';
import {useTheme} from '../../../../Styles/Styles';
import useDebounce from '../../../../helpers/useDebounce';
import {RadioProgramSkeleton} from './RadioSkeleton';

const getTime = (str: string) => {
  let date = new Date(str);
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const ProgramView: React.FC<{
  data: IProgram[];
  loading: boolean;
  update: () => void;
}> = props => {
  const {data, loading, update} = props;
  const {colors} = useTheme();
  const screenHeight = useWindowDimensions().height;
  const [now, setNow] = React.useState(new Date());

  const temp = useDebounce(() => {
    setNow(new Date());
  }, 15000);

  React.useEffect(() => {
    temp();
  }, [temp]);

  return (
    <FlatList
      data={data}
      style={styles.main}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <CurrentTrack
          name={item.name}
          start={new Date(item.date + 'T' + item.startTime)}
          end={new Date(item.date + 'T' + item.endTime)}
          now={now}
          index={index}
          id={item.id}
        />
      )}
      ListEmptyComponent={
        loading && data.length === 0 ? (
          <RadioProgramSkeleton />
        ) : (
          <View
            style={[styles.emptyView, {flex: 1, height: screenHeight - 180}]}>
            <RegularText
              fontSize={16}
              style={{color: colors.white, textAlign: 'center'}}>
              На данную дату, еще не расписана программа передач
            </RegularText>
          </View>
        )
      }
      refreshControl={
        <RefreshControl
          refreshing={loading}
          colors={[colors.colorMain]}
          tintColor={colors.colorMain}
          onRefresh={() => update()}
        />
      }
    />
  );
};

const CurrentTrack = (props: {
  name: string;
  start: Date;
  end: Date;
  now: Date;
  index: number;
  id: number;
}) => {
  const screenWidth = useWindowDimensions().width;
  const {colors} = useTheme();

  if (
    props.end.getHours() * 60 + props.end.getMinutes() >
    props.start.getHours() * 60 + props.start.getMinutes()
  ) {
    if (props.now >= props.start && props.now <= props.end) {
      return (
        <View
          key={props.id.toString()}
          style={[styles.renderView, {marginTop: props.index === 0 ? 22 : 0}]}>
          <RegularText
            fontSize={16}
            style={[
              styles.textTime,
              {
                color:
                  props.now >= props.start && props.now <= props.end
                    ? colors.white
                    : colors.textSecondary,
              },
            ]}>
            {getTime(props.start.toString())} - {getTime(props.end.toString())}
          </RegularText>
          <View>
            <RegularText
              fontSize={14}
              style={{
                width: screenWidth - 140,
                color: colors.white,
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
            <TimeLine start={props.start} end={props.end} now={props.now} />
          </View>
        </View>
      );
    } else {
      return (
        <View
          key={props.id.toString()}
          style={[styles.renderView, {marginTop: props.index === 0 ? 22 : 0}]}>
          <RegularText
            fontSize={16}
            style={[
              styles.textTime,
              {
                color:
                  props.now >= props.start && props.now <= props.end
                    ? colors.white
                    : colors.textSecondary,
              },
            ]}>
            {getTime(props.start.toString())} - {getTime(props.end.toString())}
          </RegularText>
          <RegularText
            fontSize={14}
            style={{
              width: screenWidth - 140,
              color: colors.textSecondary,
            }}
            numberOfLines={2}>
            {props.name}
          </RegularText>
        </View>
      );
    }
  } else {
    if (
      props.now.getHours() * 60 + props.now.getMinutes() >=
        props.start.getHours() * 60 + props.start.getMinutes() &&
      props.now.getHours() * 60 + props.now.getMinutes() <=
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
              color: colors.white,
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
          <TimeLine start={props.start} end={props.end} now={props.now} />
        </View>
      );
    } else {
      return (
        <View style={styles.renderView}>
          <RegularText
            fontSize={16}
            style={[
              styles.textTime,
              {
                color:
                  props.now >= props.start && props.now <= props.end
                    ? colors.white
                    : colors.textSecondary,
              },
            ]}>
            {getTime(props.start.toString())} - {getTime(props.end.toString())}
          </RegularText>
          <RegularText
            fontSize={14}
            style={{
              width: screenWidth - 140,
              color: colors.textSecondary,
            }}
            numberOfLines={2}>
            {props.name}
          </RegularText>
        </View>
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
