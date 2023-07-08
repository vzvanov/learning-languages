import { getDictionaryFromLocalStore, getNextDictionaryId } from "@/common_modules/common";
import { Word } from "@/common_modules/types";

export const sendWord = async (word: Word) => {
  let dic: Word[] = getDictionaryFromLocalStore();
  if (isWordFound(word, dic)) return false;
  word.id = getNextDictionaryId();
  dic.push(word);
  localStorage.setItem('dictionary', JSON.stringify(dic));
  return true;
};

export const isWordFound = (word: Word, dic: Word[]): boolean => {
  for (let dicItem of dic) {
    for (let mean of dicItem.meanings) {
      const value = getValueByLang(mean.lang, word);
      if (value === mean.value) return true;
    }
  }
  return false;
}

const getValueByLang = (lang: string, word: Word): string => {
  for (let item of word.meanings) {
    if (item.lang === lang) return item.value;
  }
  return '';
}