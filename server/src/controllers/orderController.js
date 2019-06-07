import OrderService from '../services/orderService';

/**
 *
 *
 * @export orderController
 * @class orderController
 */
export default class orderController {
  /**
   *
   * Handles the logic to purchase an order
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns JSON API Response
   * @memberof orderController
   */
  static async postOrder(req, res, next) {
    try {
      const response = await OrderService.createOrder(req.body);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }

  /**
   *
   * Handles the logic to update the price of purchase order which status reads pending
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns JSON API Response
   * @memberof orderController
   */
  static async updateOrderPrice(req, res, next) {
    try {
      const response = await OrderService.updatePrice(req.params.orderId, req.body.price);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }
}
