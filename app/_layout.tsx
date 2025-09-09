import React from 'react';
import { Stack } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { GenreProvider } from '@/contexts/genre-context';
import { StatusBar } from 'react-native';
import '../global.css';

const tokenCache = {
  getToken: (key: string) => SecureStore.getItemAsync(key),
  saveToken: (key: string, value: string) => SecureStore.setItemAsync(key, value),
};

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey as string}
      tokenCache={tokenCache}>
      <GenreProvider>
        <StatusBar />
        <Stack
          screenOptions={{
            title: '',
            headerStyle: { backgroundColor: '#121212' },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackButtonDisplayMode: 'minimal',
            animation: 'none',
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(media)" options={{ headerShown: true }} />
        </Stack>
      </GenreProvider>
    </ClerkProvider>
  );
}
