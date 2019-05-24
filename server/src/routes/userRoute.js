import express from 'express';

import UserValidator from '../middleware/UserValidator';
import UserController from '../controllers/userController';

const userRoute = express.Router();

const { signupCheck } = UserValidator;
const { postSignUp } = UserController;

userRoute.post('/signup', signupCheck, postSignUp);

export default userRoute;
