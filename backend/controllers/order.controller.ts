import { Order } from '../models';
import { Request, Response, NextFunction } from 'express';

const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const orders = await Order.find({}).populate('user', 'name email');

		if (!orders) {
			return res.json({
				success: false,
				data: null,
				error: 'No orders found',
			});
		}

		return res.json({
			success: true,
			data: { orders },
			error: null,
		});
	} catch (error) {}
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {};
