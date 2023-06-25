import { dictionary } from "@/data/dictionary";
import { NextResponse } from "next/server";
import { getSearchParams } from "../route";
import { WordToLearn } from "@/common_modules/types";
import { getMeaningsWord, getRandomInteger, getWordById, getWordsVariations } from "@/common_modules/common";

export async function GET(req: Request) {
  const numberOfOptions: number = 7;
  const result: WordToLearn = {
    id: 0,
    baseLang: '',
    learningLang: '',
    variation: []
  };
  const { baseLang, learningLang } = getSearchParams(req.url);
  if (!baseLang || !learningLang) {
    return new Response('Parameter not specified', {
      status: 400
    }
    )
  }
  const randomId = getRandomInteger(1, dictionary.length - 1);
  const word = getWordById(dictionary, randomId);
  if (!word) {
    return NextResponse.json(result);
  }
  const { data, readyWord } = getMeaningsWord(word, baseLang, learningLang);
  if (!readyWord) return NextResponse.json(result);

  const wordsVariations = getWordsVariations(dictionary, randomId, numberOfOptions, baseLang, learningLang);

  result.id = data.id;
  result.baseLang = data.baseLang;
  result.learningLang = data.learningLang;
  result.variation = wordsVariations;

  return NextResponse.json(result);
}
