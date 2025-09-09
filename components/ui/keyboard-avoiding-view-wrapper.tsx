import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';

interface Props {
  children: React.ReactNode;
}

export const KeyboardAvoidingViewWrapper = ({ children }: Props) => {
  return (
    <KeyboardAvoidingView className="flex-1 bg-background" behavior={'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
