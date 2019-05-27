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
}
