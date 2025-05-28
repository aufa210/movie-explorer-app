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

interface Movie {
  id: number | string;
  movieId: number | string;
  title: string;
  poster: string;
  rating: number;
  isTrending?: boolean;
  index?: number;
}

interface ExploreMoreProps {
  onReady?: () => void;
}

const INITIAL_LOAD = 50;
const LOAD_STEP = 25;
const STORAGE_KEY = 'exploreMoreState';

export const ExploreMore: React.FC<ExploreMoreProps> = ({ onReady }) => {
  const { gridRef, cols, lastRowIndices, recalculateGrid } = useGridLayout();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxVisible, setMaxVisible] = useState(INITIAL_LOAD);
  const [layoutReady, setLayoutReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Restore from sessionStorage or fetch initial batch
  useEffect(() => {
    const savedState = sessionStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const { movies, currentPage, maxVisible } = JSON.parse(savedState);
        setMovies(movies);
        setCurrentPage(currentPage);
        setMaxVisible(maxVisible);
        setLayoutReady(false);
      } catch (e) {
        console.error('Failed to parse saved ExploreMore state:', e);
        fetchInitialMovies();
      }
    } else {
      fetchInitialMovies();
    }

    async function fetchInitialMovies() {
      const initial = await getPopularMoviesChunk(0, INITIAL_LOAD);
      setMovies(removeDuplicateMovies(initial));
      setCurrentPage(1);
      setMaxVisible(INITIAL_LOAD);
      setLayoutReady(false);
    }
  }, []);

  // Save to sessionStorage on changes
  useEffect(() => {
    if (movies.length > 0) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ movies, currentPage, maxVisible })
      );
    }
  }, [movies, currentPage, maxVisible]);

  // Recalculate grid layout when movies or maxVisible changes
  useEffect(() => {
    recalculateGrid();
  }, [movies, maxVisible, recalculateGrid]);

  // Trigger onReady callback only once when layout is ready
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

  const handleLoadMore = async () => {
    setIsLoading(true);
    const startIndex = currentPage * LOAD_STEP;
    const newMovies = await getPopularMoviesChunk(startIndex, LOAD_STEP);

    console.log(
      `Fetched page ${currentPage + 1}`,
      newMovies.map((m) => ({ id: m.movieId || m.id, title: m.title }))
    );

    setMovies((prev) => removeDuplicateMovies([...prev, ...newMovies]));
    setCurrentPage((prev) => prev + 1);
    setMaxVisible((prev) => prev + LOAD_STEP);
    setIsLoading(false);
  };

  const visibleMovies = movies.slice(0, Math.min(maxVisible, movies.length));
  const disabledFlags = useDisableLastRow(visibleMovies, cols);

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
              className={styles.button}
              variant='secondary'
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
