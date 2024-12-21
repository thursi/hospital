import { User } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  users: User[];
  user: User[];
  selectedUser: User | null | undefined;
  setSelectedUser: (user: User | null | undefined) => void;
};

export const useUserStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      users: [],
      selectedUser: null,
      setAllUsers: (users: any[]) => {
        set({ users: users, loading: false });
      },
      user: [],
      setAllUser: (user: any[]) => {
        set({ user: user, loading: false });
      },
      setSelectedUser: (user: User | null | undefined) => {
        set({ selectedUser: user, loading: false });
      },
    }),
    {
      name: "user_store",
    }
  )
);
