import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollRestoration(disabled: boolean = false): void {
  const location = useLocation();
  const key = `scroll-position:${location.pathname}`;

  useEffect(() => {
    if (disabled) return;

    const savedY = sessionStorage.getItem(key);
    if (savedY !== null) {
      window.scrollTo(0, parseInt(savedY, 10));
    }

    const handleScroll = () => {
      sessionStorage.setItem(key, String(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [disabled, location.pathname]);
}
