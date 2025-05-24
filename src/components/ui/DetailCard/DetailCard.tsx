import React, { useState } from 'react';
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
import HarrisonFord from '@/assets/HarrisonFord.png';
import DannyRamirez from '@/assets/DannyRamirez.png';
import ShiraHaas from '@/assets/ShiraHaas.png';
import TimBlakeNelson from '@/assets/TimBlakeNelson.png';

interface DetailCardProps {
  backgroundUrl?: string;
  posterUrl: string;
  title: string;
  releaseDate: string;
  rating: number;
  genre: string;
  ageLimit: number;
}

const FavoriteButton: React.FC<{
  isFavorite: boolean;
  onClick: () => void;
}> = ({ isFavorite, onClick }) => (
  <Button
    variant='secondary'
    fullWidth={false}
    className={clsx(styles.favoriteButton, isFavorite && styles.active)}
    onClick={onClick}
  >
    <HeartIcon className={styles.heartIcon} filled={isFavorite} />
  </Button>
);

const CTAButtons: React.FC<{
  isFavorite: boolean;
  toggleFavorite: () => void;
}> = ({ isFavorite, toggleFavorite }) => (
  <div className={styles.ctaButton}>
    <Button>
      Watch Trailer <PlayIcon className={iconStyles.icon} />
    </Button>
    <div className={styles.favoriteButtonWrapper}>
      <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
    </div>
  </div>
);

const MetaCardsGroup: React.FC<{
  rating: number;
  genre: string;
  ageLimit: number;
}> = ({ rating, genre, ageLimit }) => (
  <div className={styles.metaCards}>
    <MetaCard icon={<StarIcon />} label='Rating' value={`${rating}/10`} />
    <MetaCard icon={<VideoIcon />} label='Genre' value={genre} />
    <MetaCard
      icon={<HappyEmojiIcon />}
      label='Age Limit'
      value={`${ageLimit}+`}
    />
  </div>
);

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
    const newState = !isFavorite;
    setIsFavorite(newState);
    setToastMessage(
      newState ? 'Success Add to Favorites' : 'Success Remove from Favorites'
    );
    setShowToast(true);
  };

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

          {/* Mobile Info */}
          <div className={styles.info}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.date}>
              <CalendarIcon className={styles.icon} />
              <span className={styles.releaseDate}>{releaseDate}</span>
            </div>
          </div>

          {/* Desktop Info */}
          <div className={styles.cardContent}>
            <div className={styles.info}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.date}>
                <CalendarIcon className={styles.icon} />
                <span className={styles.releaseDate}>{releaseDate}</span>
              </div>
            </div>

            {/* Desktop CTA */}
            <CTAButtons
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />

            {/* Desktop MetaCards */}
            <MetaCardsGroup rating={rating} genre={genre} ageLimit={ageLimit} />
          </div>
        </div>

        {/* Mobile CTA */}
        <CTAButtons isFavorite={isFavorite} toggleFavorite={toggleFavorite} />

        {/* Mobile MetaCards */}
        <MetaCardsGroup rating={rating} genre={genre} ageLimit={ageLimit} />

        {/* Toast */}
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
          <CastCard
            image={AnthonyMackie}
            name='Anthony Mackie'
            character='Sam Wilson / Captain America'
          />
          <CastCard
            image={HarrisonFord}
            name='Harrison Ford'
            character='President Thaddeus Ross'
          />
          <CastCard
            image={DannyRamirez}
            name='Danny Ramirez'
            character='Joaquin Torres'
          />
          <CastCard
            image={ShiraHaas}
            name='Shira Haas'
            character='Ruth Bat-Seraph'
          />
          <CastCard
            image={TimBlakeNelson}
            name='Tim Blake Nelson'
            character='Samuel Sterns'
          />
        </div>
      </div>
    </div>
  );
};
