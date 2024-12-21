// store/userRegisterStore.ts
import create from 'zustand';

interface UserRegisterState {
  user: any[];
  setAllUserRegister: (user: any[]) => void;
}

export const useuserRegisterStore = create<UserRegisterState>((set) => ({
    user: [],
    setAllUserRegister: (user) => set({ user }),
}));