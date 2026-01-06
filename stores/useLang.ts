import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface LangState {
  lang: "vn" | "en" | "lo";
  setLang: (lang: "vn" | "en" | "lo") => void;
}

export const useLang = create<LangState>()(
  persist(
    (set) => ({
      lang: "vn",
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'lang-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
