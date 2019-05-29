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
    const { url, public_id } = await cloudinaryUpload(carImage, 'automart');
    const priceConvert = parseFloat(price).toFixed(2);
    const newCarPostAd = new Car(
      id,
      carOwner.id,
      state,
      priceConvert,
      manufacturer,
      model,
      bodyType,
      public_id,
      url
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

  static updateCarStatus(id, newStatus) {
    const carExist = cars.find(car => car.id === parseInt(id, 10));
    if (!carExist) return { status: 403, error: 'Car id does not exist', success: false };
    const { email } = UserService.findUserById(carExist.id);
    carExist.status = newStatus;
    const { created_on, manufacturer, model, price, state, status } = carExist;
    return {
      status: 202,
      data: {
        id,
        email,
        created_on,
        manufacturer,
        model,
        price,
        state,
        status
      },
      success: true
    };
  }

  static updateCarPrice(id, newPrice) {
    const carExist = cars.find(car => car.id === parseInt(id, 10));
    if (!carExist) return { status: 403, error: 'Car id does not exist', success: false };
    const { email } = UserService.findUserById(carExist.id);
    carExist.price = parseFloat(newPrice).toFixed(2);
    const { created_on, manufacturer, model, price, state, status } = carExist;
    return {
      status: 202,
      data: {
        id,
        email,
        created_on,
        manufacturer,
        model,
        price,
        state,
        status
      },
      success: true
    };
  }

  static fetchOneCar(carId) {
    const carExist = cars.find(car => car.id === parseInt(carId, 10));
    if (!carExist) return { status: 403, error: 'Car id does not exist', success: false };

    const {
      id,
      owner,
      created_on,
      state,
      status,
      price,
      manufacturer,
      model,
      body_type
    } = carExist;

    return {
      status: 200,
      data: {
        id,
        owner,
        created_on,
        state,
        status,
        price,
        manufacturer,
        model,
        body_type
      },
      success: true
    };
  }

  static fetchCars(status) {
    if (status !== 'available') {
      return { status: 403, error: `Status can only be 'available'`, success: false };
    }

    const carExists = cars.filter(car => car.status === status);
    if (carExists) {
      const data = carExists.map(carExist => {
        const mappedresult = {
          id: carExist.id,
          owner: carExist.owner,
          created_on: carExist.created_on,
          state: carExist.state,
          status: carExist.status,
          price: carExist.price,
          manufacturer: carExist.manufacturer,
          model: carExist.model,
          body_type: carExist.body_type
        };
        return mappedresult;
      });

      return { status: 200, data, success: true };
    }

    return { status: 200, data: 'No car is available for sale', success: true };
  }
}
