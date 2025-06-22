import axios from 'axios';
import { BaseMovie } from '@/types/movie';
import { normalizeMovie } from '@/utils/normalize/normalizeMovie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Fetch movie detail overview if not available in /discover/movie
 */
async function fetchMovieOverview(movieId: number): Promise<string> {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return res.data?.overview || 'No overview available.';
  } catch (error) {
    console.warn(`❌ Failed to fetch detail for movie ${movieId}`, error);
    return 'No overview available.';
  }
}

export async function getPopularMoviesChunk(
  startIndex: number,
  count: number
): Promise<BaseMovie[]> {
  const itemsPerPage = 20;
  const startPage = Math.floor(startIndex / itemsPerPage) + 1;
  const endPage = Math.floor((startIndex + count - 1) / itemsPerPage) + 1;

  let allMovies: any[] = [];

  try {
    for (let page = startPage; page <= endPage; page++) {
      const res = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          page,
          language: 'en-US',
        },
      });
      allMovies = allMovies.concat(res.data.results);
    }
  } catch (error) {
    console.error('❌ Error fetching movie list from /discover/movie', error);
    return [];
  }

  const offset = startIndex % itemsPerPage;
  const sliced = allMovies.slice(offset, offset + count);

  const normalizedMovies: BaseMovie[] = await Promise.all(
    sliced.map(async (rawMovie, idx) => {
      const overview =
        rawMovie.overview && rawMovie.overview.trim().length > 0
          ? rawMovie.overview
          : await fetchMovieOverview(rawMovie.id);

      const enrichedMovie = {
        ...rawMovie,
        overview,
        index: startIndex + idx,
        isTrending: false,
      };

      return normalizeMovie(enrichedMovie);
    })
  );

  return normalizedMovies;
}
