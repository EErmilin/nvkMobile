import React, {Dispatch, SetStateAction, useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../Styles/Styles';
import BoldText from './BoldText';

interface Props {
  item: number;
  index: number;
  style?: boolean;
  //from comments
  activeIndex: number | null;
  setActiveIndex?: Dispatch<SetStateAction<number | null>>;
  setRank?: Dispatch<SetStateAction<number | null>>;
  //inside bottomSheet
}

const RankComponent = ({
  item, //number of arr
  index, // index of arr
  style, //

  activeIndex, //active index of arr
  setActiveIndex,
  setRank,
}: // setActiveIndex,
// setRank,
Props) => {
  const [active, setActive] = useState<number | null>(null);
  const [grade, setGrade] = useState<number | null>();

  //rank movie handler
  const rankToMovieHandle = (indexChecked: number) => {
    switch (indexChecked) {
      case 0:
        getRank(indexChecked, 10);
        break;
      case 1:
        getRank(indexChecked, 9);
        break;
      case 2:
        getRank(indexChecked, 8);
        break;
      case 3:
        getRank(indexChecked, 7);
        break;
      case 4:
        getRank(indexChecked, 6);
        break;
      case 5:
        getRank(indexChecked, 5);
        break;
      case 6:
        getRank(indexChecked, 4);
        break;
      case 7:
        getRank(indexChecked, 3);
        break;
      case 8:
        getRank(indexChecked, 2);
        break;
      case 9:
        getRank(indexChecked, 1);
        break;
    }
  };

  const getRank = (activeIndexItem: number, rank: number) => {
    if (setActiveIndex && setRank) {
      setActiveIndex(activeIndexItem);
      setRank(rank);
    } else {
      setActive(activeIndexItem);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.rating,
        style && {marginTop: 0},
        activeIndex === index || active === index
          ? {backgroundColor: colors.orange}
          : null,
      ]}
      onPress={() => rankToMovieHandle(index)}>
      <BoldText
        fontSize={16}
        style={{
          color: activeIndex === index ? colors.white : colors.blackText,
        }}>
        {item.toString()}
      </BoldText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rating: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 16,
  },
});

export default React.memo(RankComponent);
