import { useCallback, useEffect, useState } from 'react';
import type { Booking } from '@/types';
import { loadBookings, saveBookings } from '@/lib/storage';

export function useBookings(): {
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  cancelBooking: (id: string) => void;
} {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(loadBookings());
  }, []);

  const addBooking = useCallback((b: Booking) => {
    setBookings(prev => {
      const next = [b, ...prev];
      saveBookings(next);
      return next;
    });
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings(prev => {
      const next = prev.map(b => (b.id === id ? { ...b, status: 'cancelled' as const } : b));
      saveBookings(next);
      return next;
    });
  }, []);

  return { bookings, addBooking, cancelBooking };
}
