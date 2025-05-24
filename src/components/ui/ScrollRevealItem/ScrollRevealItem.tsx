import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import clsx from 'clsx';
import styles from './ScrollRevealItem.module.scss';

interface ScrollRevealItemProps {
  className?: string;
  children: React.ReactNode;
  once?: boolean; // opsional, agar tidak terus-terusan reveal
}

export const ScrollRevealItem: React.FC<ScrollRevealItemProps> = ({
  className,
  children,
  once = true,
}) => {
  const { ref, isVisible } = useScrollReveal({ once });

  return (
    <div
      ref={ref}
      className={clsx(
        styles.cardReveal,
        className,
        isVisible && styles.visible
      )}
    >
      {children}
    </div>
  );
};
