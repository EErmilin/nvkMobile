import * as React from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  useWindowDimensions,
} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {RegularText, Containter} from '../../../../components';
import {RootNavigationProps} from '../../../../navigation/types/RootStackTypes';
import {useTheme} from '../../../../Styles/Styles';
import {ServiceView} from '../components/ServiceView';
import {IServicePreview} from '../../../../models/Service';

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

export const Services = (props: {
  navigation: RootNavigationProps<'ServicesScreen'>['navigation'];
  services: IServicePreview[];
  update: () => void;
  loading: boolean;
}) => {
  const {navigation, services, update, loading} = props;
  const screenHeight = useWindowDimensions().height;
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: colors.bgSecondary}}>
      <FlatList
        data={services.sort()}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ServiceView
            type={'Услуга'}
            title={item.name}
            price={item.price}
            description={item.preview}
            onPress={() => {
              navigation.navigate('ViewService', {
                type: 'Услуга',
                id: item.id,
                name: item.name,
              });
            }}
            index={index}
            key={index.toString() + '_service'}
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
          loading && services.length === 0 ? (
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
                К сожалению, в настоящее время нет доступных услуг
              </RegularText>
            </Containter>
          )
        }
      />
    </View>
  );
};
