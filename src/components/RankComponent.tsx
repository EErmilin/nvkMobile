import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {colors} from '../Styles/Styles';
import BoldText from './BoldText';
import {Button} from './Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  style?: boolean;
  activeReview: number | null | undefined;
  setActiveReview?: Dispatch<SetStateAction<number | null>>;
  publishReviewHandler?: (rank: number, comment: string) => void;
}

const rankNumber = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const RankComponent = ({
  style, //
  publishReviewHandler,
  // from review
  setActiveReview,
  activeReview,
}: Props) => {
  //animated
  const translateButton = useSharedValue(0);
  const insets = useSafeAreaInsets();
  //

  const [active, setActive] = useState<number>();
  const [rankActive, setRankActive] = useState<number>();
  //

  //rank movie handler
  const rankToMovieHandle = (indexChecked: number) => {
    setActive(indexChecked);
    setRankActive(rankNumber[indexChecked]);
  };
  //to review screen
  useEffect(() => {
    if (setActiveReview && active) {
      setActiveReview(active);
    }
  }, [active, setActiveReview]);
  //from review screen to bottomSheet if active
  useEffect(() => {
    if (activeReview) {
      setActive(activeReview);
    }
  }, [activeReview]);

  //KEYBOARD
  useEffect(() => {
    let endHeight: number;
    //show keyboard event
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        endHeight = event.endCoordinates?.height;
        if (endHeight) {
          translateButton.value = withTiming(
            translateButton.value - endHeight,
            {
              duration: 200,
            },
          );
        }
      },
    );
    //hide keyboard
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      event => {
        translateButton.value = withTiming(translateButton.value + endHeight);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [translateButton]);

  return (
    <View style={{flex: 1}}>
      {/* Rank items */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {rankNumber.map((item, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.rating,
                  style && {marginTop: 0},
                  active === index ? {backgroundColor: colors.orange} : null,
                ]}
                onPress={() => rankToMovieHandle(index)}>
                <BoldText
                  fontSize={16}
                  style={{
                    color: active === index ? colors.white : colors.blackText,
                  }}>
                  {item.toString()}
                </BoldText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {!style ? (
        <>
          {/* Comment text */}

          <View style={{marginTop: 16, flex: 1}}>
            <TextInput
              multiline
              style={[
                styles.inputText,
                // {
                //   backgroundColor: colors.input,
                //   borderColor: textError
                //     ? colors.danger
                //     : textFocused
                //     ? colors.colorMain
                //     : colors.borderPrimary,
                //   color: colors.textPrimary,
                // },
              ]}
              placeholder="Ваш комментарий"
            />
          </View>
          {/* publish */}
          <KeyboardAvoidingView enabled={true}>
            <Animated.View
              style={{
                position: 'absolute',
                bottom: Platform.OS === 'ios' ? insets.bottom || 15 : 15,
                width: '100%',
                transform: [{translateY: translateButton}],
              }}>
              <Button title="Опубликовать" onPress={publishReviewHandler} />
            </Animated.View>
          </KeyboardAvoidingView>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 16,
  },
  inputText: {
    minHeight: 100,
    borderRadius: 20,
    textAlignVertical: 'top',
    borderWidth: 1,
    padding: 16,
    paddingTop: 12,
    fontFamily: 'NotoSans-Regular',
    borderColor: colors.secondaryGray,
  },
});

export default React.memo(RankComponent);
