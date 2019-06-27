import database from '../database/index';

/**
 *
 *
 * @export User
 * @class User
 */
export default class User {
  /**
   *
   * Create a new user in the user table
   * @static
   * @param {Object} userData
   * @returns {Object}
   * @memberof User
   */
  static async create(userData) {
    const { email, firstName, lastName, address, hashedPassword } = userData;
    const sqlQuery = `INSERT INTO users(email, first_name, last_name, address, password)                     VALUES($1, $2, $3, $4, $5) returning *`;
    const values = [email, firstName, lastName, address, hashedPassword];

    const { rows } = await database.query(sqlQuery, values);

    return rows[0];
  }

  /**
   *
   * Fetch user details by email from the database
   * @static
   * @param {String} email
   * @returns {Object|Boolean} return object if email is found or boolean if email can't be found
   * @memberof User
   */
  static async findByEmail(email) {
    const sqlQuery = `SELECT * FROM users where email = $1`;
    const { rows, rowCount } = await database.query(sqlQuery, [email]);

    if (rowCount > 0) return rows[0];

    return false;
  }
}
