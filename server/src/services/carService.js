import Helper from '../helpers/helpers';
import Car from '../models/carModel';

const { cloudinaryUpload, cloudinaryDelete, validateUnsoldCarWithOptions } = Helper;

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
  static async createCar(carImage, carInfo, userData) {
    const { url, public_id } = await cloudinaryUpload(carImage, 'automart');

    carInfo.owner = userData.id;
    carInfo.imageId = public_id;
    carInfo.imageUrl = url;
    carInfo.price = parseFloat(carInfo.price).toFixed(2);

    const newCarPostAd = await Car.create(carInfo);

    const { id, created_on, status, manufacturer, model, price } = newCarPostAd;

    return {
      status: 201,
      data: {
        id,
        email: userData.email,
        created_on,
        manufacturer,
        model,
        price,
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
  static async updateCarStatus(carId, newStatus, userData) {
    const carExist = await Car.findById(parseInt(carId, 10));

    if (!carExist) return { status: 403, error: 'Car id does not exist', success: false };

    if (carExist.owner !== userData.id)
      return {
        status: 401,
        error: 'You cannot perform this action. It is not your car',
        success: false
      };

    const { email } = userData;

    const { status } = await Car.update(carId, 'status', newStatus);

    const { id, created_on, manufacturer, model, price, state } = carExist;

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
  static async updateCarPrice(carId, newPrice, userData) {
    const carExist = await Car.findById(parseInt(carId, 10));

    if (!carExist) return { status: 403, error: 'Car id does not exist', success: false };

    if (carExist.owner !== userData.id)
      return {
        status: 401,
        error: 'You cannot perform this action. It is not your car',
        success: false
      };

    const { email } = userData;

    const { price } = await Car.update(carId, 'price', newPrice);

    const { id, created_on, manufacturer, model, state, status } = carExist;

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
  static async fetchOneCar(carId) {
    const carExist = await Car.findById(parseInt(carId, 10));
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
   * @param {Boolean} isAdmin
   * @returns JSON API Response
   * @memberof CarService
   */
  static async fetchCars(carString, isAdmin) {
    if (isAdmin !== false)
      return {
        status: 401,
        success: false,
        error: `You are unauthorized to perform this action`
      };

    const { status } = carString;

    if (typeof status === 'undefined') {
      return { status: 403, error: 'Status is not provided', success: false };
    }

    if (status !== 'available') {
      return { status: 403, error: 'Status can only be available', success: false };
    }

    const carsExist = await Car.findByStatus(status);
    if (carsExist) {
      const data = carsExist.map(carExist => {
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
   * @param {Boolean} isAdmin
   * @returns JSON API Response
   * @memberof CarService
   */
  static async fetchCarWithOptions(options, isAdmin) {
    if (isAdmin !== false)
      return {
        status: 401,
        success: false,
        error: `You are unauthorized to perform this action`
      };

    const { status } = options;
    let { min_price, max_price } = options;

    if (typeof status === 'undefined')
      return { status: 403, error: 'Status is not provided', success: false };

    if (status !== 'available')
      return { status: 403, error: 'Status can only be available', success: false };

    min_price = parseFloat(min_price);
    max_price = parseFloat(max_price);

    if (min_price >= max_price)
      return { status: 403, error: 'max_price must be greater min_price', success: false };

    const { error } = validateUnsoldCarWithOptions(options);
    if (error) return { status: 403, error: error.details[0].message, success: false };

    const carsExist = await Car.findByPriceRange(status, min_price, max_price);
    let data;
    if (carsExist) {
      data = carsExist.map(carExist => {
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
  static async removeOneCar(carId) {
    const carExist = await Car.findById(parseInt(carId, 10));

    if (!carExist) return { status: 403, error: 'Provided car id cannot be found', success: false };

    await cloudinaryDelete(carExist.imageid);
    await Car.remove(carId);

    return { status: 200, data: 'Car Ad successfully deleted', success: true };
  }

  /**
   *
   * Handles the logic to fetch all car adverts whether sold or unsold
   * @static
   * @param {Boolean} isAdmin
   * @returns JSON API Response
   * @memberof CarService
   */
  static async fetchAllCars(isAdmin) {
    if (isAdmin !== true)
      return {
        status: 401,
        success: false,
        error: `You are unauthorized to perform this action`
      };

    let data;
    const allCar = await Car.findAll();
    if (allCar) {
      data = allCar.map(car => {
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
  static async fetchCarById(carId) {
    const carExist = await Car.findById(parseInt(carId, 10));
    if (carExist) return carExist;
    return false;
  }

  /**
   *
   * Handles the logic of all unsold car advert which state reads used or new
   * @static
   * @param {Object} paramsData holds the status and state of car advert to be fetch
   * @param {Boolean} isAdmin
   * @returns JSON API Response
   * @memberof CarService
   */
  static async fetchCarWithState(paramsData, isAdmin) {
    if (isAdmin !== false)
      return {
        status: 401,
        success: false,
        error: `You are unauthorized to perform this action`
      };

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

    const carExists = await Car.findByStatusAndState(status, state);

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
