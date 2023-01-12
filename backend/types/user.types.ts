import mongoose, { Document } from 'mongoose';

export type IUserMethods = {
	comparePassword: (password: string) => boolean;
	generateJWT: () => string;
};

export type IUserModel = Document &
	IUserMethods & {
		_doc: any;
		firstName: string;
		secondName: string;
		username: string;
		email: string;
		password: string;
		createdAt: Date;
		updatedAt: Date;
		role: string;
		likedProducts: string[];
		cart: {
			product: {
				type: mongoose.Schema.Types.ObjectId;
				quantity: number;
			};
		}[];
	};

export type ILoginRequestUser =
	| {
			email: string;
			password: string;
	  }
	| undefined;

export type IRegisterRequestUser = ILoginRequestUser & {
	username: string;
	role?: string | undefined;
};
