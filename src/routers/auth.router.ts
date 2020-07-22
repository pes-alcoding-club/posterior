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
/** 
*@swagger
 * api/auth/login:
 *   post:
 *     tags:
 *       - Sign-in
 *     description: Login here
 *     produces:
 *       - text/html
 *     parameters:
 *       - name: username
 *         description: Add your username
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Type your password
 *         in: formData
 *         required: true
 *         type: string
 *         format: password
 * 
 *     responses:
 *       200:
 *         description: Login Successfull!!!
 *       401:
 *          description: Incorrect username or password
 * 

*/

router.route('/login').post(loginUser);

// @route /api/auth/register
// @desc Register a new user account
// access public
/**
 * @swagger
 * api/auth/register:
 *   post:
 *     tags:
 *       - Sign-Up
 *     description: Create new user
 *     produces:
 *       - text/html
 *     parameters:
 *       - name: username
 *         description: Type your name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: name
 *         description: Enter your name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         type: string
 *         format: password
 *         required: true
*       - name: email
 *         in: formData
 *         type: string
 *         format: email 
 *         required: true               
 *  
 * 
 *     responses:
 *       200:
 *         description: New user created!!
 *       500:
 *         description: Internal Server error :(
 */


router.route('/register').post(registerUser);

export default router;