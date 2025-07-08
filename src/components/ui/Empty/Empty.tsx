import React from 'react';
import styles from './Empty.module.scss';
import { Button } from '@/components/ui/Button';
import TakeMovieIcon from '@/assets/Frame 55.svg';
import { useNavigate } from 'react-router-dom';

interface EmptyProps {
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
  onClickCTA?: () => void;
  ctaText?: string;
}

export const Empty: React.FC<EmptyProps> = ({
  title = 'Data Empty',
  subtitle = "You don't have a favorite movie yet",
  showCTA = true,
  onClickCTA,
  ctaText = 'Explore Movie',
}) => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    if (onClickCTA) {
      onClickCTA();
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.favoriteWrapper}>
      <div className={styles.info}>
        <div className={styles.desc}>
          <TakeMovieIcon className={styles.svgIcon} />
          <div className={styles.text}>
            <div className={styles.empty}>{title}</div>
            <div className={styles.subTitle}>{subtitle}</div>
          </div>
        </div>
        {showCTA && (
          <div className={styles.ctaButton}>
            <Button onClick={handleExploreClick}>{ctaText}</Button>
          </div>
        )}
      </div>
    </div>
  );
};
