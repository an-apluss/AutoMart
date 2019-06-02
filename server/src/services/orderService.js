import Order from '../models/orderModel';
import storage from '../models/dummydata';
import helper from '../helpers/helpers';
import CarService from './carService';
import UserService from './userService';

const { orders } = storage;
const { generateId } = helper;

export default class OrderService {
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
}
