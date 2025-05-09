import React from 'react';
import styles from './Hero.module.scss';
import { Button } from '@/components/ui/Button';
import PlayIcon from '@/assets/Play.svg';

export interface HeroProps {
  backdropUrl: string;
  title: string;
  overview: string;
}

export const Hero: React.FC<HeroProps> = ({ backdropUrl, title, overview }) => {
  return (
    <div className={styles.hero}>
      {/* Image Container */}
      <div
        className={styles.imageWrapper}
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />

      {/* Content Container */}
      <div className={styles.contentWrapper}>
        {/* Text Block */}
        <div className={styles.textBlock}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.overview}>{overview}</p>
        </div>

        {/* Actions Block */}
        <div className={styles.actionsBlock}>
          <Button variant='primary'>
            Watch Trailer <PlayIcon />
          </Button>
          <Button variant='secondary'>See Detail</Button>
        </div>
      </div>
    </div>
  );
};
