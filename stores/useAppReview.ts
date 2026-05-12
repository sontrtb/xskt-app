import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppReviewState {
  hasRated: boolean;
  launchCount: number;
  lastRequestedLaunchCount: number;
  setHasRated: (val: boolean) => void;
  incLaunchCount: () => void;
  setLastRequestedLaunchCount: (val: number) => void;
}

export const useAppReview = create<AppReviewState>()(
  persist(
    (set) => ({
      hasRated: false,
      launchCount: 0,
      lastRequestedLaunchCount: 0,
      setHasRated: (val) => set({ hasRated: val }),
      incLaunchCount: () => set((state) => ({ launchCount: state.launchCount + 1 })),
      setLastRequestedLaunchCount: (val) => set({ lastRequestedLaunchCount: val }),
    }),
    {
      name: 'app-review-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
