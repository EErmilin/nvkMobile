import * as React from 'react';
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {RadioSkeleton} from './RadioSkeleton';
import {IProgram} from '../../../../models/Program';
import {BoldText} from '../../../../components';
import {themeColors} from '../../../../Styles/Styles';
import useDebounce from '../../../../helpers/useDebounce';

interface IProps {
  loading: boolean;
  programs: IProgram[];
  avatarUrl: string | null;
}

export const RadioBody: React.FC<IProps> = props => {
  const {loading, programs, avatarUrl} = props;
  const screenWidth = useWindowDimensions().width;
  const [now, setNow] = React.useState(new Date());

  const getCurrentTrack = React.useCallback(
    (programsT: IProgram[]) => {
      let find = programsT.find(
        program =>
          now >= new Date(program.date + 'T' + program.startTime) &&
          now <= new Date(program.date + 'T' + program.endTime),
      );

      if (find) {
        return find.name;
      } else {
        return 'Тэтим';
      }
    },
    [now],
  );

  const timer = useDebounce(() => {
    setNow(new Date());
  }, 1000);

  React.useEffect(() => {
    timer();
  }, [timer]);

  return (
    <View style={styles.main}>
      {loading ? (
        <RadioSkeleton />
      ) : (
        <View>
          <Image
            style={{
              width: screenWidth * 0.6,
              height: screenWidth * 0.6,
              alignSelf: 'center',
              borderRadius: screenWidth * 0.6,
            }}
            resizeMode={'contain'}
            source={
              avatarUrl !== '' && avatarUrl !== null
                ? {uri: avatarUrl}
                : require('../../../../assets/images/tetimIcon.png')
            }
          />
          <BoldText
            fontSize={18}
            style={{
              textAlign: 'center',
              marginTop: 30,
              color: themeColors.dark.white,
            }}>
            {getCurrentTrack(programs)}
          </BoldText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
});
