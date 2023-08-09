export const isActiveTime = (start: string, end: string) => {
  let now = new Date().getHours() * 60 + new Date().getMinutes();
  let startNumber =
    Number(start[0] + start[1]) * 60 + Number(start[3] + start[4]);
  let endNumber = Number(end[0] + end[1]) * 60 + Number(end[3] + end[4]);
  if (now >= startNumber && now <= endNumber) {
    return true;
  } else {
    return false;
  }
};
