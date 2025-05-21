import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DetailCard } from '@/components/ui/DetailCard';
import { ToastProvider } from '@/provider/ToastProvider'; // <== tambahkan ini
import CaptainAmericaPoster from '@/assets/Captain America: Brave New World.png';
import DetailBackground from '@/assets/CaptainAmerica:BraveNewWorldBackground.png';

export const Detail = () => {
  return (
    <ToastProvider>
      {' '}
      {/* Wrapping seluruh halaman */}
      <Header />
      <DetailCard
        backgroundUrl={DetailBackground}
        posterUrl={CaptainAmericaPoster}
        title='Captain America: Brave New World'
        releaseDate='12 Februari 2025'
        rating={8.2}
        genre='Action'
        ageLimit={13}
      />
      <Footer />
    </ToastProvider>
  );
};
