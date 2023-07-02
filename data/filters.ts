import { FilterItem, LangPart } from "@/common_modules/types";

export const filters: FilterItem[] = [
  {
    name: 'to_be',
    filter: [13, 14, 15, 16, 17, 18, 19, 20, 21],
    key: 'id'
  },
  {
    name: 'pronoun',
    filter: [LangPart.pronoun],
    key: 'part',
  }
]
