const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

const fetchFromTMDB = async (
  endpoint: string,
  query: Record<string, string> = {}
) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);

  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB fetch error: ${res.statusText}`);
  return res.json();
};

export const getTrendingMovies = () => {
  return fetchFromTMDB('/trending/movie/week');
};

export const getPopularMovies = async () => {
  const res = await fetchFromTMDB('/movie/popular');
  // Sort descending berdasarkan rating (vote_average)
  res.results.sort((a: any, b: any) => b.vote_average - a.vote_average);
  return res;
};
