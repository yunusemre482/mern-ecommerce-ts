import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserModel } from '../types/user.types';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || '';

export const userSchema = new Schema<IUserModel>(
	{
		firstName: { type: String },
		secondName: { type: String },
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, required: false, default: 'user' },
		cart: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
				},

				quantity: { type: Number, default: 1 },
			},
		],
	},
	{ timestamps: true, collection: 'users' }
);

const SALT_ROUND = 8;

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, SALT_ROUND);
	}
	next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
	console.log('inside compare password');
	console.log(password, this.password);
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);

	let payload = {
		id: this._id,
		email: this.email,
		username: this.username,
	};

	return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
		expiresIn: '48h',
	});
};

export default model<IUserModel>('User', userSchema);
