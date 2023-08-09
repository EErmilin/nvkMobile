import * as React from 'react';
import {View} from 'react-native';
import {IProgram} from '../../../../models/Program';
import {MediumText} from '../../../../components';
import {getProgramsForDate} from '../../../../helpers/getProgramsForDate';

interface IProps {
  programs: IProgram[];
}

export const CurrentProgram = React.memo((props: IProps) => {
  const {programs} = props;

  const getCurrentProgram = React.useCallback((dataP: IProgram[]) => {
    let now = new Date();
    let findProgram = dataP.find(item => {
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
    return findProgram;
  }, []);

  if (getCurrentProgram(getProgramsForDate(programs, new Date()))) {
    return (
      <MediumText>
        {getCurrentProgram(getProgramsForDate(programs, new Date()))?.name ??
          'current'}
      </MediumText>
    );
  } else {
    return <View />;
  }
});
