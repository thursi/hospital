import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  login: any; // Holds the user login information
  loadingAuth: boolean; // Tracks authentication loading state
  setLogin: (login: any) => void; // Function to update login state
  setLoadingAuth: (isLoadingAuth: boolean) => void; // Function to update loading state
};

export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      login: undefined, // Default login state
      loadingAuth: false, // Default loading state
      setLogin: (login: any) => {
        console.log("login response", login);
        set({ login }); // Update the login state
      },
      setLoadingAuth: (isLoadingAuth: boolean) => {
        set({ loadingAuth: isLoadingAuth }); // Update the loading state
      },
    }),
    {
      name: "auth_store", // Key for storing state in local storage
    }
  )
);
