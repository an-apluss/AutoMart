import Helper from '../helpers/helpers';
import storage from '../models/dummydata';
import User from '../models/userModel';

const { generateId, hashPassword, generateToken, compareHashedPassword } = Helper;
const { users } = storage;

export default class UserService {
  static async createUser(userData) {
    const { firstName, lastName, email, password, address, isAdmin } = userData;

    const id = generateId(users);
    const hashedPassword = await hashPassword(password, 10);

    const newUser = new User(id, email, firstName, lastName, hashedPassword, address, isAdmin);
    users.push(newUser);

    const { first_name, last_name } = newUser;

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

  static async loginUser(userData) {
    const userExist = users.find(user => user.email === userData.email);

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

  static findUserByEmail(userEmail) {
    const userExist = users.find(user => user.email === userEmail);

    if (!userExist) return false;

    const { id, email, first_name, last_name, password, address, isAdmin } = userExist;

    return { id, email, first_name, last_name, password, address, isAdmin };
  }

  static findUserById(userId) {
    const userExist = users.find(user => user.id === parseInt(userId, 10));

    if (!userExist) return false;

    const { id, email, first_name, last_name, password, address, isAdmin } = userExist;

    return { id, email, first_name, last_name, password, address, isAdmin };
  }
}
