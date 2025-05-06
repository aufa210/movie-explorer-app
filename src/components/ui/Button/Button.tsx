import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import PlayButton from '@/assets/Play.svg';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  icon,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      {...rest}
    >
      {children}
      {icon && <span className={styles.icon}>{icon}</span>}
      <PlayButton />
    </button>
  );
};

export default Button;
