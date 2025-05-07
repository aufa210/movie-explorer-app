import React from 'react';
import styles from './Home.module.scss';
import Navbar from './Navbar/Navbar';
import SearchBox from './ui/SearchBox/SearchBox';
import Button from './ui/Button/Button';
import CastCard from './ui/CastCard/CastCard';
import MovieCard from './ui/MovieCard/MovieCard';
import FavoriteList from './ui/FavoriteList/FavoriteList';

export const Home: React.FC = () => {
  return (
    <div>
      {/* <SearchBox /> */}
      {/* <CastCard /> */}
      {/* <MovieCard /> */}
      <FavoriteList />
    </div>
  );
};

// benerin searchBox closenya
