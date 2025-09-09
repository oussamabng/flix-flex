import React from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { PosterImage } from '@/components/ui/poster-image';
import { RatingStars } from '@/components/ui/rating-stars';
import { SkeletonBox } from './skeleton-box';
import { MediaItem } from '@/types/media';

interface HorizontalListProps {
  title: string;
  items?: MediaItem[];
  showRating?: boolean;
  loading?: boolean;
  error?: string | null;
  skeletonCount?: number;
}

export const HorizontalList = ({
  title,
  items = [],
  showRating = true,
  loading = false,
  error = null,
  skeletonCount = 5,
}: HorizontalListProps) => {
  const router = useRouter();

  const goToDetails = (item: MediaItem) => {
    router.push({
      pathname: '/(media)/[mediaType]/[id]',
      params: { mediaType: item.mediaType, id: String(item.id) },
    });
  };

  return (
    <View className="m mb-6 pt-6">
      <Text className="mb-3 px-4 text-xl font-bold text-white">{title}</Text>
      {error && <Text className="px-4 text-sm text-red-500">{error}</Text>}

      <FlatList<MediaItem>
        horizontal
        data={loading ? (Array.from({ length: skeletonCount }) as MediaItem[]) : items}
        keyExtractor={(item, i) => String(item?.id ?? i)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item, index }) =>
          loading ? (
            <View className="mr-10 w-40">
              <SkeletonBox width={160} height={224} />
              <SkeletonBox width={120} height={14} className="mt-2" />
            </View>
          ) : (
            <TouchableOpacity onPress={() => goToDetails(item)} activeOpacity={0.8}>
              <View className="mr-10 w-40">
                <PosterImage uri={item.poster} width={160} height={224} />
                <Text numberOfLines={1} className="mt-2 font-semibold text-white">
                  {item.title}
                </Text>
                {showRating && item.rating !== undefined && <RatingStars value={item.rating} />}
              </View>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
};
