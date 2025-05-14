// import React from 'react';
// import clsx from 'clsx';
// import ArrowIcon from '@/assets/ArrowUp.svg';
// import styles from './CarouselArrow.module.scss';

// type CarouselArrowProps = {
//   direction: 'left' | 'right';
//   onClick?: () => void;
// };

// export const CarouselArrow: React.FC<CarouselArrowProps> = ({
//   direction,
//   onClick,
// }) => (
//   <button
//     type='button'
//     aria-label={direction === 'left' ? 'Previous' : 'Next'}
//     onClick={onClick}
//     className={clsx(styles.arrowButton, styles[direction])}
//   >
//     <ArrowIcon className={styles.icon} />
//   </button>
// );

import React from 'react';
import clsx from 'clsx';
import ArrowIcon from '@/assets/ArrowUp.svg';
import styles from './CarouselArrow.module.scss';

type CarouselArrowProps = {
  direction: 'left' | 'right';
  onClick?: () => void;
};

export const CarouselArrow: React.FC<CarouselArrowProps> = ({
  direction,
  onClick,
}) => (
  <button
    type='button'
    aria-label={direction === 'left' ? 'Previous' : 'Next'}
    onClick={onClick}
    className={clsx(styles.arrowButton, styles[direction])}
  >
    <ArrowIcon className={styles.icon} />
  </button>
);
