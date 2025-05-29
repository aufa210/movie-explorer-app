import { NormalizedMovieDetail } from '@/types/movie';

export function normalizeMovieDetail(raw: any): NormalizedMovieDetail {
  return {
    id: raw.id,
    title: raw.title,
    releaseDate: raw.release_date,
    rating: raw.vote_average,
    genre: raw.genres?.[0]?.name ?? 'Unknown',
    ageLimit: raw.adult ? 18 : 13,
    posterUrl: `https://image.tmdb.org/t/p/w500${raw.poster_path}`,
    backdropUrl: `https://image.tmdb.org/t/p/original${raw.backdrop_path}`,
    overview: raw.overview,
    casts: raw.credits?.cast?.slice(0, 5).map((cast: any) => ({
      image: `https://image.tmdb.org/t/p/w500${cast.profile_path}`,
      name: cast.name,
      character: cast.character,
    })) ?? [],
  };
}
