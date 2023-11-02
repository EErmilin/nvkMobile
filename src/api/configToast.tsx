import { View, useWindowDimensions } from 'react-native';
import { themeColors } from '../Styles/Styles';
import { MediumText } from '../components';
import { Success, Error } from '../components/SVGcomponents';
import PipHandler, { usePipModeListener } from 'react-native-pip-android';

export const toastConfig = {
  success: (props: {
    text1: string;
    text2?: string;
    type: 'success' | 'error';
  }) => <CustomToast color={themeColors.dark.success} {...props} />,
  error: (props: {
    text1: string;
    text2?: string;
    type: 'success' | 'error';
  }) => <CustomToast color={themeColors.dark.danger} {...props} />,
};

const CustomToast = (props: {
  color: string;
  text1: string;
  text2?: string;
  type: 'success' | 'error';
}) => {
  const { color, text1, type, text2 } = props;
  const screenWidth = useWindowDimensions().width;
  const inPipMode = usePipModeListener();

  if (inPipMode)
    return <></>

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth - 30,
        backgroundColor: color,
        paddingHorizontal: 17,
        paddingVertical: 15,
        borderRadius: 15,
      }}>
      {type === 'success' ? <Success /> : <Error />}

      <MediumText style={{ marginLeft: 10, color: themeColors.dark.white }}>
        {text1}
        {text2 ? '\n' : ''}
        {text2}
      </MediumText>
    </View>
  );
};
