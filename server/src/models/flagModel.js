import database from '../database/index';

/**
 *
 *
 * @export Flag
 * @class Flag
 */
export default class Flag {
  /**
   *
   * Create flag/report in the database
   * @static
   * @param {Object} flagData
   * @returns {Object}
   * @memberof Flag
   */
  static async create(flagData) {
    const { carId, reason, description } = flagData;
    const sqlQuery = `INSERT INTO flags (car_id, reason, description) VALUES ($1, $2, $3) returning *`;
    const values = [carId, reason, description];

    const { rows } = await database.query(sqlQuery, values);

    return rows[0];
  }
}
