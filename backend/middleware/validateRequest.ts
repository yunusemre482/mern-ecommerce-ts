import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validateRequest = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			data: null,
			error: errors.array(),
		});
	}

	return next();
};

export default validateRequest;
