import { object, string, ref } from 'yup';

export const SignupSchema = object({
	username: string()
		.required('Username is required')
		.min(5, 'Username must be at least 5 characters')
		.max(30, 'Username must be less than 30 characters'),
	email: string().email('Email must be valid !').max(255).required('Email cannot be empty'),
	password: string()
		.min(8, 'Password must be at least 8 characters')
		.matches(/(?=.*[0-9])/, 'Password must contain a number.')
		.required('Password cannot be empty'),
	confirmPassword: string()
		.min(8, 'password must be at least 8 characters')
		.matches(/(?=.*[0-9])/, 'Password must contain a number.')
		.required('Confirmation password cannot be empty')
		.oneOf([ref('password'), null], 'Passwords must match'),
});

export const LoginSchema = object({
	username: string()
		.min(5, 'Must be at least 5 characters')
		.max(30, 'Must be less  than 30 characters')
		.required('Email cannot be empty'),
	password: string()
		.min(8, 'Password must be at least 8 characters')
		.matches(/(?=.*[0-9])/, 'Password must contain a number.')
		.required('Password cannot be empty'),
});

export function isEmail(emailAddress: string): boolean {
	return /.+@.+\..{2,}/i.test(emailAddress);
}
