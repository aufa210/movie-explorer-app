import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBox.module.scss';
import SearchIcon from '@/assets/Search.svg';
import ClearIcon from '@/assets/CloseRound.svg';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search Movie',
  onSearch,
}) => {
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  // Handle clear button click
  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle focus events
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Handle keyboard events (e.g., Escape key to clear)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className={`${styles.searchBar} ${isFocused ? styles.focused : ''}`}>
      <div className={styles.searchInputContainer}>
        <span className={styles.searchIconWrapper}>
          <SearchIcon className={styles.searchIcon} />
        </span>
        <input
          ref={inputRef}
          type='text'
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {query && (
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
