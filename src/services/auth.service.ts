import User, { IUser } from '../models/user.model';

/**
 * Return User info
 * @param {string} userId - _id of the user
 */

export const getUserService = async (userId: string) => {
	const user: IUser | null = await User.findById(userId);
	return user;
};

/**
 * Register a new user in the DB
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @param {string} name
 */

export const createUserService = async (
	username: string,
	password: string,
	email: string,
	name: string
) => {
	const user: IUser | null = await User.register(
		new User({ username: username, email: email }),
		password
	);
	user.name = name;
	return await user.save();
};
