import { LangPair, LangPart, SelectionItem, Word, WordToLearn } from "@/common_modules/types";

export const getMeaningsWord = (word: Word, baseLang: string, learningLang: string) => {
  let data: LangPair = {
    id: word.id,
    baseLang: '',
    learningLang: ''
  };
  let readyWord: boolean = false;

  for (let item of word.meanings) {
    if (item.lang === baseLang) data.baseLang = item.value;
    if (item.lang === learningLang) data.learningLang = item.value;
    readyWord = Boolean(data.baseLang) && Boolean(data.learningLang);
    if (readyWord) break;
  }
  return { data, readyWord };
}

export const getDictionary = (dictionary: Word[], baseLang: string, learningLang: string): LangPair[] => {
  const dic: LangPair[] = [];

  dictionary.forEach((word) => {
    const { data, readyWord } = getMeaningsWord(word, baseLang, learningLang);
    if (readyWord) dic.push(data);
  })
  return dic;
}

export function getWordsVariations(dictionary: Word[], arrayId: number[], numberVariations: number,
  baseLang: string, learningLang: string): LangPair[] {

  let variationsId: number[] = [];
  let count = 0;

  while (count < numberVariations && arrayId.length > 0) {
    let randomId = getRandomInteger(0, arrayId.length - 1);
    variationsId.push(arrayId[randomId]);
    arrayId.splice(randomId, 1);
    count++;
  }

  const result: LangPair[] = [];

  for (let id of variationsId) {
    const word = getWordById(dictionary, id);
    if (!word.id) continue;
    const { data, readyWord } = getMeaningsWord(word, baseLang, learningLang);
    if (!readyWord) continue;
    result.push({
      id,
      baseLang: data.baseLang,
      learningLang: data.learningLang,
    })
  }

  return result;
}

export function getWordById(dictionary: Word[], id: number): Word {
  for (let i = 0; i < dictionary.length; i++) {
    let word = dictionary[i];
    if (word.id === id) return word;
  }
  const result: Word = {
    id: 0,
    meanings: [],
    part: LangPart.noun,
    description: [],
    images: []
  }
  return result;
}

export function getRandomInteger(min: number, max: number): number {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function getNextWord(baseLang: string, learningLang: string, dictionary: Word[]): WordToLearn | undefined {
  const numberOfOptions: number = 7;
  const result: WordToLearn = {
    id: 0,
    baseLang: '',
    learningLang: '',
    variation: []
  };
  const arrayId = [];
  for (let word of dictionary) arrayId.push(word.id);

  const randomId = getRandomInteger(0, arrayId.length - 1);
  const word = getWordById(dictionary, arrayId[randomId]);
  if (!word.id) undefined;

  const { data, readyWord } = getMeaningsWord(word, baseLang, learningLang);
  if (!readyWord) undefined;

  arrayId.splice(randomId, 1);

  const wordsVariations = getWordsVariations(dictionary, arrayId, numberOfOptions, baseLang, learningLang);

  result.id = data.id;
  result.baseLang = data.baseLang;
  result.learningLang = data.learningLang;
  result.variation = wordsVariations;

  return result;
}

export function getDictionaryBySelection(dictionary: Word[], fastSelection: SelectionItem): Word[] {
  const { filter, key } = fastSelection;
  const dic: Word[] = [];
  for (let word of dictionary) {
    const value = Number(word[key as keyof Word]);
    if (filter.includes(value)) dic.push(word);
  }
  return dic;
}
