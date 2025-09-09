import { useEffect, useState } from 'react';
import { MediaItem, TMDbListResponse, TMDbMovie, TMDbTV } from '@/types/media';
import { tmdbClient } from '@/api/tmdb-client';
import { mapToMediaItems } from '@/utils/tmdb.mapper';
import { getApiError } from '@/utils/get-api-error';

export function useTMDbSearch(mediaType: 'movie' | 'tv', query: string) {
  const [data, setData] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setData([]);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const json = await tmdbClient.get<TMDbListResponse<TMDbMovie | TMDbTV>>(
          `search/${mediaType}`,
          { query: encodeURIComponent(query) }
        );

        setData(mapToMediaItems(json.results, mediaType === 'tv'));
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(getApiError(err));
        }
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchData, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, mediaType]);

  return { data, loading, error };
}
