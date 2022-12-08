import passport from 'passport';
import { Request, Response, NextFunction } from 'express';


const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('jwt', { session: false }, function (err, user, info) {
		if (err) return next(err);

		if (!user)
			return res.status(401).json({ message: 'Unauthorized Access - No Token Provided!' });

		req.user = user;

		next();
	})(req, res, next);
};

export default authorizationMiddleware;
