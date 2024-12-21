import { Department } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  cities: Department[];
  city: Department[];
  setLoading: (loading: boolean) => void;
};

export const useCityStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      cities: [],
      selectedDepartment: null,
      setAllCities: (cities: any[]) => {
        set({ cities: cities, loading: false });
      },
      city: [],
      setAllCity: (city: any[]) => {
        set({ city: city, loading: false });
      },
      setLoading(loading: boolean) {
        set({ loading: loading });
      },
    }),
    {
      name: "city_store",
    }
  )
);
