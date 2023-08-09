import * as React from 'react';
import {BoldText, MediumText} from '../../components';
import {useTheme} from '../../Styles/Styles';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {DotsVertical, Play} from '../../components/SVGcomponents';

export const FavoriteSelection = () => {
  const {colors} = useTheme();
  const [data] = React.useState([1, 2, 3, 4, 5, 6, 7]);
  return (
    <View style={{flex: 1, paddingBottom: 104}}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({}) => <RenderItem />}
        contentContainerStyle={{flex: data.length > 0 ? 0 : 1}}
        ListEmptyComponent={
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <BoldText style={{color: colors.textSecondary}}>
              У вас нет избранных подкастов
            </BoldText>
          </View>
        }
        ListHeaderComponent={
          data.length > 0 ? (
            <View
              style={{alignItems: 'center', marginTop: 20, marginBottom: 30}}>
              <View
                style={{
                  width: 170,
                  height: 170,
                  backgroundColor: colors.colorMain,
                  borderRadius: 15,
                }}
              />
              <BoldText style={{fontWeight: '700', marginTop: 15}}>
                Мои подкасты
              </BoldText>
              <MediumText style={{color: colors.textSecondary, marginTop: 5}}>
                7 подкаста
              </MediumText>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  borderRadius: 46,
                  paddingVertical: 10,
                  backgroundColor: colors.colorMain,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    backgroundColor: colors.white,
                    marginRight: 10,
                  }}>
                  <Play size={10} color={colors.colorMain} />
                </View>
                <MediumText style={{fontWeight: '600', color: colors.white}}>
                  Слушать
                </MediumText>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )
        }
      />
    </View>
  );
};

const RenderItem = () => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 20,
      }}>
      <Image
        style={{
          width: 60,
          height: 60,
          borderRadius: 10,
        }}
        source={require('../../assets/images/emptyPost.png')}
      />
      <View style={{justifyContent: 'center'}}>
        <MediumText style={{color: colors.textPrimary, fontWeight: '600'}}>
          5ч Кун Дьоьуолдьут бухатыыр
        </MediumText>
        <MediumText
          fontSize={12}
          style={{
            marginTop: 2,
            color: colors.textSecondary,
          }}>
          Ядрихинский П.П.
        </MediumText>
      </View>
      <TouchableOpacity>
        <DotsVertical />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
