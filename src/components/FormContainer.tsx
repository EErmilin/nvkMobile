import React from 'react';
import {ViewStyle} from 'react-native';
import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useTheme} from '../Styles/Styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  styleView?: ViewStyle;
  keyboardShouldPersistTaps?: 'always' | 'handled' | 'never';
}

export function FormContainer({
  children,
  scroll = true,
  style,
  styleView,
  keyboardShouldPersistTaps = 'always',
}: IProps) {
  // let offset = Platform.OS === 'ios' ? 75 : -200;
  const {Style} = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[Style.container, style]}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={45 + insets.top}>
        <ScrollView
          scrollEnabled={scroll}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          showsVerticalScrollIndicator={false}>
          <View style={[{flexGrow: 1, padding: 15}, styleView]}>
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
