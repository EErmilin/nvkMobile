import * as React from 'react';
import {
  RefreshControl,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import Toast from 'react-native-toast-message';

import {useTheme} from '../../Styles/Styles';
import {getUpdateClient} from '../../requests/updateHeaders';
import {TERM} from '../../gql/query/Terms';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';

export const UseOfTerms = (props: RootNavigationProps<'UseOfTerms'>) => {
  const {route} = props;
  const {id} = route.params;
  const screenWidth = useWindowDimensions().width;
  const [data, setData] = React.useState<{
    id: number;
    name: string;
    content: string;
  } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();

  const update = React.useCallback(async () => {
    try {
      setLoading(true);
      const client = await getUpdateClient();
      const response = await client.query({
        query: TERM,
        variables: {
          id: id,
        },
      });
      setData(response.data.term);
    } catch (e: unknown) {
      if (e instanceof Error) {
        Toast.show({
          type: 'error',
          text1: 'Ошибка',
          text2: e.message,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    update();
  }, [update]);

  return (
    <View style={{flex: 1, backgroundColor: colors.bgSecondary}}>
      <ScrollView
        style={{flex: 1}}
        keyboardShouldPersistTaps={'always'}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              update();
            }}
            colors={[colors.colorMain]}
            tintColor={colors.colorMain}
          />
        }>
        <RenderHTML
          source={{
            html: data?.content ?? '',
          }}
          systemFonts={['NotoSans-Regular', 'NotoSans-Bold', 'NotoSans-Medium']}
          tagsStyles={{
            body: {
              fontFamily: 'NotoSans-Regular',
            },
            p: {
              fontFamily: 'NotoSans-Regular',
            },
          }}
          contentWidth={screenWidth}
          baseStyle={{
            color: colors.textPrimary,
            paddingHorizontal: 15,
          }}
        />
      </ScrollView>
    </View>
  );
};
