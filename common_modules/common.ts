import { LangPair, Word } from "@/common_modules/types";

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

export function getWordsVariations(dictionary: Word[], wordId: number, numberVariations: number,
  baseLang: string, learningLang: string): LangPair[] {

  let variationsId: number[] = [wordId];
  let count = 0;
  let countVariations = 1000;

  while (count < numberVariations && countVariations > 0) {
    let randomId = 0;
    let nextId = true;
    while (nextId && countVariations > 0) {
      randomId = getRandomInteger(1, dictionary.length - 1);
      nextId = variationsId.includes(randomId);
      countVariations--;
    }
    if (!nextId) {
      variationsId.push(randomId);
      count++;
      countVariations = 1000;
    }
    countVariations--;
  }

  variationsId.shift();

  const result: LangPair[] = [];

  for (let id of variationsId) {
    const word = getWordById(dictionary, id);
    if (!word) continue;
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

export function getWordById(dictionary: Word[], id: number): Word | undefined {
  for (let i = 0; i < dictionary.length; i++) {
    let word = dictionary[i];
    if (word.id === id) return word;
  }
  return undefined;
}

export function getRandomInteger(min: number, max: number): number {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
