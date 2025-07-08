import React from 'react';
import styles from './Favorite.module.scss';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { MovieList } from '@/components/sections/MovieList';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Empty } from '@/components/ui/Empty';
import { useSearch } from '@/context/SearchContext';

export const Favorite: React.FC = () => {
  const { favorites } = useFavoriteStore();
  const { searchTerm } = useSearch();

  const filteredFavorites = favorites.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isEmpty = favorites.length === 0;
  const noMatch = searchTerm && filteredFavorites.length === 0;

  return (
    <div className={styles.favoriteWrapper}>
      <Header />

      <div className={styles.title}>Favorites</div>

      {isEmpty ? (
        <Empty />
      ) : noMatch ? (
        <Empty
          title='No matching movies found.'
          subtitle='Try different keywords.'
          showCTA={false}
        />
      ) : (
        <div className={styles.found}>
          {filteredFavorites.map((movie) => (
            <MovieList key={movie.id} {...movie} />
          ))}
        </div>
      )}

      <Footer fullBottom />
    </div>
  );
};
