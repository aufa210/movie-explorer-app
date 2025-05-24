import React, { useEffect, useRef, useState } from 'react';
import { ScrollRevealItem } from '@/components/ui/ScrollRevealItem';
import { MovieCard } from '@/components/ui/MovieCard';
import { Button } from '@/components/ui/Button';
import clsx from 'clsx';
import styles from './ExploreMore.module.scss';
import { getPopularMoviesChunk } from '@/services/getPopularMoviesChunk';

interface Movie {
  id: number | string;
  movieId: number | string;
  title: string;
  poster: string;
  rating: number;
  isTrending?: boolean;
  index?: number;
}

const LOAD_STEP = 100; // jumlah movie yang ditambah per load
const FETCH_PAGE_CHUNK = 5; // jumlah page per fetch

export const ExploreMore: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // track page untuk fetch berikutnya

  const [cols, setCols] = useState(1);
  const [maxVisible, setMaxVisible] = useState(LOAD_STEP);
  const [lastRowIndices, setLastRowIndices] = useState<number[]>([]);

  const calculateCols = () => {
    const wrapper = gridRef.current;
    if (!wrapper) return 1;
    const style = window.getComputedStyle(wrapper);
    const columns = style.getPropertyValue('grid-template-columns');
    return columns.split(' ').length || 1;
  };

  const adjustCountToCols = (count: number, cols: number) => {
    return Math.ceil(count / cols) * cols;
  };

  const calculateGridLayout = () => {
    const wrapper = gridRef.current;
    if (!wrapper) return;

    const movieCards = Array.from(wrapper.children).filter(
      (el) =>
        !(el as HTMLElement).classList.contains(styles.grow) &&
        !(el as HTMLElement).classList.contains(styles.loadMoreWrapper)
    ) as HTMLElement[];

    if (movieCards.length === 0) return;

    const rowsMap = new Map<number, number[]>();
    let firstRowTop: number | null = null;

    movieCards.forEach((card, idx) => {
      const top = card.offsetTop;
      if (firstRowTop === null) firstRowTop = top;

      if (!rowsMap.has(top)) rowsMap.set(top, []);
      rowsMap.get(top)!.push(idx);
    });

    const allTops = Array.from(rowsMap.keys());
    const maxTop = Math.max(...allTops);
    setLastRowIndices(rowsMap.get(maxTop) || []);
  };

  useEffect(() => {
    const onResize = () => {
      const currentCols = calculateCols();
      setCols(currentCols);
      setMaxVisible((prev) => adjustCountToCols(prev, currentCols));
      requestAnimationFrame(calculateGridLayout);
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    requestAnimationFrame(calculateGridLayout);
  }, [movies, maxVisible]);

  // Fetch awal (index 0 - 99)
  useEffect(() => {
    const fetchInitialMovies = async () => {
      const initial = await getPopularMoviesChunk(0, LOAD_STEP);
      setMovies(initial);
      setCurrentPage(1); // index page berikutnya
    };

    fetchInitialMovies();
  }, []);

  const handleLoadMore = async () => {
    const startIndex = currentPage * LOAD_STEP; // LOAD_STEP = 100
    const newMovies = await getPopularMoviesChunk(startIndex, LOAD_STEP);
    setMovies((prev) => [...prev, ...newMovies]);
    setCurrentPage((prev) => prev + 1);

    setMaxVisible((prev) => {
      const newCount = prev + LOAD_STEP;
      return adjustCountToCols(newCount, cols);
    });
  };

  const visibleMovies = movies.slice(0, Math.min(maxVisible, movies.length));
  const allVisible = visibleMovies.length >= movies.length;

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
            // disabled={allVisible}
          >
            {'Load More'}
          </Button>
        </div>
      </div>
    </section>
  );
};
