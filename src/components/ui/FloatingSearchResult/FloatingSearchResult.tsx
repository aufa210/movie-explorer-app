import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FloatingSearchResult.module.scss';
import { MovieList } from '@/components/sections/MovieList/MovieList';
import { Empty } from '@/components/ui/Empty';
import { BaseMovie } from '@/types/movie';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/context/SearchContext';

interface FloatingSearchResultProps {
  movies: BaseMovie[];
}

export const FloatingSearchResult: React.FC<FloatingSearchResultProps> = ({
  movies,
}) => {
  const { searchTerm, searchOpen } = useSearch();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filtered = useMemo(() => {
    const keyword = debouncedSearchTerm.trim().toLowerCase();
    if (keyword.length < 1) return [];

    return [...movies]
      .filter((m) => m.title.toLowerCase().includes(keyword))
      .sort(
        (a, b) =>
          a.title.toLowerCase().indexOf(keyword) -
          b.title.toLowerCase().indexOf(keyword)
      )
      .slice(0, 10);
  }, [debouncedSearchTerm, movies]);

  return (
    <AnimatePresence>
      {searchOpen && debouncedSearchTerm && (
        <motion.div
          className={styles.overlay}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className={styles.results}>
            {filtered.length > 0 ? (
              filtered.map((movie) => <MovieList key={movie.id} {...movie} />)
            ) : (
              <Empty
                title='Data Not Found'
                subtitle='Try other keywords'
                showCTA={false}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
