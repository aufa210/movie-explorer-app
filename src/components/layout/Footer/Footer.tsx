import React from 'react';
import clsx from 'clsx';
import styles from './Footer.module.scss';
import MovieIcon from '@/assets/MovieLogo.svg';

type FooterProps = {
  fullBottom?: boolean;
};

export const Footer: React.FC<FooterProps> = ({ fullBottom = false }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={clsx(styles.footer, fullBottom && styles.fullBottom)}>
      <MovieIcon className={styles.movieLogo} />
      <div className={styles.copy}>Copyright ©{currentYear} Movie Explorer</div>
    </footer>
  );
};
