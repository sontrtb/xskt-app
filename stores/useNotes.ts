// stores/useNotes.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface INote {
  date: string;
  content: string;
}

interface NotesState {
  notes: INote[];
  addNote: (note: INote) => void;
  updateNote: (date: string, note: Partial<Omit<INote, 'date'>>) => void;
  deleteNote: (date: string) => void;
  getNoteByDate: (date: string) => INote | undefined;
  getNoteById: (date: string) => INote | undefined;
}

export const useNotes = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      
      addNote: (note) => {
        const newNote: INote = {
          ...note,
        };
        set((state) => ({
          notes: [...state.notes, newNote],
        }));
      },
      
      updateNote: (date, updatedNote) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.date === date ? { ...note, ...updatedNote } : note
          ),
        }));
      },
      
      deleteNote: (date) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.date !== date),
        }));
      },
      
      getNoteByDate: (date) => {
        return get().notes.find((note) => note.date === date);
      },
      
      getNoteById: (date) => {
        return get().notes.find((note) => note.date === date);
      },
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);