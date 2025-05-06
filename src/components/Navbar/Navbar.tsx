import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Logo from '@/assets/MobileLogo.svg';
import Hamburger from '@/assets/Menu.svg';
import Search from '@/assets/Search.svg';
import Arrow from '@/assets/ArrowLeft.svg';
import Close from '@/assets/Close.svg';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <header className={clsx(styles.header, 'container')}>
      <div className={styles.logo}>
        <Link to='/'>
          <Logo />
        </Link>
      </div>

      {/* Search Icon (Mobile) */}
      <div className={styles.search} onClick={handleSearchToggle}>
        <Search />
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div
        className={styles.hamburger}
        onClick={toggleMenu}
        role='button'
        aria-label='Open Menu'
      >
        <Hamburger />
      </div>

      {/* Mobile Overlay */}
      {/* Search */}
      {isSearchOpen && (
        <>
          <div className={styles.searchActive}>
            <div className={styles.backBtn}>
              <Link to='/'>
                <Arrow />
              </Link>
            </div>

            <div className={styles.searchOverlay}>
              <input
                type='text'
                placeholder='Search Movie'
                className={styles.searchInput}
              />
            </div>
          </div>
        </>
      )}

      <nav
        className={clsx(styles.mobileMenu, {
          [styles.open]: menuOpen,
        })}
      >
        <div className={styles.mobileHeader}>
          <div className={styles.logo}>
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          <div
            className={styles.closeIcon}
            onClick={toggleMenu}
            role='button'
            aria-label='Close Menu'
          >
            <Close />
          </div>
        </div>

        <ul className={styles.mobileNavLinks}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/favorites'>Favorites</Link>
          </li>
        </ul>
      </nav>

      {/* Desktop Navbar */}
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link to='home'>Home</Link>
          </li>
          <li>
            <Link to='Favorites'>Favorites</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
