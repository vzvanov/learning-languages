import { Language } from '@/common_modules/types';
import { getAllLanguages } from '@/services/getLanguages';
import { create } from 'zustand';

type UseLanguages = {
  languages: Language[];
  baseLang: string;
  learningLang: string;
  getAllLanguages: () => Promise<void>;
  setBaseLanguage: (appLang: string) => void;
  setLearningLanguage: (learningLang: string) => void;
}

export const useLanguages = create<UseLanguages>()((set) => ({
  languages: [],
  baseLang: 'eng',
  learningLang: 'slv',
  getAllLanguages: async () => {
    const languages = await getAllLanguages();
    set({ languages });
  },
  setBaseLanguage: (baseLang) => {
    set({ baseLang });
  },
  setLearningLanguage: (learningLang) => {
    set({ learningLang });
  }
}))