export default class Flag {
  constructor(id, car_id, reason, description) {
    this.id = id;
    this.car_id = car_id;
    this.created_on = new Date();
    this.reason = reason;
    this.description = description;
  }
}
