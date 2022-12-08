import mongoose from 'mongoose';
import { IProduct } from '../types/products.types';
import { reviewSchema } from './ProductReview.model';

export const productSchema = new mongoose.Schema<IProduct>(
	{
		name: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true },
		image: { type: String },
		images: [String],
		brand: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String },
		price: { type: mongoose.Types.Decimal128, required: true },
		countInStock: { type: Number, required: true },
		rating: { type: Number },
		numReviews: { type: Number },
		reviews: [reviewSchema],
	},
	{
		timestamps: true,
		collection: 'products',
	}
);

const Product = mongoose.model('Product', productSchema);
export default Product;
