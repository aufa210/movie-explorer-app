import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Header.module.scss';
import SearchBox from '../SearchBox/SearchBox';
import MovieIcon from '@/assets/MovieLogo.svg';
import SearchIcon from '@/assets/SearchWhite.svg';
import MenuIcon from '@/assets/HamburgerMenu.svg';
import CloseIcon from '@/assets/Close.svg';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll pas overlay kebuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  // Glass effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={clsx(styles.header, scrolled && styles.scrolled)}>
        {/* LEFT: logo + desktop nav */}
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

        {/* MID (desktop): search */}
        <div className={styles.searchDesktop}>
          <SearchBox placeholder='Search Movie' />
        </div>

        {/* RIGHT (mobile): icons */}
        <div className={styles.right}>
          <button className={styles.iconButton} aria-label='Search'>
            <SearchIcon />
          </button>
          <button
            className={styles.iconButton}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label='Toggle menu'
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div className={clsx(styles.mobileOverlay, menuOpen && styles.open)}>
        <div className={styles.overlayHeader}>
          <MovieIcon className={styles.overlayLogo} />
          <button
            className={styles.closeButton}
            onClick={() => setMenuOpen(false)}
            aria-label='Close menu'
          >
            <CloseIcon className={styles.closeIcon} />
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

export default Header;
