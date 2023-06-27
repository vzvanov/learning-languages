import { dictionary } from "@/data/dictionary";
import { NextResponse } from "next/server";
import { WordToLearn } from "@/common_modules/types";
import { getMeaningsWord, getNextWord, getRandomInteger, getWordById, getWordsVariations } from "@/common_modules/common";

export async function GET(req: Request, { params }: { params: { lang: string[] } }) {
  const [baseLang, learningLang] = params.lang;
  if (!baseLang || !learningLang) {
    return new Response('Parameter not specified', {
      status: 400
    }
    )
  }
  const result = getNextWord(baseLang, learningLang, dictionary);
  if (!result) {
    return new Response('Parameter not specified', {
      status: 400
    }
    )
  }
  return NextResponse.json(result);
}
