import React, { useRef, useState } from 'react';
import { ScrollRevealItem } from '@/components/ui/ScrollRevealItem';
import { MovieCard } from '@/components/ui/MovieCard';
import { Button } from '@/components/ui/Button';
import clsx from 'clsx';
import styles from './ExploreMore.module.scss';
import { usePopularMovies } from '@/hooks/usePopularMovies/usePopularMovies';
import { useGridLayout } from '@/hooks/useGridLayout/useGridLayout';

const LOAD_STEP = 100;

export const ExploreMore: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [maxVisible, setMaxVisible] = useState(LOAD_STEP);

  const { movies, loadMore } = usePopularMovies();
  const { cols, lastRowIndices } = useGridLayout(gridRef, movies.length);

  const visibleMovies = movies.slice(0, maxVisible);
  const handleLoadMore = async () => {
    await loadMore(cols);
    const newMax = Math.ceil((maxVisible + LOAD_STEP) / cols) * cols;
    setMaxVisible(newMax);
  };

  return (
    <section className={styles.newReleaseSection}>
      <h2>Explore More</h2>
      <div ref={gridRef} className={styles.gridWrapper}>
        {visibleMovies.map((movie, index) => {
          const isLastRow = lastRowIndices.includes(index);
          return (
            <ScrollRevealItem
              key={`${movie.id}-${index}`}
              className={clsx(styles.grow, styles.cardReveal)}
            >
              <MovieCard {...movie} isDisabled={isLastRow} />
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
