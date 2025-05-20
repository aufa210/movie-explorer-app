import React from 'react';
import styles from './Toast.module.scss';
import ChecklistIcon from '@/assets/Checklist.svg';

type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  return (
    <div className={styles.toast}>
      <span>{message}</span>
      <button onClick={onClose} className={styles['toast-close-btn']}>
        <ChecklistIcon />
      </button>
    </div>
  );
}
