export default class Order {
  constructor(id, buyer, car_id, amount, status = 'pending') {
    this.id = id;
    this.buyer = buyer;
    this.car_id = car_id;
    this.amount = amount;
    this.status = status;
    this.created_on = new Date();
  }
}
