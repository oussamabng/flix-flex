import React, { useState } from 'react';
import { View, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { SimpleInput } from '@/components/ui/input';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

interface HeaderProps {
  onSearch?: (text: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [query, setQuery] = useState('');
  const animation = useSharedValue(0);
  const { width } = useWindowDimensions();

  const { signOut } = useAuth();
  const router = useRouter();

  const openSearch = () => {
    animation.value = withTiming(1, { duration: 300 });
  };

  const closeSearch = () => {
    setQuery('');
    onSearch?.('');
    animation.value = withTiming(0, { duration: 300 });
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          signOut();
          router.replace('/(auth)/signin'); // redirect to signin page
        },
      },
    ]);
  };

  const logoStyle = useAnimatedStyle(() => {
    const centerX = width / 2 - 60;
    const translateX = (centerX - 0) * animation.value;
    return { transform: [{ translateX }] };
  });

  const inputStyle = useAnimatedStyle(() => ({
    opacity: animation.value,
    height: animation.value ? 50 : 0,
    marginTop: animation.value ? 12 : 0,
  }));

  return (
    <View className="rounded-b-2xl bg-[#121212] px-4 pb-3 pt-4">
      <View className="flex-row items-center justify-between">
        {/* Logo */}
        <Animated.Text style={logoStyle} className="text-3xl font-bold text-white">
          FlixFlex
        </Animated.Text>

        {/* Icons on the right */}
        <View className="flex-row items-center gap-6">
          <TouchableOpacity onPress={openSearch}>
            <Feather name="search" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Feather name="log-out" size={22} color="#a855f7" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search input with X button */}
      <Animated.View style={[inputStyle]}>
        <SimpleInput
          placeholder="Search..."
          size="lg"
          className="w-full"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            onSearch?.(text);
          }}
          rightIcon={
            <TouchableOpacity onPress={closeSearch}>
              <Feather name="x" size={20} color="#9ca3af" />
            </TouchableOpacity>
          }
        />
      </Animated.View>
    </View>
  );
};
