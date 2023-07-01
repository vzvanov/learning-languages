
export enum LangPart {
  noun, pronoun, adjective, verb, adverb, preposition, conjunction, interjection
}

export enum SourceDB {
  local, api
}

export type Part = {
  part: LangPart;
  description: LangValue[];
}

export type LangValue = {
  lang: string;
  value: string;
}

export type Language = {
  id: number;
  abbreviation: string;
  description: LangValue[];
}

export type Word = {
  id: number;
  meanings: LangValue[];
  part: LangPart;
  images: String[];
  description: LangValue[];
}

export type LangPair = {
  id: number;
  baseLang: string;
  learningLang: string;
}

export type WordToLearn = {
  id: number,
  baseLang: string,
  learningLang: string,
  variation: LangPair[]
}

export type Option = {
  to_be: number[];
}