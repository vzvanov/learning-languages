import { getDictionary, getDictionaryBySelection, getNextWord } from "@/common_modules/common";
import { Selections, SourceDB, Word } from "@/common_modules/types";
import { dictionary } from "@/data/dictionary";
import { selections } from "@/data/selections";

export const getAllWords = async (baseLang: string, learningLang: string, source: SourceDB) => {
  if (source === SourceDB.api) {
    const url = `/api/dictionary/${baseLang}/${learningLang}`;
    const response = await fetch(url,
      {
        next: { revalidate: 60 },
      });
    if (response.ok) return response.json();
    throw new Error("Unable to fetch words.");
  }

  if (source === SourceDB.local) {
    const dic = getDictionary(dictionary, baseLang, learningLang);
    return dic;
  }
};

export const getNextWordToLearn = async (baseLang: string, learningLang: string, source: SourceDB, selection: string) => {
  if (source === SourceDB.api) {
    const url = `/api/next-for-learning/${baseLang}/${learningLang}`;
    const response = await fetch(url);
    if (response.ok) return response.json();
    throw new Error("Unable to fetch words.");
  }

  if (source === SourceDB.local) {
    let dic: Word[];
    if (selection) {
      const fastSelection = selections[selection as keyof Selections];
      dic = getDictionaryBySelection(dictionary, fastSelection);
    } else {
      dic = dictionary;
    }
    const nextWord = getNextWord(baseLang, learningLang, dic);
    return nextWord;
  }
};
