import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.scss';
import StarIcon from '@/assets/Star.svg';

interface MovieCardProps {
  movieId: number | string;
  title: string;
  poster: string;
  rating: number;
  isTrending?: boolean;
  index?: number;
  isDisabled?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movieId,
  title,
  poster,
  rating,
  isTrending = false,
  index,
  isDisabled = false,
}) => {
  const [imgSrc, setImgSrc] = useState(poster || '/placeholder.jpg');

  const CardContent = (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imgSrc}
          alt={title}
          className={styles.image}
          loading='lazy'
          onError={() => setImgSrc('/placeholder.jpg')}
        />
        {isTrending && typeof index === 'number' && (
          <div className={styles.trendingBadge}>{index + 1}</div>
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <div className={styles.rating}>
          <StarIcon className={styles.starIcon} />
          <span className={styles.number}>{rating.toFixed(1)}/10</span>
        </div>
      </div>
    </div>
  );

  return isDisabled ? (
    <div className={`${styles.link} ${styles.disabled}`} aria-hidden='true'>
      {CardContent}
    </div>
  ) : (
    <Link
      to={`/detail/${movieId}`}
      className={styles.link}
      aria-label={`See detail for ${title}`}
    >
      {CardContent}
    </Link>
  );
};
