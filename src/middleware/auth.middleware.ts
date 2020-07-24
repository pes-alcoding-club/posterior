import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

import User from '../models/user.model';

import config from 'config';

import { NextFunction } from 'express';

export const local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const authConfig: any = config.get('app.auth');

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: authConfig.secretKey
};

export const jwtPasport = passport.use(
	new JwtStrategy(opts, (jwt_payload: any, done: any) => {
		User.findOne({ _id: jwt_payload.user }, (err, user) => {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		});
	})
);

export const verifyUser = passport.authenticate('jwt', { session: false });

export const verifyAdmin = function (
	params: any,
	err: any,
	next: NextFunction
) {
	if (params.user.isAdmin) {
		return next();
	}
	err.message =
		'Only administrators are authorized to perform this operation.';
	err.status = 403;
	return next(err);
};
