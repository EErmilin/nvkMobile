import React, {useRef} from 'react';
import {Dimensions, StyleSheet, View, SafeAreaView} from 'react-native';

import {colors} from '../../Styles/Styles';
import FilterOptions from '../../components/FilterOptions';
import {Containter} from '../../components';
import {Modalize} from 'react-native-modalize';
import {useDispatch} from 'react-redux';
import {setOpen} from '../../redux/slices/bottomSheetSlice';
import GenresFilterOptions from '../../components/GenresFilterOption';
import FilterFooterButtons from '../../components/FilterFooterButtons';

const {width, height} = Dimensions.get('window');

const FilterScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  //
  //   const [pageId, setPageId] = useState('genres');

  const dispatch = useDispatch();
  //open Modalize
  const onOpen = (pageId: string) => {
    console.log(pageId);

    dispatch(setOpen(false));
    modalizeRef.current?.open();
  };
  //onClose reset StateHeader
  const onClose = () => {
    dispatch(setOpen(true));
  };

  return (
    <>
      <Containter style={{backgroundColor: colors.white, flex: 1}}>
        <FilterOptions title={'Жанры'} handlePage={onOpen} />
        <FilterOptions title={'Годы'} handlePage={onOpen} />
        <FilterOptions title={'Возраст'} handlePage={onOpen} />
        <FilterOptions title={'Язык'} handlePage={onOpen} />
        <FilterOptions title={'Страны'} handlePage={onOpen} />
        <FilterOptions title={'Рейтинг Кинопоиск'} handlePage={onOpen} />
        <View style={styles.rangeContainer}>
          <View style={styles.track} />
          <View style={styles.knob} />
        </View>
        {/* Footer Buttons */}
        <View style={styles.buttonContainer}>
          <FilterFooterButtons />
        </View>
      </Containter>
      {/* Modalize */}
      <Modalize
        ref={modalizeRef}
        modalHeight={height}
        onClose={onClose}
        modalStyle={{backgroundColor: 'black'}}>
        <Containter>
          <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
            <GenresFilterOptions />
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
    borderColor: colors.orange,
    borderRadius: 2,
    alignSelf: 'baseline',
  },
  knob: {
    width: 28,
    height: 28,
    padding: 2,
    borderRadius: 14,
    borderColor: colors.orange,
    backgroundColor: colors.orange,
    position: 'absolute',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
