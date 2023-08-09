import * as React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {RootNavigationProps} from '../../../navigation/types/RootStackTypes';
import MediumText from '../../../components/MediumText';
import {VideoItem} from '../../../components/VideoItem';
import {useTheme} from '../../../Styles/Styles';
import dayjs from 'dayjs';
import {Divider} from '../../../components/Divider';

export const BroadcastSeasonList: React.FC<
  RootNavigationProps<'BroadcastSeasonList'>
> = ({route}) => {
  const {broadcast} = route.params;
  const {colors} = useTheme();
  const width = useWindowDimensions().width;
  const [seasonSelect, setSeasonSelect] = React.useState(0);

  return (
    <View
      style={{
        backgroundColor: colors.bgSecondary,
        flex: 1,
      }}>
      <View
        style={{
          marginTop: 20,
        }}>
        <FlatList
          horizontal
          data={broadcast.seasons?.sort((a, b) => a.number - b.number)}
          contentContainerStyle={{paddingHorizontal: 15, gap: 15}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setSeasonSelect(index)}>
              <MediumText
                style={{
                  textAlign: 'center',
                  color:
                    seasonSelect === index
                      ? colors.colorMain
                      : colors.textPrimary,
                }}
                fontSize={14}>{`${item.number ?? index + 1} сезон`}</MediumText>
              <View
                style={{
                  height: 3,
                  marginTop: 5,
                  backgroundColor:
                    seasonSelect === index ? colors.orange : 'transparent',
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                }}
              />
            </TouchableOpacity>
          )}
        />
        <Divider style={{marginHorizontal: 15}} />
      </View>
      <FlatList
        data={
          broadcast.seasons?.length
            ? broadcast?.seasons[seasonSelect]?.episodes?.sort(
                (a, b) => a.number - b.number,
              )
            : []
        }
        contentContainerStyle={{
          paddingBottom: 60,
          paddingTop: 20,
          gap: 20,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <VideoItem
            style={{flexDirection: 'row', marginHorizontal: 15}}
            urlImage={item.media?.covers[0] && item.media?.covers[0]?.url_512}
            video={item}
            child={
              <View style={{marginLeft: 15, justifyContent: 'space-between'}}>
                <MediumText
                  style={{width: width / 2}}
                  numberOfLines={3}
                  fontSize={14}>{`${index + 1}. ${item.name}`}</MediumText>
                <MediumText fontSize={12}>
                  {dayjs(item.createdAt).format('DD.MM.YY')}
                  {item?.duration && (
                    <MediumText style={{color: colors.orange}}> / </MediumText>
                  )}
                  {item?.duration ? item.duration + ' мин' : ''}
                </MediumText>
              </View>
            }
          />
        )}
      />
    </View>
  );
};
