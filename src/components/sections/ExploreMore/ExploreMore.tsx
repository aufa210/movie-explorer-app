// import React, { useEffect, useRef, useState } from 'react';
// import clsx from 'clsx';
// import styles from './ExploreMore.module.scss';
// import { MovieCard } from '@/components/ui/MovieCard';
// import { Button } from '@/components/ui/Button';

// export const ExploreMore: React.FC<{ movies: Movie[] }> = ({ movies }) => {
//   const gridRef = useRef<HTMLDivElement>(null);
//   const [columns, setColumns] = useState(2);
//   const [maxVisible, setMaxVisible] = useState(6);

//   const CARD_WIDTH = 172.5; // px
//   const GAP_X = 16; // spacing-xl = 1rem = 16px
//   const ROWS = 3;

//   useEffect(() => {
//     const calculateColumns = () => {
//       if (!gridRef.current) return;
//       const containerWidth = gridRef.current.offsetWidth;

//       const totalPerCard = CARD_WIDTH + GAP_X;
//       const possibleCols = Math.floor((containerWidth + GAP_X) / totalPerCard);
//       const col = Math.max(2, possibleCols); // Minimal 2 kolom

//       setColumns(col);
//       setMaxVisible(col * ROWS);
//     };

//     calculateColumns();
//     window.addEventListener('resize', calculateColumns);
//     return () => window.removeEventListener('resize', calculateColumns);
//   }, []);

//   const visible = movies.slice(0, maxVisible);
//   const leftover = visible.length % columns;
//   const startGrowIndex =
//     leftover > 0 ? visible.length - leftover : visible.length;

//   return (
//     <section className={styles.newReleaseSection}>
//       <h2>New Release</h2>
//       <div ref={gridRef} className={styles.gridWrapper}>
//         {visible.map((movie, idx) => (
//           <div
//             key={movie.id}
//             className={clsx(idx >= startGrowIndex && styles.grow)}
//           >
//             <MovieCard {...movie} />
//           </div>
//         ))}

//         <div className={styles.loadMoreWrapper}>
//           <Button className={styles.button} variant='secondary'>
//             Load More
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

import React, { useEffect, useRef, useState } from 'react';
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
    <section className={styles.newReleaseSection}>
      <h2>New Release</h2>
      <div ref={gridRef} className={styles.gridWrapper}>
        {visible.map((movie, idx) => (
          <div
            key={movie.id}
            className={clsx(idx >= startGrowIndex && styles.grow)}
          >
            <MovieCard {...movie} />
          </div>
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
