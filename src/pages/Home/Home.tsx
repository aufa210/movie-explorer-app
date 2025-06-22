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
import { FloatingSearchResult } from '@/components/ui/FloatingSearchResult/FloatingSearchResult'; // ✅ Tambahan

export const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<BaseMovie[]>([]);
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

  if (loading) {
    return <LoadingAnimation text='Loading Content...' onlyText={true} />;
  }

  // First trending movie for Hero section
  const trendingHeroMovie = trendingMovies[0];

  return (
    <div>
      <Header />
      {/* ✅ Hasil pencarian live */}
      <FloatingSearchResult movies={trendingMovies} />

      {trendingHeroMovie && <Hero {...trendingHeroMovie} />}
      <TrendingNow movies={trendingMovies} />
      <ExploreMore onReady={() => setExploreReady(true)} />
      <ScrollButton />
      <Footer />
    </div>
  );
};
