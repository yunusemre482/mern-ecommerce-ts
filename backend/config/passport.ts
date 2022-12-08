import passport from 'passport';
import passportJwt from 'passport-jwt';
import User from '../models/User.model';
import { ILoginRequestUser } from '../types/user.types';

const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

export default function initPassport() {
	const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || '';
	console.log('ACCESS_TOKEN_SECRET', ACCESS_TOKEN_SECRET);
	const options = {
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: ACCESS_TOKEN_SECRET,
	};

	passport.serializeUser(
		(user: ILoginRequestUser, done: (arg0: null, arg1: ILoginRequestUser) => void) => {
			done(null, user);
		}
	);
	passport.deserializeUser(
		(user: ILoginRequestUser, done: (arg0: null, arg1: ILoginRequestUser) => void) => {
			done(null, user);
		}
	);

	passport.use(
		new JWTStrategy(
			options,
			(payload: { id: string; username: string; email: string }, done: Function) => {
				User.findById(payload.id)
					.then((user) => {
						if (user) {
							return done(null, user);
						}
						return done(null, false);
					})
					.catch((err) => console.log(err));
			}
		)
	);
}
