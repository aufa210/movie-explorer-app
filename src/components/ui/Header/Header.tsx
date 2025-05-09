import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Header.module.scss';
import SearchBox from '../SearchBox/SearchBox';
import MovieIcon from '@/assets/MovieLogo.svg';
import SearchIcon from '@/assets/SearchWhite.svg';
import MenuIcon from '@/assets/HamburgerMenu.svg';
import CloseIcon from '@/assets/Close.svg';
import LeftArrowIcon from '@/assets/LeftArrow.svg';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll when any overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : 'auto';
  }, [menuOpen, searchOpen]);

  // Glass effect on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={clsx(styles.header, scrolled && styles.scrolled)}>
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
            onClick={() => setSearchOpen(true)}
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
      </header>

      {/* MOBILE SEARCH OVERLAY */}
      <div className={clsx(styles.searchOverlay, searchOpen && styles.open)}>
        <div className={styles.searchHeader}>
          <button
            className={styles.backButton}
            aria-label='Back'
            onClick={() => setSearchOpen(false)}
          >
            <LeftArrowIcon />
          </button>
          <SearchBox placeholder='Search Movie' fullWidth />
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
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

export default Header;
