import React from 'react';
import styles from './Empty.module.scss';
import { Button } from '@/components/ui/Button';
import TakeMovieIcon from '@/assets/Frame 55.svg';
import { useNavigate } from 'react-router-dom';

export const Empty: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.favoriteWrapper}>
      <div className={styles.title}>Favorites</div>
      <div className={styles.info}>
        <div className={styles.desc}>
          <TakeMovieIcon className={styles.svgIcon} />
          <div className={styles.text}>
            <div className={styles.empty}>Data Empty</div>
            <div className={styles.subTitle}>
              You don&apos;t have a favorite movie yet
            </div>
          </div>
        </div>
        <div className={styles.ctaButton}>
          <Button onClick={handleExploreClick}>Explore Movie</Button>
        </div>
      </div>
    </div>
  );
};
