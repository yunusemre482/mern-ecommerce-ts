import { upload } from './../utils/uploader';
import express from 'express';
const productRouter = express.Router();
import productController from '../controllers/product.controller';

productRouter.get('/all', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/create', upload.single('file'), productController.createProduct);
productRouter.put('/update/:id', productController.updateProduct);
productRouter.delete('/delete/:id', productController.deleteProduct);

export default productRouter;
