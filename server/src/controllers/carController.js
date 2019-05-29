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
}
