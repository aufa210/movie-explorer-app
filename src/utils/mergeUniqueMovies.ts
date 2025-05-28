import { Movie } from "@/types";

export function mergeUniqueMovies(
  existing: Movie[],
  incoming: Movie[]
): Movie[] {
  const seen = new Set(existing.map((movie) => movie.id || movie.movieId));
  const filtered = incoming.filter(
    (movie) => !seen.has(movie.id || movie.movieId)
  );
  return [...existing, ...filtered];
}
