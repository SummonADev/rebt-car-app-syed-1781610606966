import type { Booking } from '@/types';

const KEY = 'driveaway.bookings.v1';

export function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

export function saveBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(bookings));
  } catch {
    // ignore quota errors
  }
}
