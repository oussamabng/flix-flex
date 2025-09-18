import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#a855f7',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 16,
          right: 16,
          borderTopWidth: 0,
          backgroundColor: '#2a2a2a',
          borderRadius: 20,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -2 },
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="movies"
        options={{
          tabBarLabel: 'Movies',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Feather name="film" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="series"
        options={{
          tabBarLabel: 'Series',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Feather name="tv" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
