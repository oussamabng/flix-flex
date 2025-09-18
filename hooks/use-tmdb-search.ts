import { useEffect, useState } from 'react';
import { MediaItem } from '@/types/media';
import { mapToMediaItems } from '@/utils/tmdb.mapper';
import { getApiError } from '@/utils/get-api-error';
import { tmdb } from '@/api/tmdb';

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

        const json = await tmdb.search(mediaType, query, 1, controller.signal);

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
