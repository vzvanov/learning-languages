import { Language, SourceDB } from '@/common_modules/types';
import { getAllLanguages } from '@/services/getLanguages';
import { create } from 'zustand';

type UseLanguages = {
  languages: Language[];
  baseLang: string;
  learningLang: string;
  getAllLanguages: (source: SourceDB) => Promise<void>;
  setBaseLanguage: (appLang: string) => void;
  setLearningLanguage: (learningLang: string) => void;
}

export const useLanguages = create<UseLanguages>()((set) => ({
  languages: [],
  baseLang: 'eng',
  learningLang: 'slv',
  getAllLanguages: async (source) => {
    const languages = await getAllLanguages(source);
    set({ languages });
  },
  setBaseLanguage: (baseLang) => {
    set({ baseLang });
  },
  setLearningLanguage: (learningLang) => {
    set({ learningLang });
  }
}))

type UseDB = {
  source: SourceDB;
  setSourceDB: (source: SourceDB) => void;
}

export const useDB = create<UseDB>()((set) => ({
  source: SourceDB.local,
  setSourceDB: (source) => {
    set({ source });
  }
}))