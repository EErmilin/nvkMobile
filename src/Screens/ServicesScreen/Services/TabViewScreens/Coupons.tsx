import * as React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';

import {RegularText, Containter} from '../../../../components';
import {RootNavigationProps} from '../../../../navigation/types/RootStackTypes';
import {useTheme} from '../../../../Styles/Styles';
import {ServiceView} from '../components/ServiceView';
import {ICouponPreview} from '../../../../models/Service';

export const Coupons = (props: {
  navigation: RootNavigationProps<'ServicesScreen'>['navigation'];
  coupons: ICouponPreview[];
  update: () => void;
  loading: boolean;
}) => {
  const {navigation, coupons, update, loading} = props;
  const screenHeight = useWindowDimensions().height;
  const {colors} = useTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bgSecondary}}>
      <FlatList
        data={coupons}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ServiceView
            type="Купоны"
            title={item.name}
            description={item.preview}
            price={item.price}
            onPress={() => {
              navigation.navigate('ViewService', {
                type: 'Купоны',
                id: item.id,
                name: item.name,
              });
            }}
            index={index}
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
          <Containter
            style={{
              flex: 1,
              justifyContent: 'center',
              height: screenHeight - 150,
            }}>
            <RegularText
              fontSize={16}
              style={{textAlign: 'center', color: colors.textSecondary}}>
              К сожалению, в настоящее время нет доступных купонов
            </RegularText>
          </Containter>
        }
      />
    </SafeAreaView>
  );
};
