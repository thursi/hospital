import { Specialization } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  specializations: Specialization[];
  filterspecializations: Specialization[];

  specialization: Specialization[];
  selectedSpecialization: Specialization | null | undefined;
  setSelectedSpecialization: (specialization: Specialization | null | undefined) => void;
};

export const useSpecializationStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      specializations: [],
      filterspecializations: [],
      selectedSpecialization: null,
      setAllSpecializations: (specializations: any[]) => {
        set({ specializations: specializations, loading: false });
      },

      setAllFilterSpecializations: (filterspecializations: any[]) => {
        set({ filterspecializations: filterspecializations, loading: false });
      },
      specialization: [],
      setAllSpecialization: (specialization: any[]) => {
        set({ specialization: specialization, loading: false });
      },
      setSelectedSpecialization: (specialization: Specialization | null | undefined) => {
        set({ selectedSpecialization: specialization, loading: false });
      },
    }),
    {
      name: "specialization_store",
    }
  )
);
