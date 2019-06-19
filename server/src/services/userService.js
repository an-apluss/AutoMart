import Helper from '../helpers/helpers';
import User from '../models/userModel';

const { hashPassword, generateToken, compareHashedPassword } = Helper;

/**
 *
 *
 * @export UserService
 * @class UserService
 */
export default class UserService {
  /**
   *
   * Handles the logic to register/sign up user on the platform
   * @static
   * @param {Object} userData holds the details about the user
   * @returns JSON API Response
   * @memberof UserService
   */
  static async createUser(userData) {
    const hashedPassword = await hashPassword(userData.password, 10);
    const newUserData = { ...userData, hashedPassword };
    const newUser = await User.create(newUserData);

    const { id, email, first_name, last_name } = newUser;

    return {
      status: 201,
      data: {
        token: generateToken(newUser),
        id,
        first_name,
        last_name,
        email
      },
      success: true
    };
  }

  /**
   *
   * Handles the logic to sign in/login user on the platform
   * @static
   * @param {Object} userData holds data to login user
   * @returns JSON API Response
   * @memberof UserService
   */
  static async loginUser(userData) {
    const userExist = await User.findByEmail(userData.email);

    if (!userExist)
      return {
        status: 401,
        error: 'Authentication Failed. Incorrect Login Credentials',
        success: false
      };

    const { id, first_name, last_name, email, password } = userExist;
    const existPassword = await compareHashedPassword(userData.password, password);

    if (existPassword)
      return {
        status: 200,
        data: {
          token: generateToken(userExist),
          id,
          first_name,
          last_name,
          email
        },
        success: true
      };

    return {
      status: 401,
      error: 'Authentication Failed. Incorrect Login Credentials',
      success: false
    };
  }

  /**
   *
   * Handles the logic to find a specific user by email
   * @static
   * @param {String} userEmail user email address
   * @returns {(Boolean|Object)} false or user data
   * @memberof UserService
   */
  static async findUserByEmail(userEmail) {
    const userExist = await User.findByEmail(userEmail);

    if (!userExist) return false;

    const { id, email, first_name, last_name, password, address, isAdmin } = userExist;

    return { id, email, first_name, last_name, password, address, isAdmin };
  }

  /**
   *
   * Handles the logic to find a specific user by id
   * @static
   * @param {Integer} userId
   * @returns {(Boolean|Object)} false or user data
   * @memberof UserService
   */
  static async findUserById(userId) {
    const userExist = await User.findById(parseInt(userId, 10));

    if (!userExist) return false;

    const { id, email, first_name, last_name, password, address, isAdmin } = userExist;

    return { id, email, first_name, last_name, password, address, isAdmin };
  }
}
