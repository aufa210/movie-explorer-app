import React from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button';
import { HeartIcon } from '@/components/ui/HeartIcon';
import styles from './FavoriteButton.module.scss';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
  className,
}) => {
  return (
    <Button
      variant='secondary'
      fullWidth={false}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={clsx(
        styles.favoriteButton,
        isFavorite && styles.active,
        className
      )}
      onClick={onClick}
    >
      <HeartIcon filled={isFavorite} className={styles.heartIcon} />
    </Button>
  );
};
