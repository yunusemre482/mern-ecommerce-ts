import { IMulterFile } from './../types/products.types';
import express, { Express, Router } from 'express';
import adminRouter from './adminRouter';
import AuthRouter from './authRouter';
import userRouter from './userRouter';
import orderRouter from './orderRouter';
import productRouter from './productRouter';
import authorizationMiddleware from '../middleware/auth';
import { File } from 'multer';

// extend express request interface to include user and file
declare module 'express' {
	export interface Request {
		file: File;
		user: {
			id: string;
			username: string;
			email: string;
		};
	}
}

const configureRoutes = (app: Express): Router => {
	const router = express.Router();
	// authentication routes not protected by authorization middleware
	router.use('/auth', AuthRouter);

	// all other routes are protected by authorization middleware
	router.use(authorizationMiddleware);
	router.use('/users', userRouter);
	router.use('/orders', orderRouter);
	router.use('/admin', adminRouter);
	router.use('/products', productRouter);
	return router;
};

export default configureRoutes;
