import { Booking } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  bookings: Booking[];
  filterbookings: Booking[];
  booking: Booking[];
  selectedBooking: Booking | null | undefined;
  setSelectedBooking: (booking: Booking | null | undefined) => void;
};

export const useBookingStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      bookings: [],
      filterbookings: [],
      selectedBooking: null,
      setAllBookings: (bookings: any[]) => {
        set({ bookings: bookings, loading: false });
      },
      setAllFilterBookings: (filterbookings: any[]) => {
        set({ filterbookings: filterbookings, loading: false });
      },
      booking: [],
      setAllBooking: (booking: any[]) => {
        set({ booking: booking, loading: false });
      },
      setSelectedBooking: (booking: Booking | null | undefined) => {
        set({ selectedBooking: booking, loading: false });
      },
    }),
    {
      name: "booking_store",
    }
  )
);
