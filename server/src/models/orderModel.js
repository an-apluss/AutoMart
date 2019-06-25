import database from '../database/index';

/**
 *
 *
 * @export Order
 * @class Order
 */
export default class Order {
  /**
   *
   * Create a purchase order in the database
   * @static
   * @param {Oject} orderData details of the purchase order
   * @returns {Object}
   * @memberof Order
   */
  static async create(buyer, carId, price) {
    const sqlQuery = `INSERT INTO orders (buyer, car_id, amount) VALUES ($1, $2, $3) returning *`;
    const values = [buyer, carId, price];

    const { rows } = await database.query(sqlQuery, values);

    return rows[0];
  }

  /**
   *
   * Fetch purchase order by ID from the database
   * @static
   * @param {Integer} orderId
   * @returns {Object|Boolean} return object if ID is found or false if ID can't be found
   * @memberof Order
   */
  static async findById(orderId) {
    const sqlQuery = `SELECT * FROM orders where id = $1`;
    const { rows, rowCount } = await database.query(sqlQuery, [orderId]);

    if (rowCount > 0) return rows[0];

    return false;
  }

  /**
   *
   * Update the amount of purchase order if pending in the database
   * @static
   * @param {Integer} orderId
   * @param {String} field
   * @param {float} value
   * @returns float
   * @memberof Order
   */
  static async upateAmount(orderId, field, value) {
    const sqlQuery = `update orders set ${field} = $1 where id = $2 returning ${field}`;
    const { rows } = await database.query(sqlQuery, [value, orderId]);
    return rows[0];
  }
}
