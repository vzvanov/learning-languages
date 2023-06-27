import { SourceDB } from "@/common_modules/types";
import { languages } from "@/data/languages";

export const getAllLanguages = async (source: SourceDB) => {
  if (source === SourceDB.api) {
    const response = await fetch("/api/languages");
    if (response.ok) return response.json();
    throw new Error("Unable to fetch languages.");
  }
  if (source === SourceDB.local) {
    return languages;
  }
};
