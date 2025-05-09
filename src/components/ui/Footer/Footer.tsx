import React from 'react';
import styles from './Footer.module.scss';
import MovieIcon from '@/assets/MovieLogo.svg';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <MovieIcon className={styles.movieLogo} />
        <div className={styles.copy}>
          Copyright ©{currentYear} Movie Explorer
        </div>
      </div>
    </footer>
  );
};

export default Footer;
