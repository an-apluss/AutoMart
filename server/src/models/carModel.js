export default class Car {
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
