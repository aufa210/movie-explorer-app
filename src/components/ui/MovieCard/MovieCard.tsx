import React from 'react';
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
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movieId,
  title,
  poster,
  rating,
  isTrending = false,
  index,
}) => {
  const imageUrl = poster || '/placeholder.jpg';

  return (
    <Link
      to={`/detail/${movieId}`}
      className={styles.link}
      aria-label={`See detail for ${title}`}
    >
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt={title} className={styles.image} />
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
    </Link>
  );
};
