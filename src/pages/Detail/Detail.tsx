import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DetailCard } from '@/components/ui/DetailCard';
import { ToastProvider } from '@/provider/ToastProvider';
import { fetchMovieDetail, fetchMovieCasts } from '@/services/detailApi';
import { BaseMovie, Cast } from '@/types/movie';
import { FloatingSearchResult } from '@/components/ui/FloatingSearchResult/FloatingSearchResult';
import { useMovie } from '@/context/MovieContext';

export const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<BaseMovie | null>(null);
  const [casts, setCasts] = useState<Cast[]>([]);
  const { allMovies } = useMovie();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const movieData = await fetchMovieDetail(Number(id));
      const castData = await fetchMovieCasts(Number(id));
      setMovie(movieData);
      setCasts(castData);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (movie?.id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [movie?.id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <ToastProvider>
      <Header />
      <FloatingSearchResult movies={allMovies} />
      <DetailCard {...movie} casts={casts} />
      <Footer />
    </ToastProvider>
  );
};
