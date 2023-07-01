import { LangPart, Selections } from "@/common_modules/types";

export const selections: Selections = {
  to_be: {
    filter: [13, 14, 15, 16, 17, 18, 19, 20, 21],
    key: 'id'
  },
  pronoun: {
    filter: [LangPart.pronoun],
    key: 'part',
  },
}