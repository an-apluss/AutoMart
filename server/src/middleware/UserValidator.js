import Helper from '../helpers/helpers';
import storage from '../models/dummydata';

const { validateSignup, validateSignin, notAlpha } = Helper;
const { users } = storage;

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
  static signupCheck(req, res, next) {
    const { error } = validateSignup(req.body);

    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
        success: false
      });
    }

    const { firstName, lastName } = req.body;

    const firstNameNotAlpha = notAlpha(firstName);
    const lastNameNotAlpha = notAlpha(lastName);

    if (firstNameNotAlpha)
      return res
        .status(422)
        .json({ status: 422, error: 'firstName can only be alphabelt', success: false });

    if (lastNameNotAlpha)
      return res
        .status(422)
        .json({ status: 422, error: 'lastName can only be alphabelt', success: false });

    const userExist = users.find(user => user.email === req.body.email);

    if (userExist) {
      return res.status(409).json({
        status: 409,
        error: 'Email Has Been Taken',
        success: false
      });
    }

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
