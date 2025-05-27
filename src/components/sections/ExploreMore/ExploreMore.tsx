import React, { useEffect, useState } from 'react';
import { ScrollRevealItem } from '@/components/ui/ScrollRevealItem';
import { MovieCard } from '@/components/ui/MovieCard';
import { Button } from '@/components/ui/Button';
import clsx from 'clsx';
import styles from './ExploreMore.module.scss';
import { getPopularMoviesChunk } from '@/services/getPopularMoviesChunk';
import { useGridLayout } from '@/hooks/useGridLayout/useGridLayout';
import { useDisableLastRow } from '@/hooks/useDisableLastRow/useDisableLastRow';

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

const LOAD_STEP = 100;

export const ExploreMore: React.FC<ExploreMoreProps> = ({ onReady }) => {
  const { gridRef, cols, lastRowIndices, recalculateGrid } = useGridLayout();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxVisible, setMaxVisible] = useState(LOAD_STEP);
  const [layoutReady, setLayoutReady] = useState(false);

  // Fetch initial batch of movies once component mounts
  useEffect(() => {
    const fetchInitialMovies = async () => {
      const initial = await getPopularMoviesChunk(0, LOAD_STEP);
      setMovies(initial);
      setCurrentPage(1);
      setMaxVisible(LOAD_STEP);
      setLayoutReady(false); // reset layoutReady for fresh fetch
    };

    fetchInitialMovies();
  }, []);

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

  // Handler to load more movies
  const handleLoadMore = async () => {
    const startIndex = currentPage * LOAD_STEP;
    const newMovies = await getPopularMoviesChunk(startIndex, LOAD_STEP);

    setMovies((prev) => [...prev, ...newMovies]);
    setCurrentPage((prev) => prev + 1);
    setMaxVisible((prev) => prev + LOAD_STEP);
  };

  // Slice movies to show only up to maxVisible
  const visibleMovies = movies.slice(0, Math.min(maxVisible, movies.length));

  // Determine which movies in the last row should be disabled
  const disabledFlags = useDisableLastRow(visibleMovies, cols);

  return (
    <section className={styles.newReleaseSection}>
      <h2>Explore More</h2>
      <div ref={gridRef} className={styles.gridWrapper}>
        {visibleMovies.map((movie, index) => {
          const isDisabled = disabledFlags[index];
          return (
            <ScrollRevealItem
              key={`${movie.id}-${index}`}
              className={clsx(styles.grow, styles.cardReveal)}
            >
              <MovieCard {...movie} isDisabled={isDisabled} />
            </ScrollRevealItem>
          );
        })}

        <div className={styles.loadMoreWrapper}>
          <Button
            className={styles.button}
            variant='secondary'
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </div>
      </div>
    </section>
  );
};
