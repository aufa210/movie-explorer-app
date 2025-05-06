import React from 'react';
import styles from './MovieCard.module.scss';
import MufasaPoster from '@/assets/Mufasa.png';
import StarIcon from '@/assets/Star.svg';

interface MovieCardProps {
  image: string;
  title: string;
  rating: number;
  isTrending?: boolean;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  image,
  title = 'Mufasa',
  rating = 7.1,
  isTrending = true, // default false
  index = 0, // default jangan diisi
}: MovieCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={MufasaPoster} alt={title} className={styles.image} />

        {isTrending && typeof index === 'number' && (
          <div className={styles.trendingBadge}>{index + 1}</div>
        )}
      </div>
      <p className={styles.title}>{title}</p>
      <div className={styles.rating}>
        <StarIcon className={styles.starIcon} />
        <span>{rating.toFixed(1)}/10</span>
      </div>
    </div>
  );
};

export default MovieCard;
