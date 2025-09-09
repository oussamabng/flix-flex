import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'none',
      }}>
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
          headerBackTitle: '',
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: { backgroundColor: 'transparent' },
        }}
      />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
    </Stack>
  );
}
