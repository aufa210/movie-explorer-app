import { create } from 'zustand';

type Toast = {
  id: number;
  message: string;
  duration?: number;
};

type ToastStore = {
  toasts: Toast[];
  lastMessage: string | null;
  showToast: (message: string, duration?: number) => void;
  removeToast: (id: number) => void;
};

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  lastMessage: null,

  showToast: (message, duration = 3000) => {
    const { toasts, lastMessage } = get();

    // Cegah duplikat message
    if (message === lastMessage) return;

    const id = Date.now();
    const newToast = { id, message, duration };

    // Replace toast aktif
    set({
      toasts: [newToast],
      lastMessage: message,
    });
  },

  removeToast: (id) => {
    set((state) => {
      const updatedToasts = state.toasts.filter((toast) => toast.id !== id);
      const isRemovedLast =
        state.toasts.find((toast) => toast.id === id)?.message ===
        state.lastMessage;

      return {
        toasts: updatedToasts,
        lastMessage: isRemovedLast ? null : state.lastMessage,
      };
    });
  },
}));
