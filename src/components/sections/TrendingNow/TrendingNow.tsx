import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { CarouselArrow } from '@/components/ui/CarouselArrow';
import { MovieCard } from '@/components/ui/MovieCard';
import styles from './TrendingNow.module.scss';

export const TrendingNow: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Hitung slideWidth
  useEffect(() => {
    const slideEl = containerRef.current?.querySelector(
      `.${styles.slide}`
    ) as HTMLDivElement;
    if (slideEl) {
      const style = getComputedStyle(slideEl);
      const gap = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      setSlideWidth(slideEl.offsetWidth + gap);
    }
  }, [movies]);

  // Update tombol & gradient
  const updateButtons = () => {
    const node = containerRef.current;
    if (!node) return;
    const { scrollLeft, scrollWidth, clientWidth } = node;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateButtons();
  }, [slideWidth]);

  const scroll = (dir: 'left' | 'right') => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: dir === 'left' ? -slideWidth : slideWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.trendingSection}>
      <h2>Trending Now</h2>
      <div
        className={clsx(
          styles.carouselWrapper,
          canScrollLeft && styles.fadeLeft, // ← tambah class
          canScrollRight && styles.fadeRight // ← tambah class
        )}
      >
        {canScrollLeft && (
          <CarouselArrow direction='left' onClick={() => scroll('left')} />
        )}

        <div
          className={styles.carousel}
          ref={containerRef}
          onScroll={updateButtons}
        >
          {movies.map((m) => (
            <div key={m.id} className={styles.slide}>
              <MovieCard {...m} />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <CarouselArrow direction='right' onClick={() => scroll('right')} />
        )}
      </div>
    </div>
  );
};
