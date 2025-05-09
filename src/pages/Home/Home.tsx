import React from 'react';
import styles from './Home.module.scss';
import { Hero } from '@/components/sections/Hero';
import { Header } from '@/components/layout/Header';
import TheGorge from '@/assets/TheGorge.png';
import FavoriteList from '@/components/sections/FavoriteList/FavoriteList';

export const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero
        backdropUrl={TheGorge}
        title='The Gorge'
        overview='Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge. When an evil below emerges, they must work together to survive what lies within.'
      />
      <FavoriteList />
    </div>
  );
};
