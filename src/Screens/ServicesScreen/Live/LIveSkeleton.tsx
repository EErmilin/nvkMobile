import * as React from 'react';
import {useWindowDimensions} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useTheme} from '../../../Styles/Styles';

export const LiveSkeleton = () => {
  const screenWidth = useWindowDimensions().width;
  const {colors} = useTheme();

  return (
    <ContentLoader
      width={screenWidth - 30}
      height={84}
      backgroundColor={colors.skeletonBg}
      foregroundColor={colors.skeletonFg}>
      <Rect width={screenWidth - 80} height={18} rx={8} ry={8} />
      <Rect width={screenWidth / 2} height={28} rx={8} x={0} y={22} ry={8} />
      <Rect width={screenWidth - 100} height={24} rx={8} ry={8} x={0} y={54} />
    </ContentLoader>
  );
};

export const LiveProgramSkeleton = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const {colors} = useTheme();

  return (
    <ContentLoader
      width={screenWidth}
      height={screenHeight}
      backgroundColor={colors.skeletonBg}
      foregroundColor={colors.skeletonFg}>
      <Rect width={100} height={29} x={0} y={22} rx={8} ry={8} />
      <Rect
        width={screenWidth - 140}
        height={29}
        x={110}
        y={22}
        rx={8}
        ry={8}
      />
      <Rect width={100} height={29} x={0} y={44 + 29} rx={8} ry={8} />
      <Rect
        width={screenWidth - 140}
        height={29}
        x={110}
        y={44 + 29}
        rx={8}
        ry={8}
      />
      <Rect width={100} height={29} x={0} y={66 + 29 + 29} rx={8} ry={8} />
      <Rect
        width={screenWidth - 140}
        height={29}
        x={110}
        y={66 + 29 + 29}
        rx={8}
        ry={8}
      />
    </ContentLoader>
  );
};
