import React from 'react';
import styles from './Footer.module.scss';
import MovieIcon from '@/assets/MovieLogo.svg';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <MovieIcon className={styles.movieLogo} />
      <div className={styles.copy}>Copyright ©{currentYear} Movie Explorer</div>
    </footer>
  );
};
