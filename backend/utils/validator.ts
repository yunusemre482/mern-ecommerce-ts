import { check } from 'express-validator/check';
import bcrypt from 'bcrypt';
export const registrationValidation = [
	check('username', 'username is required')
		.not()
		.isEmpty()
		.isLength({ min: 3 })
		.withMessage('username must be at least 3 characters long'),
	check('email', 'email is required').not().isEmpty().isEmail().withMessage('email is invalid'),
	check('password', 'password is required')
		.not()
		.isEmpty()
		.isLength({ min: 6 })
		.withMessage('password must be at least 6 characters long'),
	check('confirmPassword', 'password confirmation is required')
		.not()
		.isEmpty()
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords do not match');
			}
			return true;
		}),
];

export const loginValidation = [
	check('username').not().isEmpty().optional(),
	check('email').not().isEmpty().isEmail().withMessage('email is invalid').optional(),
	check('password', 'password is required').not().isEmpty(),
];

export const SUDOOptionalUserAccessLevel = [
	check(
		'accessLevels',
		'accessLevels must be an array containing either admin, user, moderator, or banned'
	)
		.optional()
		.isArray()
		.custom((value, { req }) => {
			if (value.length > 0) {
				for (let i = 0; i < value.length; i++) {
					if (
						value[i] !== 'admin' &&
						value[i] !== 'user' &&
						value[i] !== 'moderator' &&
						value[i] !== 'banned'
					) {
						throw new Error(
							'accessLevels must be an array containing either admin, user, moderator, or banned'
						);
					}
				}
			}
			return true;
		}),
];

export const validateIsPasswordMatch = ({
	password,
	modelPassword,
}: {
	password: string;
	modelPassword: string;
}): boolean => {
	console.log(password, modelPassword);
	
	return bcrypt.compareSync(password, modelPassword);
};
