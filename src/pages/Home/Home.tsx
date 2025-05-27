import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { TrendingNow } from '@/components/sections/TrendingNow';
import { ExploreMore } from '@/components/sections/ExploreMore';
import { ScrollButton } from '@/components/ui/ScrollButton';
import { Footer } from '@/components/layout/Footer';
import { getTrendingMovies } from '@/services/tmdb';
import { useScrollRestoration } from '@/hooks/useScrollRestoration/useScrollRestoration';

interface Movie {
  title: string;
  poster: string;
  rating: number;
  isTrending?: boolean;
  backdropUrl?: string;
  overview?: string;
  id?: number | string;
  index?: number;
}

export const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [exploreReady, setExploreReady] = useState(false);

  // Scroll restoration hook: wait until loading and explore section is ready
  useScrollRestoration(loading || !exploreReady);

  // Fetch trending movies on mount
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const trendingRes = await getTrendingMovies();

        // Map TMDB data to your Movie interface
        const trending = trendingRes.results.map((m: any) => ({
          title: m.title,
          poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          rating: m.vote_average,
          isTrending: true,
          backdropUrl: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
          overview: m.overview,
          id: m.id,
          index: m.id,
        }));

        setTrendingMovies(trending);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'fixed',
          color: 'white',
          textAlign: 'center',
          marginTop: '200px',
        }}
      >
        Loading...
      </div>
    );
  }

  // First trending movie for Hero section
  const trendingHeroMovie = trendingMovies[6];

  return (
    <div>
      <Header />
      {trendingHeroMovie && (
        <Hero
          backdropUrl={trendingHeroMovie.backdropUrl}
          title={trendingHeroMovie.title}
          overview={trendingHeroMovie.overview}
          movieId={trendingHeroMovie.id}
        />
      )}
      <TrendingNow movies={trendingMovies} />
      <ExploreMore onReady={() => setExploreReady(true)} />
      <ScrollButton />
      <Footer />
    </div>
  );
};
