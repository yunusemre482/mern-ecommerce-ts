import { Document } from 'mongoose';
import { type } from 'os';

export type IProductReview = {
	name: string;
	comment: string;
	rating: number;
	createdAt: Date;
	updatedAt: Date;
};

export type IProduct = Document & {
	_doc: any;
	name: string;
	image: string;
	images: string[];
	brand: string;
	category: string;
	description: string;
	price: number;
	countInStock: number;
	rating: number;
	numReviews: number;
	reviews: {
		[key: string]: IProductReview;
	};
	createdAt: Date;
	updatedAt: Date;
	likedBy: string[];
};
export type IMulterFile = {
	buffer: Buffer;
	encoding: string;
	fieldname: string;
	mimetype: string;
	originalname: string;
	size: number;
};
