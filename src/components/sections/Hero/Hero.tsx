import React, { useState } from 'react';
import styles from './Hero.module.scss';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import iconStyles from '@/components/ui/Button/Button.module.scss';
import PlayIcon from '@/assets/Play.svg';

export interface HeroProps {
  movieId: number | string;
  title: string;
  backdropUrl?: string;
  overview: string;
}

export const Hero: React.FC<HeroProps> = ({
  movieId,
  title,
  backdropUrl,
  overview,
}) => {
  const navigate = useNavigate();
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrailer = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const data = await res.json();
      const trailer = data.results.find(
        (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
      } else {
        alert('Trailer not available.');
      }
    } catch (err) {
      console.error('Failed to fetch trailer:', err);
      alert('Error fetching trailer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.hero}>
      {backdropUrl && (
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${backdropUrl || ''})` }}
        >
          <motion.div
            className={styles.gradientOverlay}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      )}

      <div className={styles.textBlock}>
        <h1 className={styles.title}>{title || 'Untitled Movie'}</h1>
        <p className={styles.overview}>
          {overview || 'No overview available.'}
        </p>
      </div>

      <div className={styles.actionsBlock}>
        <Button variant='primary' onClick={fetchTrailer} disabled={isLoading}>
          Watch Trailer <PlayIcon className={iconStyles.icon} />
        </Button>
        <Button
          variant='secondary'
          onClick={() => navigate(`/detail/${movieId}`)}
        >
          See Detail
        </Button>
      </div>
    </div>
  );
};

// adult boolean Defaults to true
// backdrop_path string
// genre_ids array of integers
// id integer Defaults to 0
// overview string
// poster_path string
// release_date string
// title string
// video boolean Defaults to true
// vote_average number Defaults to 0
