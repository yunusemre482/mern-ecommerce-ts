import mongoose from 'mongoose';
import { IProduct } from '../types/products.types';
import { reviewSchema } from './ProductReview.model';

export const productSchema = new mongoose.Schema<IProduct>(
	{
		name: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true },
		image: { type: String, required: true },
		images: [String],
		brand: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		countInStock: { type: Number, required: true },
		rating: { type: Number, required: true },
		numReviews: { type: Number, required: true },
		reviews: [reviewSchema],
	},
	{
		timestamps: true,
		collection: 'products',
	}
);

const Product = mongoose.model('Product', productSchema);
export default Product;
