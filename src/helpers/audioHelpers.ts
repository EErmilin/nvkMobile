export const treckCountPural = (count: number) => {
  if (count % 100 >= 10 && count % 100 <= 19) {
    return 'треков';
  } else {
    switch (count % 10) {
      case 0:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return 'треков';
      case 1:
        return 'трек';
      case 2:
      case 3:
      case 4:
        return 'трека';
    }
  }
};

export const podcastCountPural = (count: number) => {
  if (count % 100 >= 10 && count % 100 <= 19) {
    return 'подкастов';
  } else {
    switch (count % 10) {
      case 0:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return 'подкастов';
      case 1:
        return 'подкаст';
      case 2:
      case 3:
      case 4:
        return 'подкаста';
    }
  }
};
