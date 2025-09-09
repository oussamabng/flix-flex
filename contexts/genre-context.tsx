import { createContext, useContext, useEffect, useState } from 'react';
import { tmdbClient } from '@/api/tmdb-client';

type GenreMap = Record<number, string>;
interface GenreContextValue {
  movieGenres: GenreMap;
  tvGenres: GenreMap;
  loading: boolean;
}

const GenreContext = createContext<GenreContextValue>({
  movieGenres: {},
  tvGenres: {},
  loading: true,
});

export function GenreProvider({ children }: { children: React.ReactNode }) {
  const [movieGenres, setMovieGenres] = useState<GenreMap>({});
  const [tvGenres, setTvGenres] = useState<GenreMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      tmdbClient.get<{ genres: { id: number; name: string }[] }>('genre/movie/list'),
      tmdbClient.get<{ genres: { id: number; name: string }[] }>('genre/tv/list'),
    ])
      .then(([movies, tv]) => {
        setMovieGenres(Object.fromEntries(movies.genres.map((g) => [g.id, g.name])));
        setTvGenres(Object.fromEntries(tv.genres.map((g) => [g.id, g.name])));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <GenreContext.Provider value={{ movieGenres, tvGenres, loading }}>
      {children}
    </GenreContext.Provider>
  );
}

export const useGenres = () => useContext(GenreContext);
