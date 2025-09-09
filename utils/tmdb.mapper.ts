import { MediaItem, TMDbMovie, TMDbTV } from '@/types/media';

export function mapToMediaItems(results: (TMDbMovie | TMDbTV)[], isTV = false): MediaItem[] {
  return results
    .map((item): MediaItem | null => {
      if (!item.poster_path || !item.vote_average) return null;

      return {
        id: item.id,
        title: isTV ? (item as TMDbTV).name : (item as TMDbMovie).title,
        poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        rating: item.vote_average,
        overview: item.overview || undefined,
        genreIds: item.genre_ids ?? [],
        mediaType: isTV ? 'tv' : 'movie',
      };
    })
    .filter((item): item is MediaItem => item !== null);
}
