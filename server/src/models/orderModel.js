/**
 *
 *
 * @export Order
 * @class Order
 */
export default class Order {
  /**
   *Creates an instance of Order.
   * @param {Integer} id
   * @param {Integer} buyer
   * @param {Integer} car_id
   * @param {Float} amount
   * @param {string} [status='pending']
   * @memberof Order
   */
  constructor(id, buyer, car_id, amount, status = 'pending') {
    this.id = id;
    this.buyer = buyer;
    this.car_id = car_id;
    this.amount = amount;
    this.status = status;
    this.created_on = new Date();
  }
}
