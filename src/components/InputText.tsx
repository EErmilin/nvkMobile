import * as React from 'react';
import {
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ColorValue,
  KeyboardType,
  ReturnKeyType,
  Text,
  Platform,
} from 'react-native';
import {TextStyle, ViewStyle} from 'react-native';
import {useTheme} from '../Styles/Styles';
import MaskInput from 'react-native-mask-input';
import {PHONE_MASK} from '../helpers/masks';

const ANIM_VALUE = 0;
interface InputProps {
  style?: ViewStyle | ViewStyle[];
  value: string;
  onChangeText?:
    | ((formatted: string, extracted?: string | undefined) => void)
    | undefined;
  ref?: React.Ref<TextInput>;
  editable?: boolean;
  onFocus?: () => void;
  onEndEditing?: () => void;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  keyboardType?: KeyboardType;
  phoneMask?: boolean;
  mask?: (string | RegExp)[] | 'phone';
  autoFocus?: boolean;
  multiline?: boolean;
  maxLength?: number;
  onLayout?: () => void;
  onScroll?: () => void;
  returnKeyLabel?: string;
  returnKeyType?: ReturnKeyType;
  allowFontScalling?: boolean;
  label?: string;
  styleLabel?: TextStyle | TextStyle[];
  styleText?: TextStyle | TextStyle[];
  onBlur?: () => void;
  logo?: React.ReactNode;
  secureTextEntry?: boolean;
  onChange?: (value: {
    nativeEvent: {eventCount: number; target: number; text: string};
  }) => void;
  required?: boolean;
  errorState?: boolean;
}

export const InputText: React.FC<InputProps> = props => {
  const {
    style,
    value,
    onChangeText,
    editable,
    onFocus,
    onEndEditing,
    placeholder,
    placeholderTextColor,
    keyboardType,
    autoFocus = false,
    multiline,
    maxLength,
    onLayout,
    onScroll,
    returnKeyLabel,
    returnKeyType,
    secureTextEntry,
    allowFontScalling,
    label,
    styleLabel,
    styleText,
    onBlur,
    logo,
    mask,
    required = false,
    errorState,
  } = props;
  const animValue = React.useRef(
    new Animated.Value(value !== '' ? ANIM_VALUE : 0),
  ).current;
  const [focus, setFocus] = React.useState(false);
  const refTextInput = React.useRef<TextInput>(null);
  const {colors} = useTheme();

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  React.useEffect(() => {
    if (value !== '' || focus) {
      Animated.timing(animValue, {
        toValue: ANIM_VALUE,
        duration: 180,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: 16,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }
  }, [animValue, focus, value]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        refTextInput.current?.focus();
      }}
      style={[
        styles.main,
        {
          paddingRight: logo ? 0 : 20,
          backgroundColor: colors.input,
          borderWidth: 1,
          borderColor: errorState
            ? colors.red
            : focus
            ? colors.colorMain
            : colors.borderPrimary,
        },
        style,
      ]}
      onFocus={handleFocus}
      onBlur={handleBlur}>
      <Animated.Text
        style={[
          styles.label,
          {
            paddingBottom: Platform.OS === 'android' ? 4 : 0,
            color: colors.textSecondary,
            fontSize: animValue.interpolate({
              inputRange: [ANIM_VALUE, 16],
              outputRange: [12, 14],
            }),
            top: animValue.interpolate({
              inputRange: [ANIM_VALUE, 16],
              outputRange: [8, Platform.OS === 'ios' ? 20 : 16],
            }),
          },
          styleLabel,
        ]}>
        {label}
        {required ? <Text style={{color: colors.danger}}>*</Text> : <></>}
      </Animated.Text>
      <MaskInput
        mask={mask === 'phone' ? PHONE_MASK : mask}
        editable={editable}
        secureTextEntry={secureTextEntry}
        value={value}
        cursorColor={colors.colorMain}
        onChangeText={onChangeText}
        allowFontScaling={allowFontScalling}
        style={[styles.text, {color: colors.textPrimary, flex: 1}, styleText]}
        ref={refTextInput}
        onFocus={() => {
          onFocus;
          setFocus(true);
        }}
        onBlur={() => {
          onBlur;
          setFocus(false);
        }}
        onEndEditing={onEndEditing}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        multiline={multiline}
        maxLength={maxLength}
        onLayout={onLayout}
        onScroll={onScroll}
        returnKeyLabel={returnKeyLabel}
        returnKeyType={returnKeyType}
      />
      {logo}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 18,
    height: 60,
    fontSize: 14,
    fontFamily: 'NotoSans-Medium',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginTop: 18,
    marginLeft: 20,
  },
  label: {
    position: 'absolute',
    flex: 1,
    fontSize: 12,
    fontFamily: 'NotoSans-Regular',
    left: 20,
    textAlignVertical: 'center',
  },
});
