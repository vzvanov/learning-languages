import { LangPart, Part } from "../common_modules/types";

export const parts: Part[] = [
  {
    part: LangPart.noun,
    description: [
      {
        lang: "rus",
        value: "существительное"
      },
      {
        lang: "slv",
        value: "samostalnik"
      },
      {
        lang: "eng",
        value: "noun"
      }
    ]
  },
  {
    part: LangPart.adjective,
    description: [
      {
        lang: "rus",
        value: "прилагательное"
      },
      {
        lang: "slv",
        value: "pridevnik"
      },
      {
        lang: "eng",
        value: "adjective"
      }
    ]
  }
]