import { createContext, useContext, useEffect, useState } from 'react';
import { tmdb } from '@/api/tmdb';

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
    Promise.all([tmdb.getGenres('movie'), tmdb.getGenres('tv')])
      .then(([movies, tv]) => {
        setMovieGenres(Object.fromEntries(movies.genres.map((g) => [g.id, g.name])));
        setTvGenres(Object.fromEntries(tv.genres.map((g) => [g.id, g.name])));
      })
      .catch((err) => {
        console.error('Failed to load genres', err);
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
