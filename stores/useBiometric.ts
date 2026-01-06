import { IBioRegister } from '@/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface IBiometric {
  enabel: boolean;
  data: IBioRegister
}

export interface BiometricState {
  enabelBiometric: IBiometric | undefined;
  setEnabelBiometric: (enabel: IBiometric | undefined) => void;
}

export const useBiometric = create<BiometricState>()(
  persist(
    (set) => ({
      enabelBiometric: undefined,
      setEnabelBiometric: (enabelBiometric: IBiometric | undefined) => set({ enabelBiometric }),
    }),
    {
      name: 'biometric-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
