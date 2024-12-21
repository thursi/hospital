import { Pet } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  pets: Pet[];
  filterpets: Pet[];
  pet: Pet[];
  selectedPet: Pet | null | undefined;
  setSelectedPet: (pet: Pet | null | undefined) => void;
  setLoading : (loading: boolean) => void;
};

export const usePetStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      pets: [],
      filterpets: [],
      selectedPet: null,
      setAllPets: (pets: any[]) => {
        set({ pets: pets, loading: false });
      },
      pet: [],
      setAllPet: (pet: any[]) => {
        set({ pet: pet, loading: false });
      },

      setAllFilterPets: (filterpets: any[]) => {
        set({ filterpets: filterpets, loading: false });
      },
      setSelectedPet: (pet: Pet | null | undefined) => {
        set({ selectedPet: pet, loading: false });
      },
      setLoading: (loading: boolean) => {
        set({ loading: loading });
      },
    }),
    {
      name: "pet_store",
    }
  )
);
