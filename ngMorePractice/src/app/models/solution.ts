import { Language } from "./language";

export class Solution {
  id: number;
  imageUrl: string | undefined;
  description: string | undefined;
  pass: boolean | undefined;
  language: Language;

  constructor(
    id: number = 0,
    imageUrl?: string,
    language: Language = new Language,
    pass?: boolean)
    {
    this.id = id;
    this.imageUrl = imageUrl;
    this.pass = pass;
    this.language = language;
    }
}
