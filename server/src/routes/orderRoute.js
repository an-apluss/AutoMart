import express from 'express';

import OrderValidator from '../middleware/OrderValidator';
import OrderController from '../controllers/orderController';
import Auth from '../middleware/Auth';

const orderRoute = express.Router();

const { checkPurchaseOrder, checkOrdeUpdate } = OrderValidator;
const { postOrder, updateOrderPrice } = OrderController;
const { checkHeader, checkBuyerSeller } = Auth;

orderRoute.post('/', checkHeader, checkBuyerSeller, checkPurchaseOrder, postOrder);
orderRoute.patch(
  '/:orderId/price',
  checkHeader,
  checkBuyerSeller,
  checkOrdeUpdate,
  updateOrderPrice
);

export default orderRoute;
