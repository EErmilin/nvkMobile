import * as React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import MediumText from './MediumText';
import {ToastProps} from 'react-native-toast-message';
import {Success, Warning, Error} from './SVGcomponents';
import {useTheme} from '../Styles/Styles';

interface IProps {
  text1: any;
  type?: string;
}

const CustomToast = (props: IProps) => {
  const {colors} = useTheme();
  const {type, text1} = props;
  const screenWidth = useWindowDimensions().width;
  console.log('ty', type, text1);
  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor:
            type === 'success'
              ? colors.success
              : type === 'warning'
              ? colors.colorMain
              : colors.danger,
          width: screenWidth - 30,
        },
      ]}>
      {type === 'success' ? (
        <Success />
      ) : type === 'warning' ? (
        <Warning />
      ) : (
        <Error />
      )}
      <MediumText style={{marginLeft: 10}}>{text1}</MediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
  },
});

export const toastConfig = {
  success: (props: ToastProps) => (
    <CustomToast type={props.type} text1={props?.text1 ?? ''} />
  ),
  error: (props: ToastProps) => (
    <CustomToast type={props.type} text1={props?.text1 ?? ''} />
  ),
  warning: (props: ToastProps) => (
    <CustomToast type={props.type} text1={props?.text1 ?? ''} />
  ),
};
