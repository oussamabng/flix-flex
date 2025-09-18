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

export interface TMDbSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDbProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface TMDbMovieDetails extends TMDbMovie {
  media_type: 'movie';
  release_date: string;
  runtime: number;
  tagline?: string;
  status?: string;
  budget?: number;
  revenue?: number;
  spoken_languages: TMDbSpokenLanguage[];
  production_companies: TMDbProductionCompany[];
  genres: TMDbGenre[];
  videos?: { results: TMDbVideo[] };
  credits?: TMDbCredits;
}

export interface TMDbTVDetails extends TMDbTV {
  media_type: 'tv';
  name: string;
  first_air_date: string;
  episode_run_time: number[];
  tagline?: string;
  status?: string;
  spoken_languages: TMDbSpokenLanguage[];
  production_companies: TMDbProductionCompany[];
  genres: TMDbGenre[];
  videos?: { results: TMDbVideo[] };
  credits?: TMDbCredits;
}

export type TMDbDetails = TMDbMovieDetails | TMDbTVDetails;
