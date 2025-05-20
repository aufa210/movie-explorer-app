import React from 'react';
import styles from './Home.module.scss';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { TrendingNow } from '@/components/sections/TrendingNow';
import { ExploreMore } from '@/components/sections/ExploreMore';
import { Footer } from '@/components/layout/Footer';
import Mufasa from '@/assets/Mufasa.png';
import TheGorgePoster from '@/assets/TheGorgePoster.png';
import TheGorge from '@/assets/TheGorge.png';

const dummyMovies = [
  {
    index: 0,
    title: 'The Gorge',
    image: Mufasa,
    rating: 7.9,
    isTrending: true,
  },
  {
    index: 1,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  // ... sampai 20 items kalau mau
  {
    index: 2,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  // ... sampai 20 items kalau mau
  {
    index: 3,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  // ... sampai 20 items kalau mau
  {
    index: 4,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  {
    index: 5,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  {
    index: 6,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  {
    index: 7,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  {
    index: 8,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  {
    index: 9,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  {
    index: 10,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  {
    index: 11,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  {
    index: 12,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  {
    index: 13,
    title: 'Mufasa',
    image: Mufasa,
    rating: 7.5,
    isTrending: true,
  },
  // ... sampai 20 items kalau mau
];

const dummyExploreMore = [
  {
    title: ' The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
  {
    title: 'The Gorge',
    image: TheGorgePoster,
    rating: 9.9,
    isTrending: false,
  },
];

export const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero
        backdropUrl={TheGorge}
        title='The Gorge'
        overview='Two highly trained operatives grow close from a distance after being sent to guard opposite sindexes of a mysterious gorge. When an evil below emerges, they must work together to survive what lies within.'
      />
      <TrendingNow movies={dummyMovies} />
      <ExploreMore movies={dummyExploreMore} />
      <Footer />
    </div>
  );
};
