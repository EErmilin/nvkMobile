import {IProgram} from '../models/Program';

export const getProgramsForDate = (data: IProgram[], date: Date) => {
  let temp = new Date(date);
  temp.setDate(temp.getDate() - 1);
  let startDate = new Date(
    `${temp.toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })}T21:00:00.000Z`,
  );

  let endDate = new Date(
    `${date.toLocaleDateString('fr-CA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })}T20:59:59.000Z`,
  );
  let result = data.filter(program => {
    if (
      new Date(program.date + 'T' + program.startTime) >= startDate &&
      new Date(program.date + 'T' + program.endTime) <= endDate
    ) {
      return true;
    } else {
      return false;
    }
  });
  temp = new Date(date);
  let temp2 = result.sort(function (a, b) {
    return (
      new Date(a.date + 'T' + a.endTime).getTime() -
      new Date(b.date + 'T' + b.endTime).getTime()
    );
  });
  return temp2;
};

export const getProgramsForDate2 = (data: IProgram[], date: Date) => {
  let temp = new Date(date);
  temp.setDate(temp.getDate() - 1);
  let startDate = new Date(
    `${temp.toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })}T21:00:00.000Z`,
  );

  let endDate = new Date(
    `${date.toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })}T20:59:59.000Z`,
  );
  let result = data.filter(program => {
    if (
      new Date(program.date + 'T' + program.startTime) >= new Date(startDate) &&
      new Date(program.date + 'T' + program.endTime) < new Date(endDate)
    ) {
      return true;
    } else {
      return false;
    }
  });
  result = result.filter(
    program => new Date(program.date + 'T' + program.startTime) < endDate,
  );
  temp = new Date(date);
  let temp2 = result.sort(function (a, b) {
    if (
      new Date(a.date + 'T' + a.startTime).getTime() <
      new Date(b.date + 'T' + b.startTime).getTime()
    ) {
      return -1;
    } else {
      return 1;
    }
  });

  return temp2;
};
