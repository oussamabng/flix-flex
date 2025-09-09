import { View, Text } from 'react-native';

export const AuthHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <View className="mb-12 mt-20 items-center px-6">
    <Text className="font-poppins text-5xl font-bold tracking-tight text-white">{title}</Text>
    <Text className="mt-2 text-gray-400">{subtitle}</Text>
  </View>
);
