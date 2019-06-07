/**
 *
 *
 * @export Car
 * @class Car
 */
export default class Car {
  /**
   *Creates an instance of Car.
   * @param {Integer} id
   * @param {Integer} owner
   * @param {String} state
   * @param {Date} [created_on = new Date()]
   * @param {String} [status = 'available']
   * @param {Float} price
   * @param {String} manufacturer
   * @param {String} model
   * @param {String} bodyType
   * @param {String} imageId
   * @param {String} imageUrl
   * @memberof Car
   */
  constructor(id, owner, state, price, manufacturer, model, bodyType, imageId, imageUrl) {
    this.id = id;
    this.owner = owner;
    this.created_on = new Date();
    this.state = state;
    this.status = 'available';
    this.price = price;
    this.manufacturer = manufacturer;
    this.model = model;
    this.body_type = bodyType;
    this.imageId = imageId;
    this.imageUrl = imageUrl;
  }
}
