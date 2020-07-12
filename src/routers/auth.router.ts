import { Router } from 'express';
import bodyParser from 'body-parser';

const router: Router = Router();
router.use(bodyParser.json());

import { verifyUser } from '../middleware/auth.middleware';
import {
  getUser,
  loginUser,
  registerUser
} from '../controllers/auth.controller';

router.route('/').get(verifyUser, getUser);

router.route('/login').post(loginUser);

router.route('/register').post(registerUser);

export default router;
