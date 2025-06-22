import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './SearchBox.module.scss';
import SearchIcon from '@/assets/Search.svg';
import ClearIcon from '@/assets/CloseRound.svg';
import { useSearch } from '@/context/SearchContext';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchBarProps {
  placeholder?: string;
  fullWidth?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search Movie',
  fullWidth = false,
}) => {
  const { searchTerm, setSearchTerm, setSearchOpen, resetSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(searchTerm, 300); // delay filter trigger (optional)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchOpen(true);
  };

  const handleClear = () => {
    resetSearch();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') handleClear();
  };

  return (
    <div
      className={clsx(
        styles.searchBar,
        searchTerm && styles.focused,
        fullWidth && styles.fullWidth
      )}
    >
      <div className={styles.searchInputContainer}>
        <span className={styles.searchIconWrapper}>
          <SearchIcon className={styles.searchIcon} />
        </span>
        <input
          ref={inputRef}
          type='text'
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button
            className={styles.clearButtonWrapper}
            onClick={handleClear}
            aria-label='Clear search'
          >
            <ClearIcon className={styles.clearIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
