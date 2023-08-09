export const getDate = (date: Date) => {
  let now = new Date();
  if (now.getTime() - date.getTime() >= 1000 * 60 * 60 * 24 * 3) {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } else {
    if (now.getTime() - date.getTime() >= 1000 * 60 * 60 * 24 * 2) {
      return '3 дня назад';
    } else {
      if (now.getTime() - date.getTime() >= 1000 * 60 * 60 * 24) {
        return '2 дня назад';
      } else {
        if (now.getTime() - date.getTime() >= 1000 * 60 * 60) {
          return `${Math.ceil(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60),
          )} ч назад`;
        } else {
          return `${Math.ceil(
            (now.getTime() - date.getTime()) / (1000 * 60),
          )} мин назад`;
        }
      }
    }
  }
};
