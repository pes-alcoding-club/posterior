import { Response, NextFunction } from 'express';
import passport from 'passport';

import {
  getUserService,
  findUserService,
  createUserService
} from '../services/auth.service';
import { getToken } from '../utils/auth.util';

import { IUser } from '../models/user.model';

export const getUser = async (req: any, res: Response) => {
  try {
    const user: IUser | null = await getUserService(req.user._id);
    return res.status(200).json({ status: 200, data: user });
  } catch (e) {
    return res
      .status(e.status || 500)
      .json({ status: e.status || 500, message: e.message });
  }
};

export const loginUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate(
      'local',
      { session: false },
      (err: any, user: IUser, info: any) => {
        if (err) return next(err);
        if (!user)
          return res
            .status(401)
            .json({ success: false, status: 'Login Unsuccessful!', err: info });

        req.logIn(user, (err: any) => {
          if (err)
            return res.status(401).json({
              success: false,
              status: 'Login Unsuccessful!',
              err: err.message
            });

          const token = getToken({ user: req.user._id });
          res
            .status(200)
            .json({ success: true, status: 'Login Successful!', token: token });
        });
      }
    )(req, res, next);
  } catch (e) {
    return res
      .status(e.status || 500)
      .json({ status: e.status || 500, message: e.message });
  }
};

export const registerUser = async (req: any, res: Response) => {
  let user: IUser | null;

  try {
    user = await findUserService(req.body.username, req.body.email);
    if (user !== null)
      return res.status(406).json({ status: 406, message: 'User exists!' });
    user = await createUserService(
      req.body.username,
      req.body.password,
      req.body.email,
      req.body.name
    );
    user = await getUserService(user._id);
    passport.authenticate('local')(req, res, () =>
      res.status(200).json({ status: 200, message: 'Registration Successful' })
    );
  } catch (e) {
    return res
      .status(e.status || 500)
      .json({ status: e.status || 500, message: e.message });
  }
};
