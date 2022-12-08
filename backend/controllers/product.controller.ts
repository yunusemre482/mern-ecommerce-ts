import { imageUploader } from './../utils/uploader';
import { NextFunction, Request, Response } from 'express';
import { Product } from '../models';
import { CustomResponse } from '../types/response.types';
import slugify from 'slugify';

const getAllProducts = async (req: Request, res: CustomResponse, next: NextFunction) => {
	const products = await Product.find({});
	if (!products) {
		return res.json({
			success: false,
			data: null,
			error: 'No products found',
		});
	}

	return res.json({ success: true, data: { products }, error: null });
};

const getProductById = async (req: Request, res: CustomResponse, next: NextFunction) => {
	const { id } = req.params;
	const product = await Product.findById(id).populate('reviews', 'name comment rating');

	if (!product) {
		return res.json({
			success: false,
			data: null,
			error: 'No product found',
		});
	}

	return res.json({ success: true, data: { product }, error: null });
};

const createProduct = async (req: Request, res: CustomResponse, next: NextFunction) => {
	const file = req.file;
	const { name, category, price, brand, description, countInStock } = req.body;
	const slug = slugify(name);

	if (!file) {
		return res.json({
			success: false,
			data: null,
			error: 'No file uploaded',
		});
	}
	const existingProduct = await Product.findOne({
		slug,
	});
	if (existingProduct) {
		return res.json({
			success: false,
			data: null,
			error: 'Product already exists',
		});
	}
	// upload image to cloudinary
	const uploadedImage: any = await imageUploader(file);
	const newProduct = {
		name,
		slug,
		price,
		category,
		countInStock,
		brand,
		description,
		image: uploadedImage.secure_url,
	};
	const product = new Product(newProduct);

	await product.save();
	return res.json({ success: true, data: { product: newProduct }, error: null });
};

const updateProduct = async (req: Request, res: CustomResponse, next: NextFunction) => {
	const { id } = req.params;
	const file = req.file;
	const { name } = req.body;

	const existingProduct = await Product.findById(id);

	if (!existingProduct) {
		return res.json({
			success: false,
			data: null,
			error: 'No product found',
		});
	}

	if (name) {
		const slug = slugify(name);
		existingProduct.slug = slug;
	}

	if (file) {
		// upload image to cloudinary
		const uploadedImage: any = await imageUploader(file);
		existingProduct.image = uploadedImage.secure_url;
	}

	for (const key in req.body) {
		if (existingProduct[key]) {
			existingProduct[key] = req.body[key];
		}
	}

	await existingProduct.save();

	return res.json({
		success: true,
		data: { product: existingProduct, message: 'Product updated successfully' },
		error: null,
	});
};

const deleteProduct = async (req: Request, res: CustomResponse, next: NextFunction) => {
	const { id } = req.params;
	const product = await Product.findByIdAndDelete(id);

	if (!product) {
		return res.json({
			success: false,
			data: null,
			error: 'No product found',
		});
	}

	return res.json({
		success: true,
		data: { product, message: 'User deleted successfully' },
		error: null,
	});
};

const createProductReview = async (req: Request, res: CustomResponse, next: NextFunction) => {
	const { id } = req.params;
	const username = req.user.username;
	const { comment, rating } = req.body;
	const product = await Product.findById(id);

	if (!product) {
		return res.json({
			success: false,
			data: null,
			error: 'No product found',
		});
	}

	const review = {
		name: username,
		comment,
		rating: Number(rating),
		product: id,
	};

	const alreadyReviewed = product.reviews.find((r: any) => r.name === name);

	if (alreadyReviewed) {
		return res.json({
			success: false,
			data: null,
			error: 'Product already reviewed',
		});
	}

	product.reviews.push(review);

	product.numReviews = product.reviews.length;
	product.rating =
		product.reviews.reduce((acc: any, item: any) => item.rating + acc, 0) /
		product.reviews.length;

	await product.save();

	return res.json({
		success: true,
		data: { product, message: 'Product reviewed successfully' },
		error: null,
	});
};

const getCategories = async (req: Request, res: CustomResponse, next: NextFunction) => {
	const categories = await Product.find().distinct('category');

	if (!categories) {
		return res.json({
			success: false,
			data: null,
			error: 'No categories found',
		});
	}

	return res.json({ success: true, data: { categories }, error: null });
};

export default {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getCategories,
};
