// components/ui/ScrollRevealItem.tsx
import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import clsx from 'clsx';
import styles from './ScrollRevealItem.module.scss';

export const ScrollRevealItem: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={clsx(
        className,
        styles.cardReveal,
        isVisible && styles.visible
      )}
    >
      {children}
    </div>
  );
};
