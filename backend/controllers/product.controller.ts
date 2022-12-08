import { imageUploader } from './../utils/uploader';
import { NextFunction, Request, Response } from 'express';
import Product from '../models/Product.model';
import { CustomResponse } from '../types/response.types';

const getAllProducts = async (req: Request, res: CustomResponse, next: NextFunction) => {};
const getProductById = async (req: Request, res: CustomResponse, next: NextFunction) => {};

const createProduct = async (req: Request, res: CustomResponse, next: NextFunction) => {
	const file = req.file;

	if (!file) {
		return res.json({
			success: false,
			data: null,
			error: 'No file uploaded',
		});
	}
	const uploadedImage = await imageUploader(file);


	return res.json({ success: true, data: { uploadedImage }, error: null });
};

const updateProduct = async (req: Request, res: CustomResponse, next: NextFunction) => {};
const deleteProduct = async (req: Request, res: CustomResponse, next: NextFunction) => {};

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
