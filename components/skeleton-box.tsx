import { View } from 'react-native';

export function SkeletonBox({
  width,
  height,
  className = '',
}: {
  width: number;
  height: number;
  className?: string;
}) {
  return <View className={`rounded-md bg-gray-700/40 ${className}`} style={{ width, height }} />;
}
