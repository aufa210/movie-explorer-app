import React, { useEffect, useState, useTransition } from 'react';
import clsx from 'clsx';
import styles from './ExploreMore.module.scss';
import { ScrollRevealItem } from '@/components/ui/ScrollRevealItem';
import { MovieCard } from '@/components/ui/MovieCard';
import { Button } from '@/components/ui/Button';
import { LoadingAnimation } from '@/components/ui/LoadingAnimation';
import { getPopularMoviesChunk } from '@/services/getPopularMoviesChunk';
import { useGridLayout } from '@/hooks/useGridLayout/useGridLayout';
import { useDisableLastRow } from '@/hooks/useDisableLastRow/useDisableLastRow';
import { removeDuplicateMovies } from '@/utils/removeDuplicateMovies';
import type { BaseMovie } from '@/types/movie';

// 🔁 In-memory cache
const memoryCache = new Map<number, BaseMovie[]>();
const STORAGE_KEY = 'exploreMoreState_v2';
const TTL_MS = 1000 * 60 * 5; // 5 minutes

interface ExploreMoreProps {
  onReady?: () => void;
  onMoviesLoaded?: (movies: BaseMovie[]) => void;
}

const INITIAL_LOAD = 50;
const LOAD_STEP = 25;

export const ExploreMore: React.FC<ExploreMoreProps> = ({
  onReady,
  onMoviesLoaded,
}) => {
  const { gridRef, lastRowIndices, recalculateGrid } = useGridLayout();
  const [movies, setMovies] = useState<BaseMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxVisible, setMaxVisible] = useState(INITIAL_LOAD);
  const [layoutReady, setLayoutReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // 🔄 Fetch with memory + storage cache
  const fetchAndCacheMovies = async (start: number, count: number) => {
    const result = await getPopularMoviesChunk(start, count, memoryCache);
    const merged = removeDuplicateMovies([...movies, ...result]);
    setMovies(merged);
    setCurrentPage((prev) => prev + 1);
    setMaxVisible((prev) => prev + count);
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        currentPage: currentPage + 1,
        maxVisible: maxVisible + count,
        movies: merged,
      })
    );
    onMoviesLoaded?.(merged);
  };

  // 🔁 Init state from sessionStorage or fetch
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const isExpired = Date.now() - parsed.timestamp > TTL_MS;

        if (!isExpired && parsed.movies?.length) {
          setMovies(parsed.movies);
          setCurrentPage(parsed.currentPage);
          setMaxVisible(parsed.maxVisible);
          setLayoutReady(false);
          onMoviesLoaded?.(parsed.movies);
          return;
        }
      } catch {
        // fallback to fetching
      }
    }

    setIsLoading(true);
    getPopularMoviesChunk(0, INITIAL_LOAD, memoryCache).then((result) => {
      const unique = removeDuplicateMovies(result);
      setMovies(unique);
      setCurrentPage(1);
      setMaxVisible(INITIAL_LOAD);
      onMoviesLoaded?.(unique);
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          currentPage: 1,
          maxVisible: INITIAL_LOAD,
          movies: unique,
        })
      );
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    recalculateGrid();
  }, [movies, maxVisible]);

  useEffect(() => {
    if (
      movies.length > 0 &&
      maxVisible >= movies.length &&
      lastRowIndices.length > 0 &&
      !layoutReady
    ) {
      setLayoutReady(true);
      onReady?.();
    }
  }, [movies, maxVisible, lastRowIndices, layoutReady, onReady]);

  const handleLoadMore = () => {
    setIsLoading(true);
    startTransition(() => {
      fetchAndCacheMovies(maxVisible, LOAD_STEP).finally(() => {
        setIsLoading(false);
      });
    });
  };

  const visibleMovies = React.useMemo(
    () => movies.slice(0, Math.min(maxVisible, movies.length)),
    [movies, maxVisible]
  );
  const disabledFlags = useDisableLastRow(visibleMovies, lastRowIndices);

  return (
    <section className={styles.newReleaseSection}>
      <h2>Explore More</h2>
      <div ref={gridRef} className={styles.gridWrapper}>
        {visibleMovies.map((movie, index) => (
          <ScrollRevealItem
            key={movie.id}
            className={clsx(styles.grow, styles.cardReveal)}
          >
            <MovieCard {...movie} isDisabled={disabledFlags[index]} />
          </ScrollRevealItem>
        ))}

        <div className={styles.loadMoreWrapper}>
          {isLoading ? (
            <LoadingAnimation text='Loading Data...' />
          ) : (
            <Button
              variant='secondary'
              onClick={handleLoadMore}
              className={styles.button}
              disabled={isPending}
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
