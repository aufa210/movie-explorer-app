import React, { useRef } from 'react';
import clsx from 'clsx';
import styles from './SearchBox.module.scss';
import SearchIcon from '@/assets/Search.svg';
import ClearIcon from '@/assets/CloseRound.svg';
import { useSearch } from '@/context/SearchContext';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchBoxProps {
  placeholder?: string;
  fullWidth?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search Movie',
  fullWidth = false,
  onFocus,
  onBlur,
}) => {
  const { searchTerm, setSearchTerm, setSearchOpen } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(searchTerm, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchOpen(true);
  };

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') handleClear();
  };

  return (
    <div
      className={clsx(
        styles.searchBox,
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
          onFocus={onFocus}
          onBlur={onBlur}
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
