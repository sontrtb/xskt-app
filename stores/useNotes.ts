// stores/useNotes.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Note {
  id: string;
  date: string;
  title: string;
  content: string;
}

interface NotesState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id'>) => void;
  updateNote: (id: string, note: Partial<Omit<Note, 'id'>>) => void;
  deleteNote: (id: string) => void;
  getNoteByDate: (date: string) => Note | undefined;
  getNoteById: (id: string) => Note | undefined;
}

export const useNotes = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      
      addNote: (note) => {
        const newNote: Note = {
          ...note,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        };
        set((state) => ({
          notes: [...state.notes, newNote],
        }));
      },
      
      updateNote: (id, updatedNote) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updatedNote } : note
          ),
        }));
      },
      
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },
      
      getNoteByDate: (date) => {
        return get().notes.find((note) => note.date === date);
      },
      
      getNoteById: (id) => {
        return get().notes.find((note) => note.id === id);
      },
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);