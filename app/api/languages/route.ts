import { languages } from "@/data/languages";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json(languages)
}
