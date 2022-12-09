import { IUserModel } from './../types/user.types';
import { Request, Response } from 'express';
import { User } from '../models';

const register = async (req: Request, res: Response) => {
	try {
		const { email, username, role, password, confirmPassword } = req.body;

		const existingUser = await User.aggregate([
			{
				$match: { $or: [{ email: email }, { username: username }] },
			},
		]);

		if (existingUser.length > 0) {
			return res.json({
				success: false,
				data: null,
				error: 'User already exists',
			});
		}

		const user = new User({
			email,
			username,
			role,
			password,
			confirmPassword,
		});

		await user.save();

		return res.json({
			success: true,
			data: {
				user,
			},
			error: null,
		});
	} catch (err) {
		return res.json({
			success: false,
			data: null,
			error: err,
		});
	}
};

const login = async (req: Request, res: Response) => {
	const { username, password }: IUserModel = req.body;

	try {
		const user: IUserModel = await User.findOne({
			$or: [{ email: username }, { username: username }],
		});

		if (!user) {
			return res.json({
				success: false,
				data: null,
				error: 'User does not exist',
			});
		}

		const isMatch: boolean = user.comparePassword(password);

		console.log(isMatch);

		if (!isMatch) {
			return res.json({
				success: false,
				data: null,
				error: 'Invalid password',
			});
		}

		const token: string = user.generateJWT();

		console.log(token);
		return res.json({
			success: true,
			data: {
				user,
				token,
			},
			error: null,
		});
	} catch (error) {
		console.log(error);
		return res.json({
			success: false,
			data: null,
			error: error,
		});
	}
};

export default { register, login };
