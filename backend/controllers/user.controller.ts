import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { CustomResponse } from '../types/response.types';

export const getAllUsers = async (req: Request, res: CustomResponse, next: NextFunction) => {
	const users = await User.find({}, { password: 0, __v: 0 });
	if (!users) {
		return res.json({
			success: false,
			data: null,
			error: 'No users found',
		});
	}
	return res.json({ success: true, data: { users }, error: null });
};

export default { getAllUsers };
