import UserService from '../services/userService';

/**
 *
 *
 * @export UserController
 * @class UserController
 */
export default class UserController {
  /**
   *
   * Handles the logic to register/sign up user on the platform
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns JSON API Response
   * @memberof UserController
   */
  static async postSignUp(req, res, next) {
    try {
      const response = await UserService.createUser(req.body);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }

  /**
   *
   * Handles the logic to login/sign in user on the platform
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns JSON API Response
   * @memberof UserController
   */
  static async postSignIn(req, res, next) {
    try {
      const response = await UserService.loginUser(req.body);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }
}
