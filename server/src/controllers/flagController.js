import FlagService from '../services/flagService';

export default class FlagController {
  static async postFlag(req, res, next) {
    try {
      const response = await FlagService.createFlag(req.body);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }
}
