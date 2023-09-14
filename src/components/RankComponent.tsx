import React, {Dispatch, SetStateAction} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../Styles/Styles';
import BoldText from './BoldText';

interface Props {
  item: number;
  index: number;
  activeIndex: number | null;
  style?: boolean;
  setActiveIndex?: Dispatch<SetStateAction<number | null>>;
  setRank?: Dispatch<SetStateAction<number | null>>;
  rankItem?: number | undefined;
  activeItem: number | undefined;
}

const RankComponent = ({
  item,
  index,
  activeIndex,
  style,
  setActiveIndex,
  setRank,
  rankItem,
  activeItem,
}: Props) => {
  //rank movie handler
  const getRank = (activeIndexItem: number, rank: number) => {
    if (setActiveIndex !== undefined && setRank !== undefined) {
      setActiveIndex(activeIndexItem);
      setRank(rank);
    }
    return;
  };

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
  return (
    <TouchableOpacity
      style={[
        styles.rating,
        style && {marginTop: 0},
        rankItem
          ? activeItem === index && {backgroundColor: colors.orange}
          : activeIndex === index && {backgroundColor: colors.orange},
      ]}
      onPress={() => rankToMovieHandle(index)}>
      <BoldText
        fontSize={16}
        style={{
          color: rankItem
            ? activeItem === index && colors.white
            : activeIndex === index && colors.blackText,
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

export default RankComponent;
