import express from 'express';

import UserValidator from '../middleware/UserValidator';
import UserController from '../controllers/userController';

const userRoute = express.Router();

const { signupCheck, signinCheck } = UserValidator;
const { postSignUp, postSignIn } = UserController;

userRoute.post('/signup', signupCheck, postSignUp);
userRoute.post('/signin', signinCheck, postSignIn);

export default userRoute;
