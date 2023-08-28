import * as React from 'react';
import {
  TextInput,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TextInputProps,
  Animated,
  View,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {useTheme} from '../Styles/Styles';
import {Search} from './SVGcomponents/Search';
import MediumText from './MediumText';

interface SearchProps {
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  onChangeText?: (value: string) => void;
  value: string;
  placeholder?: string;
  onEndEditing?: () => void;
  isSearch?: boolean
}

const ANIM_VALUE = 0;

export const SearchComponent: React.FC<SearchProps> &
  TextInputProps = props => {
  const {
    style,
    containerStyle,
    onChangeText,
    value,
    placeholder,
    onEndEditing,
    isSearch = true,
    ...rest
  } = props;
  const ref = React.useRef<any>(null);
  const {colors, theme, Style} = useTheme();
  const animValue = React.useRef(
    new Animated.Value(value !== '' ? ANIM_VALUE : 0),
  );
  const screenWidth = useWindowDimensions().width;

  React.useEffect(() => {
    if (value !== '') {
      Animated.timing(animValue.current, {
        toValue: ANIM_VALUE,
        duration: 180,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animValue.current, {
        toValue: 16,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }
  }, [animValue, value]);

  const currentAnim = animValue.current.interpolate({
    inputRange: [ANIM_VALUE, 16],
    outputRange: isSearch
        ? [screenWidth - 30 - 71, screenWidth - 30]
        : [screenWidth - 30, screenWidth - 30],
  });

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        style,
      ]}>
      <Animated.View
        style={{
          width: currentAnim,
          height: 54,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styleSearch.main,
            {
              backgroundColor: colors.input,
              flex: 1,
              marginRight: value !== '' ? 15 : 0,
              borderColor:
                theme === 'light' ? colors.borderPrimary : 'transparent',
              paddingLeft: isSearch ? 20 : 4
            },
            containerStyle,
          ]}
          onPress={() => {
            ref.current?.focus();
          }}>
          {isSearch && <Search color={colors.colorMain} />}
          <Animated.Text
            style={[
              styleSearch.label,
              {
                color: colors.textSecondary,
                fontSize: animValue.current.interpolate({
                  inputRange: [ANIM_VALUE, 16],
                  outputRange: [10, 14],
                }),
                top: animValue.current.interpolate({
                  inputRange: [ANIM_VALUE, 16],
                  outputRange: [8, Platform.OS === 'ios' ? 18 : 12],
                }),
                left: isSearch ? 20 + 24 + 15 : 20
              },
            ]}>
            {placeholder}
          </Animated.Text>
          <TextInput
            ref={ref}
            style={[
              Style.textInput,
              {
                color: colors.textPrimary,
                flex: 1,
                paddingLeft: 15,
                marginTop: value === '' ? 0 : 16,
              },
            ]}
            placeholderTextColor={colors.textSecondary}
            onChangeText={onChangeText}
            value={value}
            onEndEditing={onEndEditing}
            {...rest}
          />
        </TouchableOpacity>
      </Animated.View>
      {value !== '' && isSearch ? (
        <TouchableOpacity
          onPress={() => {
            onChangeText && onChangeText('');
          }}>
          <MediumText>Отменить</MediumText>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

const styleSearch = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 20,
    height: 54,
    fontFamily: 'NotoSans-Regular',
    marginHorizontal: 3,
    borderWidth: 1,
  },
  label: {
    position: 'absolute',
    flex: 1,
    fontSize: 12,
    fontFamily: 'NotoSans-Regular',
    left: 20 + 24 + 15,
    textAlignVertical: 'center',
  },
});
