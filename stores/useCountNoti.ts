import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CountNotiState {
  count: number;
  increaseCount: () => void;
  reduceCount: () => void;
  setCount: (count: number) => void;
}

export const useCountNoti = create<CountNotiState>()(
  persist(
    (set) => ({
      count: 0,
      setCount: (count) => set({ count }),
      increaseCount: () => set((state) => ({ count: state.count + 1 })),
      reduceCount: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      name: 'count-noti-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
