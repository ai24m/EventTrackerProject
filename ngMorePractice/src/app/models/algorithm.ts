export class Algorithm {
	id: number;
	title:  string  | undefined;
	description: string | undefined;
	rating: number | undefined;
	sample: string | undefined;

  constructor(id: number = 0, title?: string, description?: string, rating?: number, sample?: string) {
	this.id = id;
	this.title = title;
	this.description = description;
	this.rating = rating;
	this.sample = sample;
	}
}

