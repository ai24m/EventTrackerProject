import { Algorithm } from "./algorithm";

export class Tracker {
  id: number;
  content: string | undefined;
  createdAt: string | undefined;
  updatedAt: string  | undefined;
  completed: boolean | undefined;
  pass: boolean | undefined;
  algorithm: Algorithm;

  constructor(id: number = 0, content?: string, createdAt?: string, updatedAt?: string, completed?:boolean,
    algorithm: Algorithm = new Algorithm, pass?: boolean) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.completed = completed;
    this.pass = pass;
    this.algorithm = algorithm;
  }
}
