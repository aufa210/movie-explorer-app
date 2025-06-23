import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './MovieList.module.scss';
import iconStyles from '@/components/ui/Button/Button.module.scss';
import { Button } from '@/components/ui/Button';
import { HeartIcon } from '@/components/ui/HeartIcon';
import { BaseMovie } from '@/types/movie';
import StarIcon from '@/assets/Star.svg';
import PlayIcon from '@/assets/Play.svg';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '@/context/SearchContext';
import { fetchTrailerKey } from '@/utils/fetchTrailer';

export const MovieList: React.FC<BaseMovie> = ({
  id,
  poster,
  title,
  rating,
  overview,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { resetSearch } = useSearch();

  const handleRedirect = () => {
    resetSearch(); // ✅ Close floating search
    navigate(`/detail/${id}`); // ✅ Go to detail
  };

  const handleWatchTrailer = async (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ Prevent redirect
    setIsLoading(true);
    const key = await fetchTrailerKey(id);
    setIsLoading(false);

    if (key) {
      window.open(`https://www.youtube.com/watch?v=${key}`, '_blank');
    } else {
      alert("Trailer isn't available"); // Replace with toast if needed
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ Prevent redirect
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.cardWrapper} onClick={handleRedirect}>
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
            <Button
              className={styles.secondWatchTrailerButton}
              onClick={handleWatchTrailer}
              disabled={isLoading}
            >
              {isLoading ? (
                'Loading...'
              ) : (
                <>
                  Watch Trailer <PlayIcon className={iconStyles.icon} />
                </>
              )}
            </Button>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            className={styles.watchTrailerButton}
            onClick={handleWatchTrailer}
            disabled={isLoading}
          >
            {isLoading ? (
              'Loading...'
            ) : (
              <>
                Watch Trailer <PlayIcon className={iconStyles.icon} />
              </>
            )}
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
              onClick={handleToggleFavorite}
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
            onClick={handleToggleFavorite}
          >
            <HeartIcon className={styles.heartIcon} filled={isFavorite} />
          </Button>
        </div>
      </div>
    </div>
  );
};
