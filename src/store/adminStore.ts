import { Doctor } from "@/lib/typings";
import create from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading?: boolean;

  doctors: Doctor[];
  setAllDoctors: (doctors: Doctor[]) => void;
};

export const useAdminStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      doctors: [],
      setAllDoctors: (doctors: Doctor[]) => {
        set({ doctors: doctors, loading: false});
      },
    }),
    {
      name: "admin_stores",
    }
  )
);
