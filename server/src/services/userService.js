import Helper from '../helpers/helpers';
import storage from '../models/dummydata';
import User from '../models/userModel';

const { generateId, hashPassword, generateToken } = Helper;
const { users } = storage;

export default class UserService {
  static async createUser(userData) {
    const { firstName, lastName, email, password, address, isAdmin } = userData;

    const id = generateId(users);
    const hashedPassword = await hashPassword(password, 10);

    const newUser = new User(id, email, firstName, lastName, hashedPassword, address, isAdmin);
    users.push(newUser);

    return {
      status: 201,
      data: {
        token: generateToken(newUser),
        id,
        first_name: firstName,
        last_name: lastName,
        email,
        isAdmin
      },
      success: true
    };
  }
}
