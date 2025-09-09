import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function RatingStars({ value }: { value: number }) {
  return (
    <View className="flex-row items-center">
      <Feather name="star" size={14} color="#facc15" />
      <Text className="ml-1 text-sm text-yellow-400">{value.toFixed(1)}/8</Text>
    </View>
  );
}
