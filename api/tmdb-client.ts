import { config } from '@/utils/config';
import { fetchJson } from './fetcher';

const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbClient = {
  get: async <T>(path: string, params: Record<string, string | number> = {}): Promise<T> => {
    const url = new URL(`${BASE_URL}/${path}`);
    url.searchParams.set('api_key', config.tmdbKey);
    url.searchParams.set('language', 'en-US');
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

    return fetchJson<T>(url.toString());
  },
};
