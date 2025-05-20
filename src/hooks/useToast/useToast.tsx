import { useState, useCallback } from 'react';

type ToastState = {
  id: number;
  message: string;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    const newToast = { id, message };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
  };
}
