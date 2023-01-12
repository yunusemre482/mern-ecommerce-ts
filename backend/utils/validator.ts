import { check } from 'express-validator';

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
	check('role', 'role is required').not().isEmpty().optional(),
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

export const productValidation = [
	check('name', 'name is required')
		.not()
		.isEmpty()
		.isLength({ min: 3 })
		.withMessage('name must be at least 3 characters long'),
	check('price', 'price is required')
		.not()
		.isEmpty()
		.isNumeric()
		.withMessage('price must be a number'),
	check('brand', 'brand is required').not().isEmpty(),
	check('category', 'category is required').not().isEmpty(),
	check('description', 'description is required').not().isEmpty(),
	check('countInStock', 'countInStock is required')
		.not()
		.isEmpty()
		.isNumeric()
		.withMessage('countInStock must be a number'),
];

export const updateProductValidation = [
	check('name', 'name is required')
		.not()
		.isEmpty()
		.isLength({ min: 3 })
		.withMessage('name must be at least 3 characters long')
		.optional(),
	check('price', 'price is required')
		.not()
		.isEmpty()

		.isNumeric()
		.withMessage('price must be a number')
		.optional(),

	check('brand', 'brand is required').not().isEmpty().optional(),
	check('category', 'category is required').not().isEmpty().optional(),
	check('description', 'description is required').not().isEmpty().optional(),
	check('countInStock', 'countInStock is required')
		.not()
		.isEmpty()
		.isNumeric()
		.withMessage('countInStock must be a number')
		.optional(),
];

export const productReviewValidation = [
	check('rating', 'rating is required')
		.not()
		.isEmpty()
		.isNumeric()
		.withMessage('rating must be a number'),
	check('comment', 'comment is required').not().isEmpty(),
	check('name', 'name is required').not().isEmpty(),
];
