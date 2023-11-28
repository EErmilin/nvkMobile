import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
// @ts-ignore
import AppMetrica from 'react-native-appmetrica-next';

import {BoldText, MediumText} from '../../components';
import {Hashtag, Minus, Plus} from '../../components/SVGcomponents';
import {localRegions} from '../../helpers/regions';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useTheme} from '../../Styles/Styles';
import {addHashtag, removeHashtag} from '../../redux/slices/userSlice';
import {updateHashtag} from '../../redux/thunks/user/UpdateUser';
import DeviceInfo from 'react-native-device-info';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getAuthorSubscriptions} from '../../redux/thunks/author/GetAuthor';
import {useNavigation} from '@react-navigation/native';
import {IAuthor} from '../../models/Author';

export const SubscriptionsScreen: React.FC<
  RootNavigationProps<'SubscriptionsScreen'>
> = ({}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);
  const subscriptions = useAppSelector(state => state.user.subscriptions) ?? [];
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    (async function () {
      setLoading(true);
      const res = await dispatch(
        getAuthorSubscriptions({userId: user?.id ?? -1}),
      );
      setLoading(false);
    })();
  }, [user]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'always'}
      style={{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: colors.fillPrimary,
        paddingBottom: insets.bottom,
      }}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
      }}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {}}
          colors={[colors.colorMain]}
          tintColor={colors.colorMain}
        />
      }>
      {subscriptions.map((item, index) => (
        <HashTagComponent
          key={index.toString()}
          item={item}
          setLoading={setLoading}
        />
      ))}
    </ScrollView>
  );
};

const HashTagComponent = (props: {
  item: IAuthor;
  setLoading: (value: boolean) => void;
}) => {
  const nav = useNavigation();
  const {item, setLoading} = props;
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);

  return (
    <TouchableOpacity
      onPress={async () => {
        nav.navigate('BlogerProfile', {id: item.id});
      }}>
      <View style={styles.viewItem}>
        <View style={[styles.viewLeft, {backgroundColor: colors.bgPrimary}]}>
          <Hashtag color={colors.bgPrimary} stroke={colors.colorMain} />
          <MediumText fontSize={14} style={{fontWeight: '600', marginLeft: 10}}>
            {item.nickname}
          </MediumText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  viewLeft: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  touchItem: {
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
});
