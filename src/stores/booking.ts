import { create } from 'zustand';

export interface BookingState {
  service: string;
  stylist: string;
  date: string;
  time: string;
  step: number;
  customerName: string;
  customerEmail: string;
  setField: <K extends 'service' | 'stylist' | 'date' | 'time' | 'customerName' | 'customerEmail'>(key: K, value: string) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

const initial = { service: '', stylist: '', date: '', time: '', step: 1, customerName: '', customerEmail: '' };
export const useBookingStore = create<BookingState>((set) => ({
  ...initial,
  setField: (key, value) => set({ [key]: value }),
  setStep: (step) => set({ step: Math.max(1, Math.min(4, step)) }),
  reset: () => set(initial),
}));
