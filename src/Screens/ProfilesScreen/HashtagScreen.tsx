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

export const HashtagScreen: React.FC<
  RootNavigationProps<'HashtagScreen'>
> = ({}) => {
  const userHashtags = useAppSelector(state => state.user.hashtags).map(
    hashtag => hashtag.hashtag.name,
  );
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

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
      <BoldText fontSize={16} style={{marginTop: 34}}>
        Мои хештеги
      </BoldText>
      {userHashtags.reverse().map((item, index) => (
        <HashTagComponent
          key={index.toString()}
          item={item}
          my
          myHashtags={userHashtags}
          setLoading={setLoading}
        />
      ))}
      <BoldText fontSize={16} style={{marginTop: 34}}>
        Районы/Улусы
      </BoldText>
      {localRegions.map((item, index) => (
        <HashTagComponent
          key={index.toString()}
          item={item}
          myHashtags={userHashtags}
          setLoading={setLoading}
        />
      ))}
    </ScrollView>
  );
};

const HashTagComponent = (props: {
  item: string;
  my?: boolean;
  myHashtags: string[];
  setLoading: (value: boolean) => void;
}) => {
  const {item, my, myHashtags, setLoading} = props;
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);

  return (
    <View style={styles.viewItem}>
      <View style={[styles.viewLeft, {backgroundColor: colors.bgPrimary}]}>
        <Hashtag color={colors.bgPrimary} stroke={colors.colorMain} />
        <MediumText fontSize={14} style={{fontWeight: '600', marginLeft: 10}}>
          {item}
        </MediumText>
      </View>
      <TouchableOpacity
        style={[
          styles.touchItem,
          {
            backgroundColor: !my
              ? myHashtags.includes(item)
                ? colors.bgSecondary
                : colors.colorMain
              : colors.bgSecondary,
            borderColor: !my
              ? myHashtags.includes(item)
                ? colors.borderPrimary
                : colors.colorMain
              : colors.borderPrimary,
          },
        ]}
        onPress={async () => {
          if (myHashtags.includes(item)) {
            setLoading(true);
            dispatch(removeHashtag(item));
            await dispatch(
              updateHashtag(
                myHashtags
                  .filter(hashtag => hashtag !== item)
                  .map(hashtag => {
                    return {
                      name: hashtag,
                    };
                  }),
              ),
            );
            AppMetrica.reportEvent('HASHTAG_CHANGE', {
              user: user,
              type: 'delete',
              value: item,
              date: new Date(),
              date_string: new Date().toString(),
              platform: Platform.OS,
              device_id: DeviceInfo.getDeviceId(),
              app_version: DeviceInfo.getVersion(),
            });
            setLoading(false);
          } else {
            setLoading(true);
            dispatch(addHashtag(item));
            await dispatch(
              updateHashtag(
                myHashtags.concat(item).map(hashtag => {
                  return {
                    name: hashtag,
                  };
                }),
              ),
            );
            AppMetrica.reportEvent('HASHTAG_CHANGE', {
              user: user,
              type: 'add',
              value: item,
              date: new Date(),
              date_string: new Date().toString(),
              platform: Platform.OS,
              device_id: DeviceInfo.getDeviceId(),
              app_version: DeviceInfo.getVersion(),
            });
            setLoading(false);
          }
        }}>
        {my ? (
          <Minus />
        ) : myHashtags.includes(item) ? (
          <Minus />
        ) : (
          <Plus color={colors.white} />
        )}
      </TouchableOpacity>
    </View>
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
