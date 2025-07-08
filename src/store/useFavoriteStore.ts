import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BaseMovie } from '@/types/movie';

interface FavoriteState {
  favorites: BaseMovie[];
  addFavorite: (movie: BaseMovie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => {
          if (!get().isFavorite(movie.id)) {
            return { favorites: [...state.favorites, movie] };
          }
          return state;
        }),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== id),
        })),
      isFavorite: (id) => {
        return get().favorites.some((m) => m.id === id);
      },
    }),
    {
      name: 'favorite-storage', // localStorage key
    }
  )
);
