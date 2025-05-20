import React, { useEffect, useState } from 'react';
import styles from './Toast.module.scss';
import ChecklistIcon from '@/assets/Checklist.svg';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  duration = 2500,
  onClose,
}) => {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // trigger slide-in animation after mount
    setTimeout(() => {
      setShow(true);
    }, 10); // sedikit delay agar transition bisa berjalan

    const fadeTimer = setTimeout(() => {
      setFadeOut(true); // trigger fade-out
    }, duration);

    const removeTimer = setTimeout(() => {
      onClose(); // hapus dari DOM
    }, duration + 500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  return (
    <button
      onClick={onClose}
      className={`
        ${styles['toast-close-btn']}
        ${show ? styles.show : ''}
        ${fadeOut ? styles['fade-out'] : ''}
      `}
      aria-live='assertive'
      aria-atomic='true'
    >
      <ChecklistIcon className={styles.checklistIcon} />
      <span className={styles.message}>{message}</span>
    </button>
  );
};
