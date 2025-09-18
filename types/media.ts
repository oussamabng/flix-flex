export interface MediaItem {
  id: number;
  title: string;
  poster: string;
  rating: number;
  overview?: string;
  genreIds: number[];
  mediaType: 'movie' | 'tv';
}

export interface TMDbGenre {
  id: number;
  name: string;
}

export interface TMDbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids: number[];
}

export interface TMDbTV {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids: number[];
}

export interface TMDbListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDbCredits {
  cast: { id: number; name: string; character: string; profile_path: string | null }[];
  crew: { id: number; name: string; job: string; profile_path: string | null }[];
}

export interface TMDbVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export type TMDbDetails =
  | (TMDbMovie & { videos?: { results: TMDbVideo[] }; credits?: TMDbCredits })
  | (TMDbTV & { videos?: { results: TMDbVideo[] }; credits?: TMDbCredits });
