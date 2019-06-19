import Helper from '../helpers/helpers';
import User from '../models/userModel';

const { validateSignup, validateSignin, notAlpha } = Helper;

/**
 *
 *
 * @export UserValidator
 * @class UserValidator
 */
export default class UserValidator {
  /**
   *
   * Handle validation of user input to register/sign up on the platform
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof UserValidator
   */
  static async signupCheck(req, res, next) {
    const { firstName, lastName, email } = req.body;

    const { error } = validateSignup(req.body);

    if (error)
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
        success: false
      });

    if (notAlpha(firstName))
      return res
        .status(422)
        .json({ status: 422, error: 'firstName can only be alphabelt', success: false });

    if (notAlpha(lastName))
      return res
        .status(422)
        .json({ status: 422, error: 'lastName can only be alphabelt', success: false });

    const userExist = await User.findByEmail(email);

    if (userExist)
      return res.status(409).json({
        status: 409,
        error: 'Email Has Been Taken',
        success: false
      });

    return next();
  }

  /**
   *
   * Handles validation of user input to login/sign in on the platform
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof UserValidator
   */
  static signinCheck(req, res, next) {
    const { error } = validateSignin(req.body);

    if (error)
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
        success: false
      });

    return next();
  }
}
