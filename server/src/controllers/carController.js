import CarService from '../services/carService';

export default class CarController {
  static async postCarAd(req, res, next) {
    try {
      const response = await CarService.createCar(req.file.path, req.body);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }

  static updateStatus(req, res, next) {
    try {
      const response = CarService.updateCarStatus(req.params.carId, req.body.status);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }

  static updatePrice(req, res, next) {
    try {
      const response = CarService.updateCarPrice(req.params.carId, req.body.price);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }

  static getOneCar(req, res, next) {
    try {
      const response = CarService.fetchOneCar(req.params.carId);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }

  static getCars(req, res, next) {
    try {
      const queryLength = Object.keys(req.query).length;
      if (queryLength >= 0) {
        let response;
        switch (queryLength) {
          case 0:
            response = CarService.fetchAllCars();
            return res.status(response.status).send(response);
          case 1:
            response = CarService.fetchCars(req.query);
            return res.status(response.status).send(response);
          case 3:
            response = CarService.fetchCarWithOptions(req.query);
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

  static deleteOneCar(req, res, next) {
    try {
      const response = CarService.removeOneCar(req.params.carId);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }
}
