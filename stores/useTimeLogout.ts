import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface TimeLogoutState {
  timeLogout?: number;
  setTimeLogout: (timeLogout?: number) => void;
}

export const useTimeLogout = create<TimeLogoutState>()(
  persist(
    (set) => ({
      timeLogout: undefined,
      setTimeLogout: (timeLogout) => set({ timeLogout: timeLogout }),
    }),
    {
      name: 'time-logout-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
