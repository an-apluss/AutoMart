import express from 'express';

import OrderValidator from '../middleware/OrderValidator';
import OrderController from '../controllers/orderController';

const orderRoute = express.Router();

const { checkPurchaseOrder, checkOrdeUpdate } = OrderValidator;
const { postOrder, updateOrderPrice } = OrderController;

orderRoute.post('/', checkPurchaseOrder, postOrder);
orderRoute.patch('/:orderId/price', checkOrdeUpdate, updateOrderPrice);

export default orderRoute;
