import Helper from '../helpers/helpers';
import storage from '../models/dummydata';
import Car from '../models/carModel';
import UserService from './userService';

const { generateId, cloudinaryUpload } = Helper;
const { cars } = storage;

export default class CarService {
  static async createCar(carImage, carInfo) {
    const { email, state, price, manufacturer, model, bodyType } = carInfo;

    const carOwner = UserService.findUserByEmail(email);
    if (!carOwner)
      return {
        status: 401,
        error: "Incorrect Input. Email doesn't exist",
        success: false
      };

    const id = generateId(cars);
    const uploadedImage = await cloudinaryUpload(carImage, 'automart');
    const priceConvert = parseFloat(price).toFixed(2);
    const newCarPostAd = new Car(
      id,
      carOwner.id,
      state,
      priceConvert,
      manufacturer,
      model,
      bodyType,
      uploadedImage.public_id,
      uploadedImage.url
    );

    const { created_on, status } = newCarPostAd;

    cars.push(newCarPostAd);

    return {
      status: 201,
      data: {
        id,
        email,
        created_on,
        manufacturer,
        model,
        price: newCarPostAd.price,
        status
      },
      success: true
    };
  }
}
