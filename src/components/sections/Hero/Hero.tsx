import React from 'react';
import styles from './Hero.module.scss';
import iconStyles from '@/components/ui/Button/Button.module.scss';
import { Button } from '@/components/ui/Button';
import PlayIcon from '@/assets/Play.svg';

export interface HeroProps {
  backgroundUrl?: string;
  title: string;
  overview: string;
}

export const Hero: React.FC<HeroProps> = ({
  backgroundUrl,
  title,
  overview,
}) => {
  return (
    <div className={styles.hero}>
      {backgroundUrl && (
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
      )}

      <div className={styles.textBlock}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.overview}>{overview}</p>
      </div>

      <div className={styles.actionsBlock}>
        <Button variant='primary'>
          Watch Trailer <PlayIcon className={iconStyles.icon} />
        </Button>
        <Button variant='secondary'>See Detail</Button>
      </div>
    </div>
  );
};
