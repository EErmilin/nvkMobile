import * as React from 'react';
import {IProgram} from '../../../../models/Program';
import {MediumText} from '../../../../components';
import {useTheme} from '../../../../Styles/Styles';
import {View} from 'react-native';
import {getProgramsForDate} from '../../../../helpers/getProgramsForDate';

interface IProps {
  programs: IProgram[];
}

export const NextProgram = React.memo((props: IProps) => {
  const {programs} = props;
  const {colors} = useTheme();

  const getNextProgram = React.useCallback((data: IProgram[]) => {
    let now = new Date();
    let findProgramIndex = data.findIndex(item => {
      let start = new Date(item.date + 'T' + item.startTime);
      let end = new Date(item.date + 'T' + item.endTime);
      if (
        end.getHours() * 60 + end.getMinutes() >
        start.getHours() * 60 + start.getMinutes()
      ) {
        return now >= start && now <= end;
      } else {
        return (
          now.getTime() >= start.getTime() &&
          now.getTime() <= end.getTime() + start.getTime()
        );
      }
    });
    if (findProgramIndex < data.length && findProgramIndex !== -1) {
      return data[findProgramIndex + 1];
    } else {
      return null;
    }
  }, []);

  if (getNextProgram(getProgramsForDate(programs, new Date()))) {
    return (
      <MediumText fontSize={12} style={{color: colors.textSecondary}}>
        Далее в{' '}
        {new Date(
          getNextProgram(getProgramsForDate(programs, new Date()))?.date +
            'T' +
            getNextProgram(getProgramsForDate(programs, new Date()))?.startTime,
        ).toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        })}{' '}
        "
        {getNextProgram(getProgramsForDate(programs, new Date()))?.name ??
          'next'}
        "
      </MediumText>
    );
  } else {
    return <View />;
  }
});
