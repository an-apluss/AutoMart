import Helper from '../helpers/helpers';
import storage from '../models/dummydata';
import Car from '../models/carModel';
import UserService from './userService';

const { generateId, cloudinaryUpload, validateUnsoldCarWithOptions } = Helper;
const { cars } = storage;

/**
 *
 *
 * @export CarService
 * @class CarService
 */
export default class CarService {
  /**
   *
   * Handles the logic to post a car advert
   * @static
   * @param {String} carImage incoming request for car image path
   * @param {Object} carInfo incoming request for car details
   * @returns JSON API Response
   * @memberof CarService
   */
  static async createCar(carImage, carInfo) {
    const { email, state, price, manufacturer, model, bodyType } = carInfo;

    const carOwner = await UserService.findUserByEmail(email);
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

  /**
   *
   * Handles the logic to update a car status
   * @static
   * @param {Integer} carId car id of the car advert to be updated
   * @param {String} newStatus car new status
   * @returns JSON API Response
   * @memberof CarService
   */
  static async updateCarStatus(carId, newStatus) {
    const carExist = cars.find(car => car.id === parseInt(carId, 10));
    if (!carExist) return { status: 403, error: 'Car id does not exist', success: false };
    const { email } = await UserService.findUserById(carExist.owner);
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

  /**
   *
   * Handles the logic to update the price of a car advert
   * @static
   * @param {Integer} carId car id of the car advert to be updated
   * @param {Float} newPrice
   * @returns JSON API Response
   * @memberof CarService
   */
  static async updateCarPrice(carId, newPrice) {
    const carExist = cars.find(car => car.id === parseInt(carId, 10));
    if (!carExist) return { status: 403, error: 'Car id does not exist', success: false };
    const { email } = await UserService.findUserById(carExist.owner);
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

  /**
   *
   * Handles the logic to fetch a specific car advert
   * @static
   * @param {Integer} carId car id to fetch specific car advert
   * @returns
   * @memberof CarService
   */
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

  /**
   *
   * Handles the logic to fetch all unsold car adverts
   * @static
   * @param {Object} carString holds the status of the car advert to be fectch
   * @returns JSON API Response
   * @memberof CarService
   */
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

  /**
   *
   * Handles the logic to fetch unsold cars within a specific price range
   * @static
   * @param {Object} options holds the status, min_price and max_price of the car advert to be fetch
   * @returns JSON API Response
   * @memberof CarService
   */
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

  /**
   *
   * Handle the logic to delete a specific car advert
   * @static
   * @param {Integer} carId car id of car to be deleted
   * @returns JSON API Response
   * @memberof CarService
   */
  static removeOneCar(carId) {
    const carExist = cars.find(car => car.id === parseInt(carId, 10));

    if (!carExist) return { status: 403, error: 'Provided car id cannot be found', success: false };

    const index = cars.indexOf(carExist);
    cars.splice(index, 1);

    return { status: 200, data: 'Car Ad successfully deleted', success: true };
  }

  /**
   *
   * Handles the logic to fetch all car adverts whether sold or unsold
   * @static
   * @returns JSON API Response
   * @memberof CarService
   */
  static fetchAllCars() {
    let data;
    if (cars) {
      data = cars.map(car => {
        return {
          id: car.id,
          owner: car.owner,
          created_on: car.created_on,
          state: car.state,
          status: car.status,
          price: car.price,
          manufacturer: car.manufacturer,
          model: car.model,
          body_type: car.body_type
        };
      });
    }

    if (data.length > 0) return { status: 200, data, success: true };

    return { status: 200, data: 'No car is currently on the platform', success: true };
  }

  /**
   *
   * Handles the logic to fetch car advert by Id
   * @static
   * @param {Integer} carId car id to fetch a car advert
   * @returns JSON API Response
   * @memberof CarService
   */
  static fetchCarById(carId) {
    const carExist = cars.find(car => car.id === parseInt(carId, 10));
    if (carExist) return carExist;
    return false;
  }

  /**
   *
   * Handles the logic of all unsold car advert which state reads used or new
   * @static
   * @param {Object} paramsData holds the status and state of car advert to be fetch
   * @returns JSON API Response
   * @memberof CarService
   */
  static fetchCarWithState(paramsData) {
    let { status, state } = paramsData;

    if (typeof status === 'undefined')
      return { status: 403, error: 'Status is required', success: false };

    if (typeof state === 'undefined')
      return { status: 403, error: 'State is required', success: false };

    status = status.toLowerCase();
    state = state.toLowerCase();

    if (status !== 'available')
      return { status: 403, error: 'Status can only be available', success: false };

    if (state !== 'new' && state !== 'used')
      return { status: 403, error: 'State can only be new or used', success: false };

    // eslint-disable-next-line default-case
    switch (state) {
      case 'new':
        state = 'new';
        break;
      case 'used':
        state = 'used';
        break;
    }

    const carExists = cars.filter(car => car.status === status && car.state === state);

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

    return { status: 200, error: `No ${state} car is for sale`, success: true };
  }
}
