import { Stack } from 'expo-router';

export default function MediaLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTintColor: 'white',
        headerTitle: '',
        headerBackTitle: '',
        headerBackButtonDisplayMode: 'minimal',
      }}
    />
  );
}
