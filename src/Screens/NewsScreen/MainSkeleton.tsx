import * as React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {useTheme} from '../../Styles/Styles';
import {useWindowDimensions} from 'react-native';

export const MainSkeleton = () => {
  const {colors} = useTheme();
  const screenWidth = useWindowDimensions().width;
  return (
    <ContentLoader
      width={screenWidth}
      height={screenWidth + 45 + 15 + 20 + 80 + 10 + 60}
      backgroundColor={colors.skeletonBg}
      foregroundColor={colors.skeletonFg}>
      <Circle r={45 / 2} x={45 / 2 + 15} y={45 / 2 + 10} />
      <Rect
        width={150}
        height={20}
        x={45 + 15 + 15}
        y={25 / 2 + 10}
        rx={5}
        ry={5}
      />
      <Rect width={screenWidth} height={screenWidth} x={0} y={45 + 15 + 10} />
      <Rect
        width={screenWidth - 30}
        height={80}
        rx={5}
        ry={5}
        x={15}
        y={screenWidth + 45 + 15 + 10 + 10}
      />
      <Rect
        width={screenWidth - 30}
        height={60}
        rx={5}
        ry={5}
        x={15}
        y={screenWidth + 45 + 15 + 20 + 80 + 10}
      />
    </ContentLoader>
  );
};
