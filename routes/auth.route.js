var express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.json());

const AuthMiddleware = require('../middlewares/auth.middleware');

const AuthController = require('../controllers/auth.controller');

router.route('/')
.get(AuthMiddleware.verifyUser, AuthController.getUser)

router.route('/register')
.post(AuthController.registerUser)

router.route('/login')
.post(AuthController.loginUser)

module.exports = router;