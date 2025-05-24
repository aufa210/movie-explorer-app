// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { TrendingNow } from '@/components/sections/TrendingNow';
import { ExploreMore } from '@/components/sections/ExploreMore';
import { Footer } from '@/components/layout/Footer';
import { getTrendingMovies, getPopularMovies } from '@/services/tmdb';

export const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [exploreMovies, setExploreMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const trendingRes = await getTrendingMovies();
        const popularRes = await getPopularMovies();

        const trending = trendingRes.results.map((m: any) => ({
          id: m.id,
          title: m.title,
          poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          rating: m.vote_average,
          isTrending: true,
          heroBackground: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
          overview: m.overview,
          index: m.id,
        }));

        const explore = popularRes.results.map((m: any) => ({
          id: m.id,
          title: m.title,
          poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          rating: m.vote_average,
          isTrending: false,
        }));

        setTrendingMovies(trending);
        setExploreMovies(explore);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const trendingHeroMovie = trendingMovies[0];

  return (
    <div>
      <Header />
      {trendingHeroMovie && (
        <Hero
          backdropUrl={trendingHeroMovie.heroBackground}
          title={trendingHeroMovie.title}
          overview={trendingHeroMovie.overview}
          movieId={trendingHeroMovie.id}
        />
      )}
      <TrendingNow movies={trendingMovies} />
      <ExploreMore movies={exploreMovies} />
      <Footer />
    </div>
  );
};
