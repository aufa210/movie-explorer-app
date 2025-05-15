import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ScrollRevealItem } from '@/components/ui/ScrollRevealItem';
import clsx from 'clsx';
import styles from './ExploreMore.module.scss';
import { MovieCard } from '@/components/ui/MovieCard';
import { Button } from '@/components/ui/Button';

export const ExploreMore: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(2);
  const [maxVisible, setMaxVisible] = useState(6);
  const [visibleCount, setVisibleCount] = useState(6); // jumlah card per step

  const BASE_ROWS = 4;
  const MAX_SAFE_COLS = 5;

  const calculateColumnsFromGrid = () => {
    const wrapper = gridRef.current;
    if (!wrapper) return;

    const children = Array.from(wrapper.children).filter(
      (el) =>
        !(el as HTMLElement).matches(
          `.${styles.grow}, .${styles.loadMoreWrapper}`
        )
    ) as HTMLElement[];

    let currentTop = null;
    let cols = 0;

    for (const el of children) {
      const top = el.offsetTop;
      if (currentTop === null) currentTop = top;

      if (top !== currentTop) break;
      cols++;
    }

    const safeCols = cols > 0 ? cols : 2;
    const rows = safeCols > MAX_SAFE_COLS ? Math.ceil(safeCols / 2) : BASE_ROWS;

    const initialVisible = safeCols * rows;

    setColumns(safeCols);
    setMaxVisible(initialVisible);
    setVisibleCount(initialVisible);
  };

  useEffect(() => {
    const recalc = () => {
      requestAnimationFrame(() => {
        calculateColumnsFromGrid();
      });
    };

    recalc();
    window.addEventListener('resize', recalc);
    return () => {
      window.removeEventListener('resize', recalc);
    };
  }, [movies]);

  const handleLoadMore = () => {
    setMaxVisible((prev) => prev + visibleCount);
  };

  const visible = movies.slice(0, maxVisible);
  const leftover = visible.length % columns;
  const startGrowIndex =
    leftover > 0 ? visible.length - leftover : visible.length;

  const isAllVisible = maxVisible >= movies.length;

  return (
    // <section className={styles.newReleaseSection}>
    //   <h2>New Release</h2>
    //   <div ref={gridRef} className={styles.gridWrapper}>
    //     {visible.map((movie, idx) => (
    //       <div
    //         key={movie.id}
    //         className={clsx(idx >= startGrowIndex && styles.grow)}
    //       >
    //         <MovieCard {...movie} />
    //       </div>
    //     ))}

    //     {!isAllVisible && (
    //       <div className={styles.loadMoreWrapper}>
    //         <Button
    //           className={styles.button}
    //           variant='secondary'
    //           onClick={handleLoadMore}
    //         >
    //           Load More
    //         </Button>
    //       </div>
    //     )}
    //   </div>
    // </section>
    <section className={styles.newReleaseSection}>
      <h2>New Release</h2>
      <div ref={gridRef} className={styles.gridWrapper}>
        {visible.map((movie, idx) => (
          <ScrollRevealItem
            key={movie.id}
            className={clsx(
              idx >= startGrowIndex && styles.grow,
              styles.cardReveal // kalau kamu mau kasih style default
            )}
          >
            <MovieCard {...movie} />
          </ScrollRevealItem>
        ))}

        {!isAllVisible && (
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
