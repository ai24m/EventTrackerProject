import { Algorithm } from "./algorithm";
import { Language } from "./language";

export class Solution {
  id: number;
  imageUrl: string | undefined;
  description: string | undefined;
  pass: boolean | undefined;
  language: Language;
  algorithm: Algorithm;

  constructor(
    id: number = 0,
    imageUrl?: string,
    language: Language = new Language,
    algorithm: Algorithm = new Algorithm,
    pass?: boolean)
    {
    this.id = id;
    this.imageUrl = imageUrl;
    this.pass = pass;
    this.language = language;
    this.algorithm = algorithm;
    }
}
