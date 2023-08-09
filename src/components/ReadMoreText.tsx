import React from 'react';
import ReadMore from '@fawazahmed/react-native-read-more';
import {useTheme} from '../Styles/Styles';

interface ReadMoreTextProps {
  children: any;
  keyReacrMore: string;
}

export const ReadMoreText: React.FC<ReadMoreTextProps> = props => {
  const {children, keyReacrMore} = props;
  const {colors} = useTheme();
  return (
    <ReadMore
      key={keyReacrMore}
      seeMoreContainerStyleSecondary={{position: 'absolute'}}
      allowFontScaling={false}
      style={{
        fontFamily: 'NotoSans-Regular',
        fontSize: 14,
      }}
      // seeLessText="Скрыть"
      seeMoreText=""
      seeMoreStyle={{color: colors.gray}}
      seeLessStyle={{color: colors.gray}}
      numberOfLines={3}>
      {children}
    </ReadMore>
  );
};
