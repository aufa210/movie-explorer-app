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
}

const INITIAL_LOAD = 60;
const LOAD_STEP = 20;
const STORAGE_KEY = 'exploreMoreState';

export const ExploreMore: React.FC<ExploreMoreProps> = ({ onReady }) => {
  const { gridRef, cols, lastRowIndices, recalculateGrid } = useGridLayout();
  const [movies, setMovies] = useState<BaseMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxVisible, setMaxVisible] = useState(INITIAL_LOAD);
  const [isLoading, setIsLoading] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);

  // Restore and fetch initial data
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMovies(parsed.movies);
        setCurrentPage(parsed.currentPage);
        setMaxVisible(parsed.maxVisible);
        setLayoutReady(false);
      } catch {
        fetchInitialMovies();
      }
    } else fetchInitialMovies();

    async function fetchInitialMovies() {
      setIsLoading(true);
      try {
        const initial = await getPopularMoviesChunk(0, INITIAL_LOAD);
        setMovies(removeDuplicateMovies(initial));
        setCurrentPage(1);
        setMaxVisible(INITIAL_LOAD);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  // Save to sessionStorage on movies, currentPage or maxVisible change
  useEffect(() => {
    if (movies.length) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ movies, currentPage, maxVisible })
      );
    }
  }, [movies, currentPage, maxVisible]);

  // Recalculate grid on changes
  useEffect(() => {
    recalculateGrid();
  }, [movies, maxVisible, recalculateGrid]);

  // Trigger onReady once layout is ready
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
      const startIndex = maxVisible; // start dari jumlah visible item sekarang
      const newMovies = await getPopularMoviesChunk(startIndex, LOAD_STEP);
      setMovies((prev) => removeDuplicateMovies([...prev, ...newMovies]));
      setCurrentPage((prev) => prev + 1);
      setMaxVisible((prev) => prev + LOAD_STEP);
    } finally {
      setIsLoading(false);
    }
  }, [maxVisible]);

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
