interface Movie {
  id: number | string;
  movieId: number | string;
}

export function removeDuplicateMovies<T extends Movie>(movies: T[]): T[] {
  const seen = new Set();
  return movies.filter((movie) => {
    const id = movie.movieId ?? movie.id;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}
