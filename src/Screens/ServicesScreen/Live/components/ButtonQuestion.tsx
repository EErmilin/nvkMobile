import * as React from 'react';
import {Animated, TouchableOpacity, useWindowDimensions} from 'react-native';
import {useCountdown} from 'react-native-use-countdown';

import {BoldText} from '../../../../components';
import {Message} from '../../../../components/SVGcomponents';
import {useTheme} from '../../../../Styles/Styles';
import {useApolloClient} from '@apollo/client';
import {QUESTION_IS_OPEN} from '../../../../gql/query/livestreams/Question';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {logout} from '../../../../redux/thunks/auth/Logout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../../../navigation/types/RootStackTypes';

export const ButtonQuestion = (props: {
  id: number;
  initialIsOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const {id, initialIsOpen, setIsOpen} = props;
  const navigation =
    useNavigation<RootNavigationProps<'ViewLive'>['navigation']>();

  const screenWidth = useWindowDimensions().width;
  const {colors, theme} = useTheme();
  const {countdown, start, reset} = useCountdown(10);
  const client = useApolloClient();
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const animValue = React.useRef(
    new Animated.Value(initialIsOpen ? 0 : 200),
  ).current;

  React.useEffect(() => {
    start();
  }, [start]);

  const checkIsOpen = React.useCallback(async () => {
    try {
      let response = await client.query({
        query: QUESTION_IS_OPEN,
        variables: {
          liveStreamId: id,
        },
      });
      if (response.data.liveStream.isOpen) {
        Animated.timing(animValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(animValue, {
          toValue: 200,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
      setIsOpen(response.data.liveStream.isOpen);
    } catch (e) {
      console.log('e', e);
    }
  }, [animValue, client, id, setIsOpen]);

  React.useEffect(() => {
    if (countdown > 0) {
      if (countdown === 10) {
        checkIsOpen();
      }
    } else {
      reset();
      start();
    }
  }, [checkIsOpen, countdown, reset, start]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [
          {
            translateY: animValue,
          },
        ],
        bottom: 15 + insets.bottom,
        width: screenWidth - 30,
        alignSelf: 'center',
        left: 15,
        height: 60,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.colorMain,
          height: 60,
          borderRadius: 15,
          width: screenWidth - 30,
        }}
        onPress={() => {
          if (token) {
            navigation.navigate('LiveQuestion', {id: id});
          } else {
            dispatch(logout());
          }
        }}>
        <BoldText
          style={{
            color: theme === 'dark' ? colors.black : colors.white,
            marginRight: 10,
          }}>
          Задать вопрос
        </BoldText>
        <Message color={theme === 'dark' ? colors.black : colors.white} />
      </TouchableOpacity>
    </Animated.View>
  );
};
