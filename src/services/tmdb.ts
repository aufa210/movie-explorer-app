const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

async function tmdbFetch(path: string, params: Record<string, any> = {}) {
  const url = new URL(`${BASE_URL}/${path}`);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.json();
    console.error('TMDb API error', err);
    throw new Error(`TMDb fetch error: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Cari film berdasarkan query
 */
export async function searchMovies(query: string, page = 1) {
  const data = await tmdbFetch('search/movie', { query, page, language: 'en-US' });
  return data.results as any[];
}

/**
 * Ambil detail film berdasarkan ID
 */
export async function getMovieDetails(id: number) {
  return tmdbFetch(`movie/${id}`, { language: 'en-US' });
}

/**
 * Ambil daftar "Now Playing" film
 */
export async function getNowPlaying(page = 1) {
  const data = await tmdbFetch('movie/now_playing', { page, language: 'en-US' });
  return data.results as any[];
}

/**
 * Ambil daftar "Top Rated" film
 */
export async function getTopRated(page = 1) {
  const data = await tmdbFetch('movie/top_rated', { page, language: 'en-US' });
  return data.results as any[];
}

/**
 * Ambil cast & crew film berdasarkan ID
 */
export async function getMovieCredits(id: number) {
  const data = await tmdbFetch(`movie/${id}/credits`);
  return data as any;
}

// Usage example (later in UI):
// import { getNowPlaying, searchMovies, getMovieDetails } from '@/services/tmdb';

// Remember to set up your .env.local:
// VITE_TMDB_API_KEY=YOUR_API_KEY_HERE
// VITE_TMDB_BASE_URL=https://api.themoviedb.org/3