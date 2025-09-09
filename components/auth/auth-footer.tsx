import { View, Text, TouchableOpacity } from 'react-native';

export const AuthFooter = ({
  text,
  linkLabel,
  onPress,
}: {
  text: string;
  linkLabel: string;
  onPress: () => void;
}) => (
  <View className="mb-8 mt-auto flex flex-row items-center justify-center px-6">
    <Text className="text-gray-400">{text} </Text>
    <TouchableOpacity onPress={onPress}>
      <Text className="font-semibold text-primary">{linkLabel}</Text>
    </TouchableOpacity>
  </View>
);
