export const fetchTrailerKey = async (movieId: number): Promise<string | null> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    );
    const data = await res.json();
    const trailer = data.results.find(
      (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
    );
    return trailer?.key ?? null;
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};
