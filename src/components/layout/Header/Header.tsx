import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Header.module.scss';
import SearchBox from '../../ui/SearchBox/SearchBox';
import MovieIcon from '@/assets/MovieLogo.svg';
import SearchIcon from '@/assets/SearchWhite.svg';
import MenuIcon from '@/assets/HamburgerMenu.svg';
import CloseIcon from '@/assets/Close.svg';
import LeftArrowIcon from '@/assets/LeftArrow.svg';
import { useSearch } from '@/context/SearchContext';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // ✅ detect screen size
  const { searchTerm, searchOpen, setSearchOpen, resetSearch } = useSearch();

  // ✅ Detect viewport untuk mobile
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // ✅ Lock body scroll
  useEffect(() => {
    document.body.style.overflow =
      menuOpen || (isMobile && searchOpen) ? 'hidden' : 'auto';
  }, [menuOpen, searchOpen, isMobile]);

  // ✅ Blur header saat scroll / ada input
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shouldBlur = scrolled || searchTerm.trim().length > 0;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={clsx(styles.header, shouldBlur && styles.scrolled)}
      >
        <div className={styles.left}>
          <MovieIcon className={styles.logo} />
          <nav className={styles.navDesktop}>
            <a href='/' className={styles.home}>
              Home
            </a>
            <a href='/favorites' className={styles.favorites}>
              Favorites
            </a>
          </nav>
        </div>

        <div className={styles.searchDesktop}>
          <SearchBox placeholder='Search Movie' />
        </div>

        <div className={styles.right}>
          <button
            className={styles.iconButton}
            aria-label='Open search'
            onClick={() => isMobile && setSearchOpen(true)} // ✅ hanya aktif di mobile
          >
            <SearchIcon />
          </button>
          <button
            className={styles.iconButton}
            aria-label='Toggle menu'
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MenuIcon />
          </button>
        </div>
      </motion.header>

      {/* ✅ HANYA render overlay mobile jika di device mobile */}
      {isMobile && searchOpen && (
        <div className={clsx(styles.searchOverlay, searchOpen && styles.open)}>
          <div className={styles.searchHeader}>
            <button
              className={styles.backButton}
              aria-label='Back'
              onClick={() => resetSearch()}
            >
              <LeftArrowIcon />
            </button>
            <SearchBox placeholder='Search Movie' fullWidth />
          </div>
        </div>
      )}

      {/* ✅ Mobile Menu Overlay */}
      <div className={clsx(styles.mobileOverlay, menuOpen && styles.open)}>
        <div className={styles.overlayHeader}>
          <MovieIcon className={styles.overlayLogo} />
          <button
            className={styles.closeButton}
            aria-label='Close menu'
            onClick={() => setMenuOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <nav className={styles.navMobile}>
          <a href='/' onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href='/favorites' onClick={() => setMenuOpen(false)}>
            Favorites
          </a>
        </nav>
      </div>
    </>
  );
};
