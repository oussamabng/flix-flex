import { tmdbClient } from './tmdb-client';
import { TMDbListResponse, TMDbMovie, TMDbTV, TMDbGenre } from '@/types/media';

export const tmdb = {
  getTopRatedMovies: () =>
    tmdbClient.get<TMDbListResponse<TMDbMovie>>('movie/top_rated', { page: 1 }),
  getTopRatedSeries: () => tmdbClient.get<TMDbListResponse<TMDbTV>>('tv/top_rated', { page: 1 }),
  getGenres: (type: 'movie' | 'tv') =>
    tmdbClient.get<{ genres: TMDbGenre[] }>(`genre/${type}/list`),
  getDetails: (type: 'movie' | 'tv', id: number | string) =>
    tmdbClient.get<any>(`${type}/${id}`, {
      append_to_response: 'videos,credits',
    }),
  search: (type: 'movie' | 'tv', query: string, page: number = 1) =>
    tmdbClient.get<TMDbListResponse<TMDbMovie | TMDbTV>>(`search/${type}`, {
      query,
      page,
    }),
  getList: (type: 'movie' | 'tv', category: string, page = 1) =>
    tmdbClient.get<TMDbListResponse<TMDbMovie | TMDbTV>>(`${type}/${category}`, { page }),
};
