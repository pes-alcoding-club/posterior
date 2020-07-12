import User, { IUser } from '../models/user.model';

export const getUserService = async (userId: string) => {
  const user: IUser | null = await User.findById(userId);
  return user;
};

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

export const findUserService = async (username: string, email: string) => {
  const user: IUser | null = await User.findOne({
    $or: [{ username: username }, { email: email }]
  });
  return user;
};
