import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Ganti dengan TMDB API Key
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
  id: number | string;
  movieId: number | string;
  title: string;
  poster: string;
  rating: number;
  isTrending?: boolean;
  index?: number;
}

export async function getPopularMoviesChunk(startIndex: number, count: number): Promise<Movie[]> {
  const itemsPerPage = 20;
  const startPage = Math.floor(startIndex / itemsPerPage) + 1;
  const endPage = Math.floor((startIndex + count - 1) / itemsPerPage) + 1;

  let allMovies: any[] = [];

  for (let page = startPage; page <= endPage; page++) {
    const res = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
        api_key: API_KEY,
        page,
        language: 'en-US',
        },
    });

    console.log(`Page ${page}:`, res.data); // Tambahkan ini

    allMovies = allMovies.concat(res.data.results);
    }


  const offset = startIndex % itemsPerPage;
  const sliced = allMovies.slice(offset, offset + count);

  return sliced.map((movie: any) => ({
    id: movie.id,
    movieId: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `${BASE_IMAGE_URL}${movie.poster_path}`
      : '/default-poster.jpg',
    rating: movie.vote_average,
  }));
}
