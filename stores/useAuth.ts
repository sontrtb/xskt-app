import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserStore {
  accessToken: string;
  username: string;
  fullname: string;
}

export interface AuthState {
  user: UserStore | null;
  setUser: (user: UserStore | null) => void;
  clearUser: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({user: null})
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
