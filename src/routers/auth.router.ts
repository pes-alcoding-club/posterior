import { Router } from 'express';

const router: Router = Router();

import { verifyUser } from '../middleware/auth.middleware';
import {
  getUser,
  loginUser,
  registerUser
} from '../controllers/auth.controller';

// @route /api/auth
// @desc Authenticate and get User Information
// access private
router.route('/').get(verifyUser, getUser);

// @route /api/auth/login
// @desc Verify user credentials and generate a token
// access public
router.route('/login').post(loginUser);

// @route /api/auth/register
// @desc Register a new user account
// access public
router.route('/register').post(registerUser);

export default router;
