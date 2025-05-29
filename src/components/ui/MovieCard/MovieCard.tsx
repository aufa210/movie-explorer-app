import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './MovieCard.module.scss';
import StarIcon from '@/assets/Star.svg';
import { BaseMovie } from '@/types/movie';

interface MovieCardProps extends BaseMovie {
  isDisabled?: boolean;
}

const hoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const CardContent: React.FC<{
  title: string;
  imgSrc: string;
  isTrending: boolean;
  index?: number;
  rating: number;
}> = memo(({ title, imgSrc, isTrending, index, rating }) => (
  <motion.div
    className={styles.card}
    variants={hoverVariants}
    initial='rest'
    whileHover='hover'
    animate='rest'
  >
    <div className={styles.imageWrapper}>
      <img
        src={imgSrc}
        alt={title}
        title={title}
        className={styles.image}
        loading='lazy'
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
  </motion.div>
));
CardContent.displayName = 'CardContent';

export const MovieCard: React.FC<MovieCardProps> = memo(
  ({
    id,
    title,
    poster,
    rating,
    isTrending = false,
    index,
    isDisabled = false,
  }) => {
    const [imgSrc, setImgSrc] = useState(poster || '/placeholder.jpg');

    const handleImgError = useCallback(() => {
      if (imgSrc !== '/placeholder.jpg') {
        setImgSrc('/placeholder.jpg');
      }
    }, [imgSrc]);

    const content = (
      <CardContent
        title={title}
        imgSrc={imgSrc}
        isTrending={isTrending}
        index={index}
        rating={rating}
      />
    );

    return isDisabled ? (
      <div
        className={clsx(styles.link, styles.disabled)}
        aria-disabled='true'
        tabIndex={-1}
      >
        {React.cloneElement(content, {
          imgSrc: imgSrc,
          onError: handleImgError,
        })}
      </div>
    ) : (
      <Link
        to={`/detail/${id}`}
        className={styles.link}
        aria-label={`See detail for ${title}`}
      >
        {React.cloneElement(content, {
          imgSrc: imgSrc,
          onError: handleImgError,
        })}
      </Link>
    );
  }
);
MovieCard.displayName = 'MovieCard';
