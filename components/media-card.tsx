import { TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { PosterImage } from '@/components/ui/poster-image';
import { RatingStars } from '@/components/ui/rating-stars';
import { useGenres } from '@/contexts/genre-context';

export type MediaCardProps = {
  id?: number;
  mediaType?: 'movie' | 'tv';
  title?: string;
  overview?: string;
  poster?: string;
  rating?: number;
  genreIds?: number[]; // ✅ now supports multiple genres
  alignPosterRight?: boolean;
  loading?: boolean;
};

export const MediaCard = ({
  id,
  mediaType = 'movie',
  title,
  overview,
  poster,
  rating,
  genreIds = [],
  alignPosterRight = false,
  loading = false,
}: MediaCardProps) => {
  const router = useRouter();
  const { movieGenres, tvGenres } = useGenres();

  // Resolve all genre names
  const genreNames = genreIds
    .map((gid) => (mediaType === 'tv' ? tvGenres[gid] : movieGenres[gid]))
    .filter(Boolean);

  if (loading) {
    return (
      <View className="mb-4 flex-row rounded-2xl bg-[#1c1c1c] p-4">
        <PosterImage width={96} height={128} />
        <View className="flex-1 justify-center px-3">
          <View className="h-5 w-32 rounded bg-gray-700/50" />
          <View className="mt-2 h-4 w-20 rounded bg-gray-700/40" />
          <View className="mt-2 h-4 w-28 rounded bg-gray-700/40" />
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => id && router.push(`/${mediaType}/${id}`)}
      activeOpacity={0.8}
      className="mb-4 flex-row rounded-2xl bg-[#1c1c1c] p-4">
      {!alignPosterRight && <PosterImage uri={poster} width={96} height={128} />}

      <View className="flex-1 justify-center px-3">
        {/* Title */}
        {title && <Text className="text-xl font-bold text-white">{title}</Text>}

        {/* Genres */}
        {genreNames.length > 0 && (
          <Text className="mt-1 text-sm text-gray-400">{genreNames.join(', ')}</Text>
        )}

        {/* Rating */}
        {rating !== undefined && <RatingStars value={rating} />}

        {/* Overview */}
        {overview && (
          <Text numberOfLines={2} className="mt-1 text-base text-gray-300">
            {overview}
          </Text>
        )}
      </View>

      {alignPosterRight && <PosterImage uri={poster} width={96} height={128} />}
    </TouchableOpacity>
  );
};
