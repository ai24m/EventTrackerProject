import { Solution } from "./solution";

export class Algorithm {
	id: number;
	title:  string  | undefined;
	description: string | undefined;
	rating: number | undefined;
	sample: string | undefined;
  solutions: Array<Solution> | undefined;

  constructor(id: number = 0, title?: string, description?: string, rating?: number, sample?: string,
    solutions?: Array<Solution>) {
	this.id = id;
	this.title = title;
	this.description = description;
	this.rating = rating;
	this.sample = sample;
  this.solutions = solutions;
	}
}

