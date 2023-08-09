import * as React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {Containter, RegularText} from '../../../../components';
import {RootNavigationProps} from '../../../../navigation/types/RootStackTypes';
import {useTheme} from '../../../../Styles/Styles';
import {ServiceView} from '../components/ServiceView';
import {IAdsPreview} from '../../../../models/Service';

const Skeleton = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const {colors} = useTheme();
  const length = Math.ceil(screenHeight / 229);

  return (
    <ContentLoader
      width={screenWidth}
      height={screenHeight}
      backgroundColor={colors.skeletonBg}
      foregroundColor={colors.skeletonFg}>
      {Array(length)
        .fill(0)
        .map((item, index) => (
          <Rect
            key={index.toString()}
            width={screenWidth - 30}
            height={229}
            x="15"
            y={20 + index * 239}
            rx="15"
            ry="15"
          />
        ))}
    </ContentLoader>
  );
};

export const Announcement = (props: {
  navigation: RootNavigationProps<'ServicesScreen'>['navigation'];
  announcements: IAdsPreview[];
  update: () => void;
  loading: boolean;
}) => {
  const {navigation, announcements, update, loading} = props;
  const screenHeight = useWindowDimensions().height;
  const {colors} = useTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bgSecondary}}>
      <FlatList
        data={announcements}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ServiceView
            title={item.name}
            price={item.price}
            description={item.preview}
            type={'Заявка на рекламу'}
            index={index}
            onPress={() => {
              navigation.navigate('ViewService', {
                id: item.id,
                type: 'Заявка на рекламу',
                name: item.name,
              });
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => update()}
            colors={[colors.colorMain]}
            tintColor={colors.colorMain}
          />
        }
        ListEmptyComponent={
          loading && announcements.length === 0 ? (
            <Skeleton />
          ) : (
            <Containter
              style={{
                flex: 1,
                justifyContent: 'center',
                height: screenHeight - 150,
              }}>
              <RegularText
                fontSize={16}
                style={{textAlign: 'center', color: colors.textSecondary}}>
                К сожалению, в настоящее время нет доступных заявок
              </RegularText>
            </Containter>
          )
        }
      />
    </SafeAreaView>
  );
};
