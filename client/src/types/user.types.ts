import { IProduct } from './product.types';

export type ILoginUser = {
	username: string;
	password: string;
};

export type IRegisterUser = ILoginUser & {
	role?: string;
	email: string;
	confirmPassword: string;
};

export type IUser = {
	_id: string;
	name: string;
	email: string;
	role: string;
	cart: IProduct[];
};
