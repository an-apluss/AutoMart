import CarService from '../services/carService';

/**
 *
 *
 * @export CarController
 * @class CarController
 */
export default class CarController {
  /**
   *
   * Handles the logic of posting a car advert
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns JSON API Response
   * @memberof CarController
   */
  static async postCarAd(req, res, next) {
    try {
      const response = await CarService.createCar(req.file.path, req.body, req.user);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }

  /**
   *
   * Handles the logic to update the status of a car as sold
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns JSON API Response
   * @memberof CarController
   */
  static async updateStatus(req, res, next) {
    try {
      const response = await CarService.updateCarStatus(
        req.params.carId,
        req.body.status,
        req.user
      );
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }

  /**
   *
   * Handles the logic to update the price of a car advert
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns JSON API Response
   * @memberof CarController
   */
  static async updatePrice(req, res, next) {
    try {
      const response = await CarService.updateCarPrice(req.params.carId, req.body.price, req.user);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }

  /**
   *
   * Handles the logic to fetch a specific car advert
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns JSON API Response
   * @memberof CarController
   */
  static async getOneCar(req, res, next) {
    try {
      const response = await CarService.fetchOneCar(req.params.carId);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }

  /**
   * Case 0: Handles the logic to fetch all car whether sold or unsold
   * Case 1: Handles the logic to fetch all unsold car
   * Case 2: Handles the logic to fetch all unsold car which state reads either used or new
   * Case 3: Handles the logic to fetch all unsold car within a specify price range
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns JSON API Response
   * @memberof CarController
   */
  static async getCars(req, res, next) {
    try {
      const queryLength = Object.keys(req.query).length;

      if (queryLength >= 0) {
        let response;
        const { isAdmin } = req.user;

        switch (queryLength) {
          case 0:
            response = await CarService.fetchAllCars(isAdmin);
            return res.status(response.status).send(response);
          case 1:
            response = await CarService.fetchCars(req.query, isAdmin);
            return res.status(response.status).send(response);
          case 2:
            response = await CarService.fetchCarWithState(req.query, isAdmin);
            return res.status(response.status).send(response);
          case 3:
            response = await CarService.fetchCarWithOptions(req.query, isAdmin);
            return res.status(response.status).send(response);
          default:
            return res.status(403).json({
              status: 403,
              error: 'Invalid input. Provide appropriate option',
              success: false
            });
        }
      }
      return res
        .status(403)
        .json({ status: 403, error: 'Invalid input. Provide appropriate option', success: false });
    } catch (ex) {
      return next(ex);
    }
  }

  /**
   *
   * Handles the logic to delete a specific car advert
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns JSON API Response
   * @memberof CarController
   */
  static async deleteOneCar(req, res, next) {
    try {
      const response = await CarService.removeOneCar(req.params.carId);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }
}
