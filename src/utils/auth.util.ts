import jwt from 'jsonwebtoken';
import config from 'config';

const authConfig : any = config.get('app.auth');

export const getToken = function (user: any) {
	return jwt.sign(user, authConfig.secretKey, { expiresIn: authConfig.tokenExpiry * 24 * 3600 });
};
