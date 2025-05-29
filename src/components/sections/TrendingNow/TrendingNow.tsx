import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { CarouselArrow } from '@/components/ui/CarouselArrow';
import { MovieCard } from '@/components/ui/MovieCard';
import styles from './TrendingNow.module.scss';
import { BaseMovie } from '@/types/movie';

export const TrendingNow: React.FC<{ movies: BaseMovie[] }> = ({ movies }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Hitung lebar slide pertama saat mount atau saat movies berubah
  useEffect(() => {
    const calculateSlideWidth = () => {
      const slideEl = containerRef.current?.querySelector(
        `.${styles.slide}`
      ) as HTMLDivElement;
      if (slideEl) {
        const style = getComputedStyle(slideEl);
        const gap =
          parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        setSlideWidth(slideEl.offsetWidth + gap);
      }
    };

    calculateSlideWidth();

    // Observe jika container berubah ukurannya (responsive)
    const observer = new ResizeObserver(calculateSlideWidth);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [movies]);

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

  const handleScroll = () => {
    requestAnimationFrame(updateButtons);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: dir === 'left' ? -slideWidth : slideWidth,
      behavior: 'smooth',
    });
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className={styles.trendingSection}>
      <h2>Trending Now</h2>
      <div
        className={clsx(
          styles.carouselWrapper,
          canScrollLeft && styles.fadeLeft,
          canScrollRight && styles.fadeRight
        )}
      >
        {canScrollLeft && (
          <CarouselArrow direction='left' onClick={() => scroll('left')} />
        )}

        <div
          className={styles.carousel}
          ref={containerRef}
          onScroll={handleScroll}
        >
          {movies.map((m, index) => (
            <div key={m.id} className={styles.slide}>
              <MovieCard {...m} isTrending index={index} />
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
