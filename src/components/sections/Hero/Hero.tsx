import React from 'react';
import styles from './Hero.module.scss';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import iconStyles from '@/components/ui/Button/Button.module.scss';
import PlayIcon from '@/assets/Play.svg';

export interface HeroProps {
  movieId: number | string;
  title: string;
  backdropUrl?: string;
  overview: string;
}

export const Hero: React.FC<HeroProps> = ({
  movieId,
  title,
  backdropUrl,
  overview,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.hero}>
      {backdropUrl && (
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${backdropUrl || ''})` }}
        >
          <motion.div
            className={styles.gradientOverlay}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      )}

      <div className={styles.textBlock}>
        <h1 className={styles.title}>{title || 'Untitled Movie'}</h1>
        <p className={styles.overview}>
          {overview || 'No overview available.'}
        </p>
      </div>

      <div className={styles.actionsBlock}>
        <Button variant='primary'>
          Watch Trailer <PlayIcon className={iconStyles.icon} />
        </Button>
        <Button
          variant='secondary'
          onClick={() => navigate(`/detail/${movieId}`)}
        >
          See Detail
        </Button>
      </div>
    </div>
  );
};
