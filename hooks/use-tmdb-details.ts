import { useEffect, useState } from 'react';
import { getApiError } from '@/utils/get-api-error';
import { tmdb } from '@/api/tmdb';
import { TMDbDetails } from '@/types/media';

export function useTMDbDetails(mediaType: 'movie' | 'tv', id: string | number) {
  const [data, setData] = useState<TMDbDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchDetails() {
      try {
        setLoading(true);
        setError(null);

        const json = await tmdb.getDetails(mediaType, id);

        if (isMounted) setData(json);
      } catch (err) {
        if (isMounted) setError(getApiError(err));
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDetails();
    return () => {
      isMounted = false;
    };
  }, [mediaType, id]);

  return { data, loading, error };
}
