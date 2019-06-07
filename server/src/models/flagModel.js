/**
 *
 *
 * @export Flag
 * @class Flag
 */
export default class Flag {
  /**
   *Creates an instance of Flag.
   * @param {Integer} id
   * @param {Integer} car_id
   * @param {Date} [created_on = new Date()]
   * @param {String} reason
   * @param {String} description
   * @memberof Flag
   */
  constructor(id, car_id, reason, description) {
    this.id = id;
    this.car_id = car_id;
    this.created_on = new Date();
    this.reason = reason;
    this.description = description;
  }
}
