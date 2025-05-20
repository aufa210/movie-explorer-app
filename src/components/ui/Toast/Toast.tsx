import React, { useEffect, useState } from 'react';
import styles from './Toast.module.scss';
import ChecklistIcon from '@/assets/Checklist.svg';

interface ToastProps {
  message: string;
  duration?: number; // dalam milidetik
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  duration = 2500,
  onClose,
}) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setHide(true), duration - 500); // fade out 500ms sebelum hilang
    const removeTimer = setTimeout(() => onClose(), duration);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  return (
    <button
      onClick={onClose}
      className={`${styles['toast-close-btn']} toast ${hide ? 'hide' : 'show'}`}
      aria-live='assertive'
      aria-atomic='true'
    >
      <ChecklistIcon className={styles.checklistIcon} />
      <span className={styles.message}>{message}</span>
    </button>
  );
};
