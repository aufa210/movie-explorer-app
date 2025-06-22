import React, { useEffect, useState } from 'react';
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

interface ExploreMoreProps {
  onReady?: () => void;
  onMoviesLoaded?: (movies: BaseMovie[]) => void;
}

const INITIAL_LOAD = 50;
const LOAD_STEP = 25;
const STORAGE_KEY = 'exploreMoreState';
const STORAGE_VERSION = 2; // ✅ Ganti jika struktur movie berubah

export const ExploreMore: React.FC<ExploreMoreProps> = ({
  onReady,
  onMoviesLoaded,
}) => {
  const { gridRef, cols, lastRowIndices, recalculateGrid } = useGridLayout();
  const [movies, setMovies] = useState<BaseMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxVisible, setMaxVisible] = useState(INITIAL_LOAD);
  const [isLoading, setIsLoading] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.version !== STORAGE_VERSION)
          throw new Error('Cache outdated');

        setMovies(parsed.movies);
        setCurrentPage(parsed.currentPage);
        setMaxVisible(parsed.maxVisible);
        setLayoutReady(false);
        onMoviesLoaded?.(parsed.movies);
        return;
      } catch {
        console.warn('⚠️ Cache invalid. Refetching from network...');
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    fetchInitialMovies();

    async function fetchInitialMovies() {
      setIsLoading(true);
      try {
        const initial = await getPopularMoviesChunk(0, INITIAL_LOAD);
        const unique = removeDuplicateMovies(initial);
        setMovies(unique);
        setCurrentPage(1);
        setMaxVisible(INITIAL_LOAD);
        onMoviesLoaded?.(unique);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (movies.length) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: STORAGE_VERSION,
          movies,
          currentPage,
          maxVisible,
        })
      );
    }
  }, [movies, currentPage, maxVisible]);

  useEffect(() => {
    recalculateGrid();
  }, [movies, maxVisible, recalculateGrid]);

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

  const handleLoadMore = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const startIndex = maxVisible;
      const newMovies = await getPopularMoviesChunk(startIndex, LOAD_STEP);
      const updated = removeDuplicateMovies([...movies, ...newMovies]);
      setMovies(updated);
      setCurrentPage((prev) => prev + 1);
      setMaxVisible((prev) => prev + LOAD_STEP);
      onMoviesLoaded?.(updated);
    } finally {
      setIsLoading(false);
    }
  }, [maxVisible, movies, onMoviesLoaded]);

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
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
