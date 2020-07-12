import jwt from 'jsonwebtoken';
import config from '../config';

export const getToken = function (user: any) {
  return jwt.sign(user, config.secretKey, { expiresIn: 30 * 24 * 3600 }); // Expires in 30 days
};
