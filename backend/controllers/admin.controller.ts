import { Request, Response, NextFunction } from 'express';
import { ILoginRequestUser, IRegisterRequestUser } from '../types/user.types';

const register = async (req: Request, res: Response, next: NextFunction) => {
	const user: IRegisterRequestUser = req.body.user;
};
