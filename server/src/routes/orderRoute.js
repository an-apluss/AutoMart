import express from 'express';

import OrderValidator from '../middleware/OrderValidator';
import OrderController from '../controllers/orderController';

const orderRoute = express.Router();

const { checkPurchaseOrder } = OrderValidator;
const { postOrder } = OrderController;

orderRoute.post('/', checkPurchaseOrder, postOrder);

export default orderRoute;
