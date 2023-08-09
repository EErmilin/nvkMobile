import * as React from 'react';
import {useWindowDimensions} from 'react-native';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {themeColors} from '../../../../Styles/Styles';

export const RadioSkeleton: React.FC<any> = () => {
  const screenWidth = useWindowDimensions().width;

  return (
    <ContentLoader
      width={screenWidth * 0.6}
      height={screenWidth * 0.6 + 30 + 28 + 5 + 18}
      backgroundColor={themeColors.dark.skeletonBg}
      foregroundColor={themeColors.dark.skeletonFg}>
      <Circle
        r={(screenWidth * 0.6) / 2}
        x={(screenWidth * 0.6) / 2}
        y={(screenWidth * 0.6) / 2}
      />
      <Rect
        width={screenWidth * 0.6}
        height={28}
        rx={8}
        ry={8}
        x={0}
        y={screenWidth * 0.6 + 30}
      />
      <Rect
        width={screenWidth * 0.6}
        height={18}
        rx={8}
        ry={8}
        x={0}
        y={screenWidth * 0.6 + 30 + 28 + 5}
      />
    </ContentLoader>
  );
};

export const RadioProgramSkeleton = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const length = Math.ceil((screenHeight - 180) / 42);

  return (
    <ContentLoader
      width={screenWidth - 30}
      height={length * 42 + 22}
      backgroundColor={themeColors.dark.skeletonBg}
      foregroundColor={themeColors.dark.skeletonFg}>
      {Array(length)
        .fill(0)
        .map((item, index) => (
          <>
            <Rect
              key={index.toString() + '_left'}
              width={'100'}
              height={26}
              rx={8}
              ry={8}
              x={0}
              y={22 + index * 42}
            />
            <Rect
              key={index.toString() + '_right'}
              width={screenWidth - 30 - 100 - 10}
              height={26}
              rx={8}
              ry={8}
              x={110}
              y={22 + index * 42}
            />
          </>
        ))}
    </ContentLoader>
  );
};
