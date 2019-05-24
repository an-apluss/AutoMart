import UserService from '../services/userService';

export default class UserController {
  static async postSignUp(req, res, next) {
    try {
      const response = await UserService.createUser(req.body);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }

  static async postSignIn(req, res, next) {
    try {
      const response = await UserService.loginUser(req.body);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }
}
