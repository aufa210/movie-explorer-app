import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import ArrowIcon from '@/assets/ArrowUp.svg';
import styles from './ScrollButton.module.scss';

export const ScrollButton: React.FC = () => {
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    setIsBottom(scrollPosition >= pageHeight - 100);
  };

  const handleClick = () => {
    const scrollTo = isBottom ? 0 : document.documentElement.scrollHeight;
    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Button variant='secondary' fullWidth={false} onClick={handleClick}>
        <ArrowIcon className={isBottom ? styles.iconDown : styles.iconUp} />
      </Button>
    </div>
  );
};
