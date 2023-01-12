export type IProduct = {
	_id: string;
	name: string;
	description: string;
	price: number;
	brand: string;
	image: string;
	category: string;
	countInStock: number;
	rating: number;
	numReviews: number;
};

type Gender = 'women' | 'man' | 'children';

export type IProuctSearchCriterias = {
	gender?: Gender;
	category?: string | string[];
	brand?: string | string[];
	minPrice?: number;
	maxPrice?: number;
	ProductRate?: number;
};
