import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ApartmentStore {
  apartmentId: number;
  apartmentCode: string;
  domainId: number;
  domainName: string;
}

export interface ApartmentState {
  apartments: ApartmentStore[] | null;
  setApartments: (apartments: ApartmentStore[]) => void;
  apartmentSelect: ApartmentStore | null;
  setApartmentSelect: (apartmentSelect: ApartmentStore) => void;
  clearApartmen: () => void;
}

export const useApartment = create<ApartmentState>()(
  persist(
    (set) => ({
      apartments: null,
      setApartments: (apartments) => set({ apartments }),
      apartmentSelect: null,
      setApartmentSelect: (apartmentSelect) => set({ apartmentSelect }),
      clearApartmen: () => set({ apartments: null,  apartmentSelect: null})
    }),
    {
      name: 'apartments-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);