import Helper from '../helpers/helpers';
import storage from '../models/dummydata';
import Car from '../models/carModel';
import UserService from './userService';

const { generateId, cloudinaryUpload, validateUnsoldCarWithOptions } = Helper;
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

  static updateCarStatus(carId, newStatus) {
    const carExist = cars.find(car => car.id === parseInt(carId, 10));
    if (!carExist) return { status: 403, error: 'Car id does not exist', success: false };
    const { email } = UserService.findUserById(carExist.owner);
    carExist.status = newStatus;
    const { id, created_on, manufacturer, model, price, state, status } = carExist;
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

  static updateCarPrice(carId, newPrice) {
    const carExist = cars.find(car => car.id === parseInt(carId, 10));
    if (!carExist) return { status: 403, error: 'Car id does not exist', success: false };
    const { email } = UserService.findUserById(carExist.owner);
    carExist.price = parseFloat(newPrice).toFixed(2);
    const { id, created_on, manufacturer, model, price, state, status } = carExist;
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

  static fetchCars(carString) {
    const { status } = carString;

    if (typeof status === 'undefined') {
      return { status: 403, error: 'Status is not provided', success: false };
    }

    if (status !== 'available') {
      return { status: 403, error: 'Status can only be available', success: false };
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

  static fetchCarWithOptions(options) {
    const { status, min_price, max_price } = options;

    if (typeof status === 'undefined')
      return { status: 403, error: 'Status is not provided', success: false };

    if (status !== 'available')
      return { status: 403, error: 'Status can only be available', success: false };

    if (parseFloat(min_price) >= parseFloat(max_price))
      return { status: 403, error: 'max_price must be greater min_price', success: false };

    const { error } = validateUnsoldCarWithOptions(options);
    if (error) return { status: 403, error: error.details[0].message, success: false };

    const carExists = cars.filter(
      car =>
        car.status === status &&
        (parseFloat(car.price) >= parseFloat(min_price) &&
          parseFloat(car.price) <= parseFloat(max_price))
    );

    let data;
    if (carExists) {
      data = carExists.map(carExist => {
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
    }
    if (data.length > 0) return { status: 200, data, success: true };

    return {
      status: 200,
      data: `Car within the between ${min_price} and ${max_price} are currently unavailable`,
      success: true
    };
  }
}
