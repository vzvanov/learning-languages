import { getDictionary } from "@/common_modules/common";
import { dictionary } from "@/data/dictionary";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { lang: string[] } }) {
  const [baseLang, learningLang] = params.lang;

  if (!baseLang || !learningLang) {
    return new Response('Parameter not specified', {
      status: 400
    }
    )
  }
  const dic = getDictionary(dictionary, baseLang, learningLang);
  return NextResponse.json(dic);
}
