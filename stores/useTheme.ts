import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ColorState {
  theme: "light" | "dart";
  setTheme: (theme: "light" | "dart") => void;
  changeTheme: () => void
}

export const useTheme = create<ColorState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
      changeTheme: () => set((state) => ({ theme: state.theme === "light" ? "dart" : 'light' })),
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
