import React from 'react';
import styles from './Favorite.module.scss';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { MovieList } from '@/components/sections/MovieList';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Empty } from '@/components/ui/Empty';

export const Favorite: React.FC = () => {
  const { favorites } = useFavoriteStore();

  return (
    <div className={styles.favoriteWrapper}>
      <div className={styles.title}>Favorites</div>
      <Header />
      {favorites.length === 0 ? (
        <Empty />
      ) : (
        <div className={styles.found}>
          {favorites.map((movie) => (
            <MovieList key={movie.id} {...movie} />
          ))}
        </div>
      )}
      <Footer fullBottom />
    </div>
  );
};
