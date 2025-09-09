import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Size = 'sm' | 'md' | 'lg';

interface SimpleInputProps extends TextInputProps {
  password?: boolean;
  size?: Size;
  leftIcon?: keyof typeof Feather.glyphMap;
  rightIcon?: React.ReactNode;
}

export function SimpleInput({
  password = false,
  size = 'md',
  leftIcon,
  rightIcon,
  style,
  ...props
}: SimpleInputProps) {
  const [secure, setSecure] = useState(password);

  const sizeStyles: Record<Size, { height: number; fontSize: number }> = {
    sm: { height: 40, fontSize: 14 },
    md: { height: 48, fontSize: 16 },
    lg: { height: 56, fontSize: 18 },
  };

  return (
    <View style={[styles.container, { height: sizeStyles[size].height }]}>
      {/* Left Icon */}
      {leftIcon && <Feather name={leftIcon} size={20} color="#9ca3af" style={styles.leftIcon} />}

      {/* Input */}
      <TextInput
        {...props}
        style={[styles.input, { fontSize: sizeStyles[size].fontSize }, style]}
        secureTextEntry={secure}
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType={password ? 'none' : 'username'} // disables iOS strong password popup
      />

      {/* Password toggle OR rightIcon */}
      {password ? (
        <TouchableOpacity onPress={() => setSecure((prev) => !prev)}>
          <Feather name={secure ? 'eye-off' : 'eye'} size={20} color="#9ca3af" />
        </TouchableOpacity>
      ) : (
        rightIcon
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151', // gray-700
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    width: '100%',
  },
  input: {
    flex: 1,
    color: 'white',
  },
  leftIcon: {
    marginRight: 8,
  },
});
