import { useState } from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import { Container } from '@/components/container';
import { Header } from '@/components/layouts/header';
import { HorizontalList } from '@/components/horizontal-list';
import { MediaCard } from '@/components/media-card';
import { useTMDb } from '@/hooks/use-tmdb';
import { useTMDbSearch } from '@/hooks/use-tmdb-search';
import { MediaItem } from '@/types/media';

interface MediaListScreenProps {
  mediaType: 'movie' | 'tv';
  topTitle: string;
  allTitle: string;
}

export function MediaListScreen({ mediaType, topTitle, allTitle }: MediaListScreenProps) {
  const [query, setQuery] = useState('');

  const {
    data: topItems,
    loading: topLoading,
    error: topError,
  } = useTMDb(mediaType, 'top_rated', 5);

  const {
    data: paginatedItems,
    loading,
    error,
    loadMore,
    hasMore,
  } = useTMDb(mediaType, 'popular', 10);

  const {
    data: searchResults,
    loading: searchLoading,
    error: searchError,
  } = useTMDbSearch(mediaType, query);

  const activeData: MediaItem[] = query ? searchResults : paginatedItems;
  const activeLoading = query ? searchLoading : loading;
  const activeError = query ? searchError : error;

  return (
    <Container>
      <Header onSearch={setQuery} />

      <FlatList<MediaItem>
        data={activeLoading && activeData.length === 0 ? [] : activeData}
        keyExtractor={(item, index) => String(item.id ?? index)}
        onEndReached={query ? undefined : loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          !activeLoading && query ? (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-lg text-gray-400">No results found</Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          query ? null : (
            <>
              <HorizontalList
                title={topTitle}
                items={topItems}
                loading={topLoading}
                error={topError}
                showRating
              />
              <Text className="mb-3 px-4 pt-6 text-xl font-bold text-white">{allTitle}</Text>
            </>
          )
        }
        ListFooterComponent={
          activeLoading && hasMore ? <ActivityIndicator color="white" className="my-4" /> : null
        }
        renderItem={({ item }) => (
          <View className="px-3">
            <MediaCard
              id={item.id}
              mediaType={mediaType}
              title={item.title}
              overview={item.overview}
              poster={item.poster}
              rating={item.rating}
              genreIds={item.genreIds}
              loading={activeLoading && !item.id}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {activeError && (
        <View className="p-4">
          <Text className="text-red-500">{activeError}</Text>
        </View>
      )}
    </Container>
  );
}
