import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { TrendingNow } from '@/components/sections/TrendingNow';
import { ExploreMore } from '@/components/sections/ExploreMore';
import { ScrollButton } from '@/components/ui/ScrollButton';
import { LoadingAnimation } from '@/components/ui/LoadingAnimation';
import { Footer } from '@/components/layout/Footer';
import { getTrendingMovies } from '@/services/tmdb';
import { useScrollRestoration } from '@/hooks/useScrollRestoration/useScrollRestoration';
import { BaseMovie } from '@/types/movie';
import { normalizeMovie } from '@/utils/normalize/normalizeMovie';
import { FloatingSearchResult } from '@/components/ui/FloatingSearchResult/FloatingSearchResult';

export const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<BaseMovie[]>([]);
  const [exploreMovies, setExploreMovies] = useState<BaseMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [exploreReady, setExploreReady] = useState(false);

  useScrollRestoration(loading || !exploreReady);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const trendingRes = await getTrendingMovies();
        const trending = trendingRes.results.map((m: any) =>
          normalizeMovie({ ...m, isTrending: true, index: m.id })
        );
        setTrendingMovies(trending);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const allMovies = React.useMemo(() => {
    const map = new Map<number, BaseMovie>();
    [...trendingMovies, ...exploreMovies].forEach((m) => map.set(m.id, m));
    return Array.from(map.values());
  }, [trendingMovies, exploreMovies]);

  if (loading) {
    return <LoadingAnimation text='Loading Content...' onlyText={true} />;
  }

  const trendingHeroMovie = trendingMovies[0];

  return (
    <div>
      <Header />
      <FloatingSearchResult movies={allMovies} />
      {trendingHeroMovie && <Hero {...trendingHeroMovie} />}
      <TrendingNow movies={trendingMovies} />
      <ExploreMore
        onReady={() => setExploreReady(true)}
        onMoviesLoaded={setExploreMovies}
      />
      <ScrollButton />
      <Footer />
    </div>
  );
};
