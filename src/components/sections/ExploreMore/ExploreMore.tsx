import React, { useEffect, useRef, useState } from 'react';
import { ScrollRevealItem } from '@/components/ui/ScrollRevealItem';
import { MovieCard } from '@/components/ui/MovieCard';
import { Button } from '@/components/ui/Button';
import clsx from 'clsx';
import styles from './ExploreMore.module.scss';

interface ExploreMoreProps {
  movies: Movie[];
}

export const ExploreMore: React.FC<ExploreMoreProps> = ({ movies }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(2);
  const [maxVisible, setMaxVisible] = useState(6);
  const [loadStep, setLoadStep] = useState(6);

  const BASE_ROWS = 4;
  const MAX_SAFE_COLS = 5;

  const calculateGridLayout = () => {
    const wrapper = gridRef.current;
    if (!wrapper) return;

    const movieCards = Array.from(wrapper.children).filter(
      (el) =>
        !(el as HTMLElement).matches(
          `.${styles.grow}, .${styles.loadMoreWrapper}`
        )
    ) as HTMLElement[];

    let cols = 0;
    let firstRowTop: number | null = null;

    for (const card of movieCards) {
      const top = card.offsetTop;
      if (firstRowTop === null) firstRowTop = top;
      if (top !== firstRowTop) break;
      cols++;
    }

    const safeCols = Math.max(cols, 2);
    const rows = safeCols > MAX_SAFE_COLS ? Math.ceil(safeCols / 2) : BASE_ROWS;

    const totalVisible = safeCols * rows;
    setColumns(safeCols);
    setMaxVisible(totalVisible);
    setLoadStep(totalVisible);
  };

  useEffect(() => {
    const recalc = () => requestAnimationFrame(calculateGridLayout);
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [movies]);

  const handleLoadMore = () => setMaxVisible((prev) => prev + loadStep);

  const visibleMovies = movies.slice(0, maxVisible);
  const leftover = visibleMovies.length % columns;
  const growStartIndex = leftover
    ? visibleMovies.length - leftover
    : visibleMovies.length;
  const allVisible = maxVisible >= movies.length;

  return (
    <section className={styles.newReleaseSection}>
      <h2>Explore More</h2>
      <div ref={gridRef} className={styles.gridWrapper}>
        {visibleMovies.map((movie, index) => (
          <ScrollRevealItem
            key={movie.id}
            className={clsx(
              index >= growStartIndex && styles.grow,
              styles.cardReveal
            )}
          >
            <MovieCard {...movie} />
          </ScrollRevealItem>
        ))}

        {!allVisible && (
          <div className={styles.loadMoreWrapper}>
            <Button
              className={styles.button}
              variant='secondary'
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
