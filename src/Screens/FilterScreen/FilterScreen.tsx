import React, {FC, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View, SafeAreaView} from 'react-native';

import {colors, useTheme} from '../../Styles/Styles';
import FilterOptions from '../../components/FilterOptions';
import {Containter} from '../../components';
import {Modalize} from 'react-native-modalize';
import {useDispatch} from 'react-redux';
import {setOpen} from '../../redux/slices/bottomSheetSlice';
import FilterFooterButtons from '../../components/FilterFooterButtons';
import FilterOption from '../../components/FilterOption';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {RootNavigationProps} from '../../navigation/types/RootStackTypes';
import {clearFilter} from '../../redux/slices/filterSlice';

const {width, height} = Dimensions.get('window');
const KNOB_SIZE = 28;

const FilterScreen: FC<RootNavigationProps<'Filter'>> = ({
  route,
  navigation,
}) => {
  const modalizeRef = useRef<Modalize>(null);
  const {colors} = useTheme();
  const xKnobLeft = useSharedValue(0);
  const xKnobRight = useSharedValue(width - 30 - KNOB_SIZE);
  const trackAnimated = useAnimatedStyle(() => {
    return {
      width: xKnobRight.value - xKnobLeft.value,
      borderWidth: 1,
      borderColor: colors.orange,
      borderRadius: 2,
      position: 'absolute',
      transform: [{translateX: xKnobLeft.value}],
    };
  });
  //
  const [page, setPage] = useState('');
  const dispatch = useDispatch();

  //open Modalize
  const onOpen = (pageId: string | undefined) => {
    if (pageId && pageId !== '' && pageId !== undefined) {
      setPage(pageId);
    }
    dispatch(setOpen(false));
    modalizeRef.current?.open();
  };

  //onClose reset StateHeader
  const onClose = () => {
    dispatch(setOpen(true));
  };
  //input range KnobLeft animation
  const handleKnobLeft = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = xKnobLeft.value;
    },
    onActive: (event, ctx) => {
      xKnobLeft.value =
        ctx.startX + event.translationX < 0
          ? 0
          : ctx.startX + event.translationX > xKnobRight.value
          ? xKnobRight.value
          : ctx.startX + event.translationX;
    },
    onEnd: () => {},
  });
  //input range KnobRight animation
  const handleKnobRight = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = xKnobRight.value;
    },
    onActive: (event, ctx) => {
      xKnobRight.value =
        ctx.startX + event.translationX < xKnobLeft.value
          ? xKnobLeft.value
          : ctx.startX + event.translationX > width - 30
          ? width - 30 - KNOB_SIZE
          : ctx.startX + event.translationX;
    },
    onEnd: () => {},
  });

  return (
    <>
      <Containter style={{backgroundColor: colors.bgSecondary, flex: 1}}>
        {/* Options */}
        <FilterOptions
          title={'Жанры'}
          handlePage={onOpen}
          type={route.params.type}
        />
        <FilterOptions
          title={'Годы'}
          handlePage={onOpen}
          type={route.params.type}
        />
        <FilterOptions
          title={'Возраст'}
          handlePage={onOpen}
          type={route.params.type}
        />
        <FilterOptions
          title={'Язык'}
          handlePage={onOpen}
          type={route.params.type}
        />
        <FilterOptions
          title={'Страны'}
          handlePage={onOpen}
          type={route.params.type}
        />
        <FilterOptions title={'Рейтинг Кинопоиск'} type={route.params.type} />
        {/* InputRange */}
        <View style={styles.rangeContainer}>
          <View style={styles.track} />
          <Animated.View style={trackAnimated} />
          {/* KNOB Left PanGestureHandler*/}
          <PanGestureHandler onGestureEvent={handleKnobLeft}>
            <Animated.View
              style={[styles.knob, {transform: [{translateX: xKnobLeft}]}]}>
              <View style={styles.innerKnob} />
            </Animated.View>
          </PanGestureHandler>

          {/* KNOB RIGHT PanGestureHandler*/}
          <PanGestureHandler onGestureEvent={handleKnobRight}>
            <Animated.View
              style={[styles.knob, {transform: [{translateX: xKnobRight}]}]}>
              <View style={styles.innerKnob} />
            </Animated.View>
          </PanGestureHandler>
        </View>
        {/* Footer Buttons */}
        <View style={styles.buttonContainer}>
          <FilterFooterButtons
            onApply={() => {
              navigation.goBack();
            }}
            onClear={() => {
              dispatch(
                clearFilter({
                  type: route.params.type,
                }),
              );
              navigation.goBack();
            }}
          />
        </View>
      </Containter>
      {/* Modalize */}
      <Modalize ref={modalizeRef} modalHeight={height} onClose={onClose}>
        <Containter style={{flex: 1}}>
          <SafeAreaView>
            <FilterOption
              page={page}
              type={route.params.type}
              onClose={() => modalizeRef.current?.close()}
            />
          </SafeAreaView>
        </Containter>
      </Modalize>
    </>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  rangeContainer: {
    marginVertical: 15,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    width: width - 30,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 2,
    alignSelf: 'baseline',
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    padding: 2,
    borderRadius: 14,
    borderColor: colors.orange,
    backgroundColor: colors.orange,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  innerKnob: {
    width: 24,
    height: 24,
    borderRadius: 14,
    backgroundColor: colors.white,
  },
  buttons: {
    flex: 1,
    padding: 15,
    backgroundColor: 'red',
  },
  button: {},
});
