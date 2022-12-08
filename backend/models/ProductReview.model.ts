import mongoose from 'mongoose';
import { IProductReview } from '../types/products.types';

export const reviewSchema = new mongoose.Schema<IProductReview>(
	{
		name: { type: String, required: true },
		comment: { type: String, required: true },
		rating: { type: Number, required: true },
	},
	{
		timestamps: true,
		collection: 'reviews',
	}
);

const ProductReview = mongoose.model('Review', reviewSchema);

export default ProductReview;
