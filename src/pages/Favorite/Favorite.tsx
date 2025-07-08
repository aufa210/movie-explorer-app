import React from 'react';
import { Header } from '@/components/layout/Header';
import { Empty } from '@/components/ui/Empty';
import { Footer } from '@/components/layout/Footer';

export const Favorite: React.FC = () => {
  return (
    <div>
      <Header />
      <Empty />
      <Footer fullBottom />
    </div>
  );
};
