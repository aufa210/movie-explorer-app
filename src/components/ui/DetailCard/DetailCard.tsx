import React, { useEffect, useState } from 'react';
import styles from './DetailCard.module.scss';
import iconStyles from '@/components/ui/Button/Button.module.scss';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button/Button';
import { HeartIcon } from '@/components/ui/HeartIcon';
import { MetaCard } from '@/components/ui/MetaCard';
import { CastCard } from '@/components/ui/CastCard';
import { Toast } from '@/components/ui/Toast';
import CalendarIcon from '@/assets/Calendar.svg';
import PlayIcon from '@/assets/Play.svg';
import StarIcon from '@/assets/Star.svg';
import VideoIcon from '@/assets/Video.svg';
import HappyEmojiIcon from '@/assets/HappyEmoji.svg';
import AnthonyMackie from '@/assets/AnthonyMackie.png';

interface DetailCardProps {
  backgroundUrl?: string;
  posterUrl: string;
  title: string;
  releaseDate: string;
  rating: number;
  genre: string;
  ageLimit: number;
}

export const DetailCard: React.FC<DetailCardProps> = ({
  backgroundUrl,
  posterUrl,
  title,
  releaseDate,
  rating,
  genre,
  ageLimit,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    setToastMessage(
      newFavoriteState ? 'Added to favorites' : 'Removed from favorites'
    );
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className={styles.detailContainer}>
      {backgroundUrl && (
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
      )}

      <div className={styles.detailCard}>
        {/* Top Section */}
        <div className={styles.top}>
          <img src={posterUrl} alt={title} className={styles.poster} />

          {/* Hidden on desktop */}
          <div className={styles.info}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.date}>
              <CalendarIcon className={styles.icon} />
              <span className={styles.releaseDate}>{releaseDate}</span>
            </div>
          </div>

          {/* Hidden on mobile (desktop view) */}
          <div className={styles.cardContent}>
            <div className={styles.info}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.date}>
                <CalendarIcon className={styles.icon} />
                <span className={styles.releaseDate}>{releaseDate}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaButton}>
              <Button>
                Watch Trailer <PlayIcon className={iconStyles.icon} />
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
                  onClick={toggleFavorite}
                >
                  <HeartIcon className={styles.heartIcon} filled={isFavorite} />
                </Button>
              </div>
            </div>

            {/* Meta Cards */}
            <div className={styles.metaCards}>
              <MetaCard
                icon={<StarIcon />}
                label='Rating'
                value={`${rating}/10`}
              />
              <MetaCard icon={<VideoIcon />} label='Genre' value={genre} />
              <MetaCard
                icon={<HappyEmojiIcon />}
                label='Age Limit'
                value={ageLimit}
              />
            </div>
          </div>
        </div>

        {/* CTA Button (mobile) */}
        <div className={styles.ctaButton}>
          <Button>
            Watch Trailer <PlayIcon className={iconStyles.icon} />
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
              onClick={toggleFavorite}
            >
              <HeartIcon className={styles.heartIcon} filled={isFavorite} />
            </Button>
          </div>
        </div>

        {/* Meta Cards (mobile) */}
        <div className={styles.metaCards}>
          <MetaCard icon={<StarIcon />} label='Rating' value={`${rating}/10`} />
          <MetaCard icon={<VideoIcon />} label='Genre' value={genre} />
          <MetaCard
            icon={<HappyEmojiIcon />}
            label='Age Limit'
            value={ageLimit}
          />
        </div>

        {/* Local Toast (only for this page) */}
        {showToast && (
          <Toast message={toastMessage} onClose={() => setShowToast(false)} />
        )}
      </div>

      {/* Overview */}
      <div className={styles.overview}>
        <h2 className={styles.overviewTitle}>Overview</h2>
        <p className={styles.overviewText}>
          After meeting with newly elected U.S. President Thaddeus Ross, Sam
          finds himself in the middle of an international incident. He must
          discover the reason behind a nefarious global plot before the true
          mastermind has the entire world seeing red.
        </p>
      </div>

      {/* Cast & Crew */}
      <div className={styles.castAndCrew}>
        <h2 className={styles.castsAndCrews}>Cast & Crew</h2>
        <div className={styles.casters}>
          {[...Array(5)].map((_, i) => (
            <CastCard
              key={i}
              image={AnthonyMackie}
              name='Anthony Mackie'
              character='Sam Wilson / Captain America'
            />
          ))}
        </div>
      </div>
    </div>
  );
};
