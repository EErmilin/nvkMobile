import {StyleSheet, View} from 'react-native';
import {colors} from '../Styles/Styles';
import BoldText from './BoldText';

interface Props {
  item: number;
  index: number;
  activeIndex: number;
  style?: boolean;
}

const RankComponent = ({item, index, activeIndex, style}: Props) => {
  return (
    <View
      style={[
        styles.rating,
        style && {marginTop: 0},
        activeIndex === index ? {backgroundColor: colors.orange} : null,
      ]}>
      <BoldText
        fontSize={16}
        style={{
          color: activeIndex === index ? colors.white : colors.blackText,
        }}>
        {item}
      </BoldText>
    </View>
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
