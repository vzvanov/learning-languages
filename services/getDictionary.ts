import { getDictionaryByFilter, getDictionaryFromLocalStore, getFilterByName, getLangPairDictionary, getNextWord } from "@/common_modules/common";
import { LangPair, SourceDB, Word, WordToLearn } from "@/common_modules/types";
import { dictionary } from "@/data/dictionary";

export const getAllWords = async (baseLang: string, learningLang: string, source: SourceDB) => {
  const handler = getHandlersAllWords().get(source);
  return handler(baseLang, learningLang);
};

export const getNextWordToLearn = async (baseLang: string, learningLang: string, source: SourceDB, selection: string) => {
  const handler = getHandlersNextWordToLearn().get(source);
  return handler(baseLang, learningLang, selection);
};

const handleAllWordsLocal = (baseLang: string, learningLang: string): LangPair[] => {
  const dic = getDictionaryFromLocalStore();
  return getLangPairDictionary(dic, baseLang, learningLang);
}

const handleAllWordsApi = async (baseLang: string, learningLang: string) => {
  const url = `/api/dictionary/${baseLang}/${learningLang}`;
  const response = await fetch(url,
    {
      next: { revalidate: 60 },
    });
  if (response.ok) return response.json();
  throw new Error("Unable to fetch words.");
}

const getHandlersAllWords = () => {
  const handlers = new Map();
  handlers.set(SourceDB.api, handleAllWordsApi);
  handlers.set(SourceDB.local, handleAllWordsLocal);
  return handlers;
}

const getHandlersNextWordToLearn = () => {
  const handlers = new Map();
  handlers.set(SourceDB.api, handleNextWordToLearnApi);
  handlers.set(SourceDB.local, handleNextWordToLearnLocal);
  return handlers;
}

const handleNextWordToLearnLocal = (baseLang: string, learningLang: string, selection: string): WordToLearn | undefined => {
  let dic: Word[];
  if (selection) {
    const filter = getFilterByName(selection);
    dic = getDictionaryByFilter(dictionary, filter);
  } else {
    dic = dictionary;
  }
  const nextWord = getNextWord(baseLang, learningLang, dic);
  return nextWord;
}

const handleNextWordToLearnApi = async (baseLang: string, learningLang: string) => {
  const url = `/api/next-for-learning/${baseLang}/${learningLang}`;
  const response = await fetch(url);
  if (response.ok) return response.json();
  throw new Error("Unable to fetch words.");
}