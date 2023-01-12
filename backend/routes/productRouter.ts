import express from 'express';
import productController from '../controllers/product.controller';
import validateRequest from '../middleware/validateRequest';

import { upload } from './../utils/uploader';
import {
	productReviewValidation,
	productValidation,
	updateProductValidation,
} from '../utils/validator';

const productRouter = express.Router();

productRouter.get('/all', productController.getAllProducts);

productRouter.post(
	'/create',
	upload.single('file'),
	productValidation,
	validateRequest,
	productController.createProduct
);
productRouter.put(
	'/update/:id',
	updateProductValidation,
	validateRequest,
	productController.updateProduct
);
productRouter.delete('/delete/:id', productController.deleteProduct);
productRouter.post(
	'/review/:id',
	productReviewValidation,
	validateRequest,
	productController.createProductReview
);

productRouter.post('/like', productController.toggleLikeProduct);
productRouter.get('/dislike', productController.toggleLikeProduct);

productRouter.get('/categories', productController.getCategories);

// put this at the end of the file to avoid conflicts with other routes
productRouter.get('/:id', productController.getProductById);
export default productRouter;
