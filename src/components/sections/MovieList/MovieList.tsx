import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './MovieList.module.scss';
import iconStyles from '@/components/ui/Button/Button.module.scss';
import { Button } from '@/components/ui/Button';
import { HeartIcon } from '@/components/ui/HeartIcon';
import { BaseMovie } from '@/types/movie';
import StarIcon from '@/assets/Star.svg';
import PlayIcon from '@/assets/Play.svg';

export const MovieList: React.FC<BaseMovie> = ({
  poster,
  title,
  rating,
  overview,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img
              src={poster}
              alt={`${title} Poster`}
              className={styles.image}
            />
          </div>
          <div className={styles.text}>
            <div className={styles.textWrapper}>
              <div className={styles.title}>{title}</div>
              <div className={styles.rating}>
                <StarIcon className={styles.starIcon} />
                <span>{rating.toFixed(1)}/10</span>
              </div>
              <div className={styles.description}>{overview}</div>
            </div>
            <Button className={styles.secondWatchTrailerButton}>
              Watch Trailer <PlayIcon className={iconStyles.icon} />
            </Button>
          </div>
        </div>

        <div className={styles.actions}>
          <Button className={styles.watchTrailerButton}>
            Watch Trailer
            <PlayIcon className={iconStyles.icon} />
          </Button>
          <div className={styles.favoriteButtonWrapper}>
            <Button
              variant='secondary'
              fullWidth={false}
              aria-pressed={isFavorite}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
              className={clsx(
                styles.favoriteButton,
                isFavorite && styles.active
              )}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <HeartIcon className={styles.heartIcon} filled={isFavorite} />
            </Button>
          </div>
        </div>

        <div className={styles.topRightButton}>
          <Button
            variant='secondary'
            aria-pressed={isFavorite}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            className={clsx(styles.favoriteButton, isFavorite && styles.active)}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <HeartIcon className={styles.heartIcon} filled={isFavorite} />
          </Button>
        </div>
      </div>
    </div>
  );
};
