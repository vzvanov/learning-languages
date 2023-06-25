import { getDictionary } from "@/common_modules/common";
import { dictionary } from "@/data/dictionary";
import { NextResponse } from "next/server";

type SearchParams = {
  baseLang: string | null;
  learningLang: string | null;
}

export const getSearchParams = (url: string): SearchParams => {
  const { searchParams } = new URL(url);

  const result: SearchParams = {
    baseLang: searchParams.get('baseLang'),
    learningLang: searchParams.get('learningLang'),
  };

  return result;
}

export async function GET(req: Request) {
  const { baseLang, learningLang } = getSearchParams(req.url);

  if (!baseLang || !learningLang) {
    return new Response('Parameter not specified', {
      status: 400
    }
    )
  }
  const dic = getDictionary(dictionary, baseLang, learningLang);

  return NextResponse.json(dic);
}
