import database from '../database/index';

/**
 *
 *
 * @export Car
 * @class Car
 */
export default class Car {
  /**
   *
   * Create car post advert in the database
   * @static
   * @param {Object} carInfo
   * @returns {Object}
   * @memberof Car
   */
  static async create(carInfo) {
    const { owner, state, price, manufacturer, model, bodyType, imageId, imageUrl } = carInfo;

    const sqlQuery = `INSERT INTO cars (owner, state, price, manufacturer, model, body_type, imageId, imageUrl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
    const values = [owner, state, price, manufacturer, model, bodyType, imageId, imageUrl];

    const { rows } = await database.query(sqlQuery, values);

    return rows[0];
  }

  /**
   *
   * Fetch posted car advert details by ID from the database
   * @static
   * @param {Integer} carId
   * @returns {Object|Boolean} return object if ID is found or boolean if ID can't be found
   * @memberof Car
   */
  static async findById(carId) {
    const sqlQuery = `SELECT * FROM cars where id = $1`;
    const { rows, rowCount } = await database.query(sqlQuery, [carId]);

    if (rowCount > 0) return rows[0];

    return false;
  }

  /**
   *
   * Update field with new value in the database table
   * @static
   * @param {Integer} carId car id of the posted advert to be updated
   * @param {String} field table field to be updated
   * @param {Integer|String} value new value
   * @returns {Object} updated field
   * @memberof Car
   */
  static async update(carId, field, value) {
    const sqlQuery = `update cars set ${field} = $1 where id = $2 returning ${field}`;
    const { rows } = await database.query(sqlQuery, [value, carId]);
    return rows[0];
  }

  /**
   *
   * Fetch car advert which status reads available in the database
   * @static
   * @param {string} status
   * @returns {Array} List of unsold cars in the database
   * @memberof Car
   */
  static async findByStatus(status) {
    const sqlQuery = `SELECT * FROM cars where status = $1`;
    const { rows } = await database.query(sqlQuery, [status]);
    return rows;
  }

  /**
   *
   * Fetch all unsold car advert within specific price range in the database
   * @static
   * @param {String} status status of the car advert
   * @param {Float} min_price minimum price of car advert to be fetch
   * @param {Float} max_price maximum price of car advert to be fetch
   * @returns {Array} list of unsold car advert within price range
   * @memberof Car
   */
  static async findByPriceRange(status, min_price, max_price) {
    const sqlQuery = `SELECT * FROM cars WHERE status = $1 AND price >= $2 AND price <= $3`;
    const values = [status, min_price, max_price];
    const { rows } = await database.query(sqlQuery, values);
    return rows;
  }

  /**
   *
   *
   * @static
   * @param {Integer} carId car id of the car advert to be removed from the database
   * @memberof Car
   */
  static async remove(carId) {
    const sqlQuery = `DELETE FROM cars WHERE id = $1`;
    await database.query(sqlQuery, [carId]);
  }

  /**
   *
   * Fetch all car advert whether sold or unsold in the database
   * @static
   * @returns {Object} List of all car whether unsold or sold
   * @memberof Car
   */
  static async findAll() {
    const sqlQuery = `SELECT * FROM cars`;
    const { rows } = await database.query(sqlQuery, []);
    return rows;
  }

  /**
   *
   * Fetch unsold car advert which status reads either new or used
   * @static
   * @param {String} status the status of the car advert i.e available
   * @param {String} state the state of the car advert i.e used or new
   * @returns {Array}
   * @memberof Car
   */
  static async findByStatusAndState(status, state) {
    const sqlQuery = `SELECT * FROM cars WHERE status = $1 AND state = $2`;
    const values = [status, state];
    const { rows } = await database.query(sqlQuery, values);
    return rows;
  }
}
