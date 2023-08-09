export const calculateEndWord = (length: number) => {
  if (length % 100 >= 10 && length % 100 <= 19) {
    return 'постов';
  } else {
    switch (length % 10) {
      case 0:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return 'постов';
      case 1:
        return 'пост';
      case 2:
      case 3:
      case 4:
        return 'поста';
    }
  }
};
