import { useEffect, useState } from 'react';
import { MediaItem, TMDbListResponse, TMDbMovie, TMDbTV } from '@/types/media';
import { tmdbClient } from '@/api/tmdb-client';
import { mapToMediaItems } from '@/utils/tmdb.mapper';
import { getApiError } from '@/utils/get-api-error';

interface PaginatedResult {
  data: MediaItem[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export function useTMDb(
  type: 'movie' | 'tv',
  category: string,
  perPage: number = 10
): PaginatedResult {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = async (pageNum: number, replace = false) => {
    try {
      setLoading(true);
      setError(null);

      const json = await tmdbClient.get<TMDbListResponse<TMDbMovie | TMDbTV>>(
        `${type}/${category}`,
        { page: pageNum }
      );

      const mapped = mapToMediaItems(json.results.slice(0, perPage), type === 'tv');
      setHasMore(json.page < json.total_pages);

      setData((prev) => (replace ? mapped : [...prev, ...mapped]));
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, category, perPage]);

  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPage(nextPage);
    }
  };

  const refresh = () => {
    setPage(1);
    fetchPage(1, true);
  };

  return { data, loading, error, page, hasMore, loadMore, refresh };
}
