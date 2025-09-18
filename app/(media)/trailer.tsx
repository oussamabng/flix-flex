import { formatRuntime } from '@/utils/helpers';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function TrailerScreen() {
  const { title, year, runtime, overview, videoId } = useLocalSearchParams<{
    title: string;
    year: string;
    runtime: string;
    overview: string;
    videoId: string;
  }>();

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ headerShown: false }} />

      <View className="px-4 pt-2">
        <YoutubePlayer height={250} play={true} videoId={videoId} />
      </View>

      <ScrollView className="flex-1 p-5 px-4">
        <Text className="text-2xl font-bold text-white">{title}</Text>

        <View className="mt-2 flex-row items-center gap-4">
          <Text className="text-gray-400">{year}</Text>
          {runtime ? (
            <Text className="text-gray-400">{formatRuntime(parseInt(runtime))}</Text>
          ) : null}
        </View>

        <Text className="mt-4 text-base leading-6 text-gray-300">{overview}</Text>
      </ScrollView>
    </View>
  );
}
