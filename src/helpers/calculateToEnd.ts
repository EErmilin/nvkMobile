export const calculateToEnd = (start: string, end: string) => {
  let startNumber =
    Number(start[0] + start[1]) * 60 + Number(start[3] + start[4]);
  let endNumber = Number(end[0] + end[1]) * 60 + Number(end[3] + end[4]);
  let total = endNumber - startNumber;
  let now = new Date().getHours() * 60 + new Date().getMinutes();

  return (((now - startNumber) / total) * 100).toString() + '%';
};
