import { WordToLearn } from "@/common_modules/types";

export const getAllWords = async (baseLang: string, learningLang: string) => {
  const url = `/api/dictionary/?baseLang=${baseLang}&learningLang=${learningLang}`;
  const response = await fetch(url,
    {
      next: { revalidate: 60 },
    });
  if (response.ok) return response.json();

  throw new Error("Unable to fetch words.");

};

export const getNextWordToLearn = async (baseLang: string, learningLang: string) => {
  const url = `/api/dictionary/next-for-learning/?baseLang=${baseLang}&learningLang=${learningLang}`;
  const response = await fetch(url);
  if (response.ok) return response.json();

  throw new Error("Unable to fetch words.");

};
