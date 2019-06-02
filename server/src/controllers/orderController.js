import OrderService from '../services/orderService';

export default class orderController {
  static async postOrder(req, res, next) {
    try {
      const response = await OrderService.createOrder(req.body);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }
}
