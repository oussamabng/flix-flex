import { Container } from '@/components/container';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTMDbDetails } from '@/hooks/use-tmdb-details';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

function formatRuntime(minutes: number): string {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
}

export default function MediaDetails() {
  const router = useRouter();
  const { mediaType, id } = useLocalSearchParams<{ mediaType: 'movie' | 'tv'; id: string }>();
  const { data, loading, error } = useTMDbDetails(mediaType, id!);

  const screenHeight = Dimensions.get('window').height;

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="white" className="mt-10" />
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container>
        <Text className="text-red-500">Failed to load details</Text>
      </Container>
    );
  }

  const poster = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null;
  const title = mediaType === 'tv' ? data.name : data.title;
  const releaseDate = mediaType === 'tv' ? data.first_air_date : data.release_date;
  const runtime = mediaType === 'tv' ? data.episode_run_time?.[0] : data.runtime;

  const trailer = data.videos?.results?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return (
    <View className="relative flex flex-1 bg-background text-white">
      <ScrollView className="flex-1">
        <View>
          {poster && (
            <Image
              source={{ uri: poster }}
              style={{ height: screenHeight * 0.5, width: '100%' }}
              resizeMode="cover"
            />
          )}
        </View>

        {/* Details */}
        <View className="mt-4 rounded-t-3xl bg-background px-5 pt-6">
          <Text className="text-2xl font-bold text-white">{title}</Text>

          {/* ⭐ Rating */}
          <View className="mt-2 flex-row items-center gap-5">
            <Text className="font-semibold text-yellow-400">
              ⭐ {(data.vote_average / 2).toFixed(1)}
            </Text>
            <Text className="text-gray-400">{releaseDate?.split('-')[0]}</Text>
            {runtime && <Text className="text-gray-400">{formatRuntime(runtime)}</Text>}
          </View>

          {/* Genres */}
          <View className="mt-4 flex-row flex-wrap gap-2">
            {data.genres?.map((g: any) => (
              <View key={g.id} className="rounded-full border border-gray-600 px-3 py-1">
                <Text className="text-sm text-gray-300">{g.name}</Text>
              </View>
            ))}
          </View>

          {/* Overview */}
          <Text className="mt-6 text-base leading-6 text-gray-300">{data.overview}</Text>

          {/* Tagline */}
          {data.tagline ? (
            <Text className="mt-4 italic text-gray-400">“{data.tagline}”</Text>
          ) : null}

          {/* Extra Info */}
          <View className="mt-6 space-y-2">
            {data.status && (
              <Text className="text-gray-300">
                <Text className="font-semibold text-white">Status:</Text> {data.status}
              </Text>
            )}
            {mediaType === 'movie' && data.budget > 0 && (
              <Text className="text-gray-300">
                <Text className="font-semibold text-white">Budget:</Text> $
                {data.budget.toLocaleString()}
              </Text>
            )}
            {mediaType === 'movie' && data.revenue > 0 && (
              <Text className="text-gray-300">
                <Text className="font-semibold text-white">Revenue:</Text> $
                {data.revenue.toLocaleString()}
              </Text>
            )}
            {data.spoken_languages?.length > 0 && (
              <Text className="text-gray-300">
                <Text className="font-semibold text-white">Languages:</Text>{' '}
                {data.spoken_languages.map((l: any) => l.english_name).join(', ')}
              </Text>
            )}
          </View>

          {/* Production Companies */}
          {data.production_companies?.length > 0 && (
            <View className="mt-6">
              <Text className="mb-2 text-lg font-semibold text-white">Production</Text>
              {data.production_companies.map((c: any) => (
                <Text key={c.id} className="text-gray-300">
                  • {c.name}
                </Text>
              ))}
            </View>
          )}

          {/* Cast (from credits) */}
          {data.credits?.cast?.length > 0 && (
            <View className="mt-6">
              <Text className="mb-2 text-lg font-semibold text-white">Top Cast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data.credits.cast.slice(0, 10).map((actor: any) => (
                  <View key={actor.id} className="mr-4 w-24 items-center">
                    <Image
                      source={{
                        uri: actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : 'https://via.placeholder.com/200x300?text=No+Image',
                      }}
                      className="h-32 w-24 rounded-lg"
                    />
                    <Text className="mt-1 text-center text-xs text-white" numberOfLines={1}>
                      {actor.name}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Watch Trailer Button */}
          {trailer && (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/trailer',
                  params: {
                    title,
                    year: releaseDate?.split('-')[0] ?? '',
                    runtime: runtime?.toString() ?? '',
                    overview: data.overview ?? '',
                    videoId: trailer.key,
                  },
                })
              }
              className="my-8 flex-row items-center justify-center rounded-full bg-red-600 py-4">
              <Feather name="play" size={20} color="white" />
              <Text className="ml-2 text-lg font-semibold text-white">Watch Trailer</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
