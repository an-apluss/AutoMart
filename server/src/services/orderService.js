import Order from '../models/orderModel';
import storage from '../models/dummydata';
import helper from '../helpers/helpers';
import CarService from './carService';
import UserService from './userService';

const { orders } = storage;
const { generateId } = helper;

/**
 *
 *
 * @export OrderService
 * @class OrderService
 */
export default class OrderService {
  /**
   *
   * Handles the logic to purchase an order
   * @static
   * @param {Object} orderData order data is user input to purchase an order
   * @returns JSON API Response
   * @memberof OrderService
   */
  static createOrder(orderData) {
    const { email, carId, amount } = orderData;
    const id = generateId(orders);
    const convertAmount = parseFloat(amount).toFixed(2);

    const userExist = UserService.findUserByEmail(email);
    if (userExist === false) return { status: 422, error: 'Email does not exist', success: false };

    const carExist = CarService.fetchCarById(carId);
    if (carExist === false) return { status: 422, error: 'CarId does not exist', success: false };

    const buyer = userExist.id;
    const { price } = carExist;

    const newOrder = new Order(id, buyer, parseInt(carId, 10), convertAmount);
    orders.push(newOrder);

    const { car_id, created_on, status } = newOrder;
    return {
      status: 201,
      data: {
        id,
        car_id,
        created_on,
        status,
        price,
        price_offered: convertAmount
      },
      success: true
    };
  }

  /**
   *
   * Handles the logic to update the price of purchase order which status reads pending
   * @static
   * @param {Integer} orderId
   * @param {Number} newPriceOffer new price to be offered for the purchase order
   * @returns JSON API Response
   * @memberof OrderService
   */
  static updatePrice(orderId, newPriceOffer) {
    const orderExist = orders.find(order => order.id === parseInt(orderId, 10));

    if (!orderExist) return { status: 403, error: 'Order id does not exist', success: false };

    if (orderExist.status.toLowerCase() !== 'pending')
      return {
        status: 403,
        error: 'Order cannot be updated. Order status is not pending',
        success: false
      };

    const old_price_offered = orderExist.amount;

    orderExist.amount = parseFloat(newPriceOffer).toFixed(2);
    const { id, car_id, status, amount } = orderExist;

    return {
      status: 202,
      data: {
        id,
        car_id,
        status,
        old_price_offered,
        new_price_offered: amount
      },
      success: true
    };
  }
}
